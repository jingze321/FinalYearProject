import React, { useContext, useState, useEffect } from "react"
import { auth,storage } from "../firebase/Config"
import { ref,uploadBytesResumable,getDownloadURL,deleteObject } from "firebase/storage";
const StorageContext = React.createContext()

export function useStorage() {
  return useContext(StorageContext)
}

export function StorageProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)


  function changeProfileImage(image) {
    const storageRef  = ref(storage,`user-profile-image/${currentUser.uid}`);
    uploadBytesResumable(storageRef, image).then((snapshot) => {
      console.log('Uploaded', snapshot.totalBytes, 'bytes.');
    }).catch((error) => {
      console.error('Upload failed', error);
    });
  }
  
  async function getProfileImage() {
    const storageRef = ref(storage, `user-profile-image/${currentUser.uid}`);
    var urlLink = null;
    await getDownloadURL(storageRef)
      .then((url) => {
        console.log(url,'forestRef');
        urlLink = url
      })
      .catch((error) => {
        console.log(error.code,'error.code');
        switch (error.code) {
          case 'storage/object-not-found':
            urlLink= null;
            break;
          case 'storage/unauthorized':
              console.log(" User doesn't have permission to access the object");
            break;
          case 'storage/canceled':
              console.log(" Upload Canceled");
            break;
    
          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
          default:
            break;
        }
      })
      return urlLink;
  }

  function deleteProfileImage(image) {
    const storageRef  = ref(storage,`user-profile-image/${currentUser.uid}`);
    deleteObject(storageRef).then(() => {
      // File deleted successfully
      console.log("File deleted");
    }).catch((error) => {
      console.log(error);
    });

  }

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
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    // storeUserProfile,
    changeProfileImage,
    getProfileImage,
    deleteProfileImage,
  }

  return (
    <StorageContext.Provider value={value}>
      {!loading && children}
    </StorageContext.Provider>
  )
}