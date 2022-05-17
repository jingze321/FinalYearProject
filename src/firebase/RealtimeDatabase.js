import React, { useContext, useState, useEffect} from "react"
import { auth,realtimeDb} from "../firebase/Config"
import { getDatabase, 
          ref, 
          set ,
          get , 
          query,
          onChildAdded,
          orderByChild,
          onValue 
        } from "firebase/database";
const DatabaseContext = React.createContext()

export function useRealtimeDatabase() {
  return useContext(DatabaseContext)
}

export function RealtimeDatabaseProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const db = getDatabase();

  async function insertChatData(content){
    const messageId = (Math.random() + 1).toString(36).substring(2);
    set(ref(realtimeDb, `live-chat/${currentUser.uid}/${messageId}`), {
      content: content,
      timestamp: Date.now(),
      type:"user",
    });

  }

  async function fetchChatData(){
    // const dbRef = ref(getDatabase());
    // const [messages,setMessages] = useState([]);

    var message = [];

    const chatRecordRef = ref(db, `live-chat/${currentUser.uid}`);
      const filterChatRecordRef = 
        query(chatRecordRef, orderByChild('timestamp'));


      await get(filterChatRecordRef).then((snapShot)=>{
        snapShot.forEach(childSnapShot=>{
          message.push(childSnapShot.val());
          // console.log(childSnapShot.val());
        })
      })


      return message;

      // console.log(message,'message');
    // const unsubscribe = query(child(dbRef,`live-chat/${currentUser.uid}`),orderByChild('timestamp'))
    //   .then((snapshot) => {
    //   // console.log(snapshot,'snapshot');
    //     if (snapshot.exists()) {
    //       console.log(snapshot.val());
    //     } else {
    //       console.log("No data available");
    //     }
    //   }).catch((error) => {
    //     console.error(error);
    //   });

    // return ()=>{
    //   unsubscribe();
    // }

  }

  async function receiveChatData(){
    const chatRecordRef = ref(db, `live-chat/${currentUser.uid}`);
    let newItems = false;
    let newMessage = {};
    await onChildAdded(chatRecordRef, (data) => {
      // if (newItems) {
        console.log(data.val(),'val');
        newMessage=data.val();
        return data.val();
        // console.log(newMessage);
      // }

    });
    try {
      onChildAdded(chatRecordRef, (snapshot) => {
            newMessage = snapshot.val();
            console.log(snapshot.val());
        });
    } catch (ex) {
      console.error(ex);
    } finally {
      console.log(newMessage,'newMessage');
    }
    return newMessage;
    onValue(chatRecordRef, () => {
      newItems = true
    }, {
      onlyOnce: true
    });

  }




  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    insertChatData,
    fetchChatData,
    receiveChatData
  }

  return (
    <DatabaseContext.Provider value={value}>
      {!loading && children}
    </DatabaseContext.Provider>
  )
}