import React, { useContext, useState, useEffect } from "react"
import { auth,db} from "../firebase/Config"
import { doc, setDoc, getDoc, collection, addDoc } from "firebase/firestore"; 

const DatabaseContext = React.createContext()

export function useDatabase() {
  return useContext(DatabaseContext)
}

export function DatabaseProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  async function storeUserProfile(firstName,lastName,gender,credentialsId){
    const currentUserId = currentUser?.uid ?? credentialsId;
    await setDoc(doc(db, "user", currentUserId), 
                  { 
                    fullName:{
                      firstName:firstName,
                      lastName:lastName,
                    },
                    gender
                  } 
                ) 
  }

  async function fetchUserProfile(){
    if(!currentUser?.uid) return ;
    const docRef = doc(db, "user", currentUser?.uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  }

  async function sendInboxMessage(fullName,email,message){
    const docRef = await addDoc(collection(db, "inbox-message"), 
                  { 
                    UID:currentUser?.uid??"Unknown",
                    fullName,
                    email,
                    message,
                    timestamp:Date.now(),
                  } 
                ) 
    return docRef.id;
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      console.log(user,'user');
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    storeUserProfile,
    fetchUserProfile,
    sendInboxMessage,
  }

  return (
    <DatabaseContext.Provider value={value}>
      {!loading && children}
    </DatabaseContext.Provider>
  )
}