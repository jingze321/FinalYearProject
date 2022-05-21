import React,{useState,useEffect,useRef} from 'react'
import { useAuth } from "../../firebase/Auth"
import { useDatabase } from "../../firebase/Database"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEnvelope,faUser,faSkull} from '@fortawesome/free-solid-svg-icons';

function Inbox() {
    const { fetchUserProfile,sendInboxMessage } = useDatabase();
    const { currentUser } = useAuth();
    const [userDetails,setUserDetails] = useState(null)


    const [email,setEmail] = useState(null)
    const [fullName,setFullName] = useState(null)
    const [ message,setMessage] = useState(null)
    const [inboxRef,setInboxRef] = useState(null)
    const [error,setError] = useState(null)
    const fullNameRef = useRef(null)
    const emailRef = useRef(null)
    function handleSendMessage(e) {
        e.preventDefault()
        if (message.trim().length<=10){
            return setError("Message length should More than 10 words!")
        }
        Promise.resolve(sendInboxMessage(
                    fullNameRef?.current?.value,
                    emailRef?.current?.value,
                    message
                ))
        .then((res) => {
          console.log(res,'res');
          setError(null);
          setInboxRef(res);
        })
        .catch((err) => {
        })
        .finally(() => {
        })
    };

    useEffect(()=>{
        fetchUserProfile().then((result)=>{
          setUserDetails(result);
          if(userDetails?.fullName){
              setFullName(result.fullName.firstName+" "+ result.fullName.lastName)
          }
          if (currentUser?.email){
                setEmail(currentUser.email)
          }
        });
      },[])
      console.log(fullName,'fullName',fullNameRef?.current?.value);

  return (
    <div>
        <h1>Inbox Form</h1>
        <form className="rounded msg-form" onSubmit={handleSendMessage}>
            {inboxRef&&<div class="alert alert-success" role="alert">
                Your message has been submitted, we will get you back in within 2 business days.
                <br/>
                <strong>Reference Number: {inboxRef}</strong>
            </div>}
            {error&&
            <div class="alert alert-danger" role="alert">
               {error}
            </div>}
            <div className="form-group"> 
                <label htmlFor="name" className="h6">Your Name</label>
                <div className="input-group border rounded">
                    <div className="input-group-addon p-2">
                     <FontAwesomeIcon className="" icon={faUser} />
                    </div> 
                    <input type="text" ref={fullNameRef} defaultValue={userDetails?(userDetails.fullName?.firstName+" "+ userDetails?.fullName?.lastName):''} onChange={(e)=>{setFullName(e.target.value)}} className="form-control border-0" required/>
                </div>
            </div>
            <div className="form-group "> 
                <label htmlFor="name" className="h6">Email</label>
                <div className="input-group border rounded">
                    <div className="input-group-addon p-2"> 
                        <FontAwesomeIcon className="" icon={faEnvelope} />
                    </div> 
                    <input type="email" ref={emailRef} defaultValue={currentUser?.email??''}  onChange={(e)=>{setEmail(e.target.value)}} className="form-control border-0"/>
                </div>
            </div>
            <div className="form-group"> 
                <label htmlFor="msg" className="h6">Message</label> 
                <textarea name="message" id="msgus" cols="10" rows="5" onChange={(e)=>{setMessage(e.target.value)}} className="form-control bg-light" placeholder="Message"></textarea> 
            </div>
            <div className="form-group d-flex justify-content-end pt-3"> 
                <input type="submit" className="btn btn-primary text-white" value="send message"/> 
            </div>
        </form>
    </div>
  )
}

export default Inbox