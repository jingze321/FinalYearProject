import React, { useContext, useState, useEffect } from "react"
import { auth,db,storage } from "../firebase/Config"
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,updateEmail,updatePassword,signOut } from "firebase/auth";
const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    // return auth.createUserWithEmailAndPassword(email, password)
    return createUserWithEmailAndPassword(auth,email, password)
  }

  function login(email, password) {
    return signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return signOut(auth)
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function changeEmail(email) {
    return updateEmail(currentUser,email)
  }

  function changePassword(password) {
    return updatePassword(currentUser,password)
  }


  // function changeProfileImage(image) {
  //   // const uploadTask = ref(storage,`user-profile-image/${image.name}`);
  //   const storageRef  = ref(storage,`user-profile-image/${currentUser.uid}`);
  //   const uploadTask = uploadBytesResumable(storageRef, image);

  // }
  // async function getProfileImage() {
  //   const storageRef = ref(storage, `user-profile-image/${currentUser.uid}`);
  //   // console.log(forestRef,'forestRef');
  //   var urlLink = null;
  //   await getDownloadURL(storageRef)
  //     .then((url) => {
  //       console.log(url,'url');
  //       urlLink= url;
  //       // Insert url into an <img> tag to "download"
  //     }).catch((error) => {
  //       console.log(error.code,'error.code');
  //       switch (error.code) {
  //         case 'storage/object-not-found':
  //           urlLink= null;
  //           break;
  //         case 'storage/unauthorized':
  //             console.log(" User doesn't have permission to access the object");
  //           break;
  //         case 'storage/canceled':
  //             console.log(" Upload Canceled");
  //           break;
    
  //         case 'storage/unknown':
  //           // Unknown error occurred, inspect the server response
  //           break;
  //         default:
  //           break;
  //       }
  //     })
  //   return urlLink;
  // }

  // function deleteProfileImage(image) {
  //   const storageRef  = ref(storage,`user-profile-image/${currentUser.uid}`);
  //   deleteObject(storageRef).then(() => {
  //     // File deleted successfully
  //   }).catch((error) => {
  //     // Uh-oh, an error occurred!
  //   });

  // }

  // async function storeUserProfile(){
  //   // const citiesRef = collection(db, "cities");
  //   // await setDoc(doc(citiesRef, "SF"), {
  //   //   name: "San Francisco", state: "CA", country: "USA",
  //   //   capital: false, population: 860000,
  //   //   regions: ["west_coast", "norcal"] });

  //   await setDoc(doc(db, "user", currentUser.uid), 
  //                 { name:"test1" 
                
                
  //                 }
  //               ) 
  //   console.log('Document Added') 
  // }

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
    login,
    signup,
    logout,
    resetPassword,
    changeEmail,
    changePassword,
    // storeUserProfile,
    // changeProfileImage,
    // getProfileImage,
    // deleteProfileImage
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}