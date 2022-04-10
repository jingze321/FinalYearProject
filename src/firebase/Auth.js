import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase/Config"
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
    changePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}