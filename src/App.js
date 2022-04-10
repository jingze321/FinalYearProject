// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import Plot from 'react-plotly.js';
import {BrowserRouter as Router, Route, Routes,useParams } from 'react-router-dom'
import {Header} from './components/Header.jsx'
import Home from './components/Home'
// import PieChart from './components/cart/PieChart'
import Countries from './components/region/Countries'
import CountryInfo from './components/region/CountryInfo'

import {SignUp} from './components/account/SignUp'

import {ErrorPage} from './components/ErrorPage'
import PrivateRoute from './components/PrivateRoute'
import React, { useState,createContext } from 'react'

// import {onAuthStateChanged} from "firebase/auth"
import {auth} from './firebase/Config'
import {AuthProvider} from './firebase/Auth'

import { Login } from './components/account/Login.jsx';
import UpdateProfile from './components/account/UpdateProfile.jsx';

export const CurrentUserContext = createContext();

// import {db} from './firebase/Config.js'
function App() {
  const [user,setUser]=useState({});
  // const { currentUser } = useAuth();
  // console.log(currentUser);
  // onAuthStateChanged(auth,(currentUser)=>{
  //   setUser(currentUser);
  // }
  // useEffect(()=>

  //     // onSnapshot(collection(db,'files1'),(snapshot)=>{
  //     //   console.log(snapshot.docs,'docs');
  //     // })
      
  //     // const data = await getDocs(userCollectionRef);
  //     // const dataList = data.docs.map((doc) => doc.data());
  //     // console.log(dataList,'dataList');
  //     // if (data) {
  //     //   console.log("Document data:", data,'1');
  //     // } else {
  //     //     // doc.data() will be undefined in this case
  //     //     console.log("No such document!");
  //     // }
  //     // console.log(data.docs);
  //     // setUsers(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
  // ,[])
  return (
    <>
    <AuthProvider>
      <CurrentUserContext.Provider value={user}>
      <Header/>
      <Router>
        <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/countries" element={<Countries/>} />
            <Route path="/country/:id" element={<CountryInfo/>} />

            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/login" element={<Login/>}/>
            {/* <PrivateRoute
              path="/update-profile"
              component={UpdateProfile}
            /> */}
            {/* <Route exact path='/update-profile' element={<PrivateRoute component={UpdateProfile}/>}/> */}
            {/* <PrivateRoute path="/update-profile" component={UpdateProfile} /> */}
            {/* <PrivateRoute exact path="/" element={<UpdateProfile/>}/> */}
            <Route exact path='/update-profile' element={<PrivateRoute/>}>
              <Route exact path='/update-profile' element={<UpdateProfile/>}/>
            </Route>
            {/* <Route path="/update-profile" element={<UpdateProfile/>}/> */}
            {/* <PrivateRoute path="/update-profile" component={<UpdateProfile/>}/> */}
            <Route path="*" element={<ErrorPage/>}/>
        </Routes>
      </Router>
      </CurrentUserContext.Provider>
    </AuthProvider>

    </>
  );
}

export default App;
