import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase/Config"
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
  signOut 
} from "firebase/auth";

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
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

  // Handle user state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe //unsubscribe on unmount
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    changeEmail,
    changePassword,
  }

  return (
    // Accepts a value prop to be passed to consuming components that are 
    // descendants of this Provider. One Provider can be connected to many consumers.
    <AuthContext.Provider value={value}>
      {/* All the children components can use AuthContext.
          Consumer API & get the updated value prop*/}
      {!loading && children}
    </AuthContext.Provider>
  )
}