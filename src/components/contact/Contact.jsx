import React,{useState} from 'react'
import "../css/components/contactForm.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faInbox,faPhone,faMessage} from '@fortawesome/free-solid-svg-icons';
import Inbox from './Inbox'
import LiveChat from './LiveChat'
import OtherContact from './OtherContact'
import { useAuth } from "../../firebase/Auth"

function Contact() {

  const [contactType,setContactType] = useState('inbox');
  const { currentUser } = useAuth();

  const handleContactTypeChange = (data) => {

  };
  return (
    <div className="container-fluid rounded">
        <div className="row p-3">
            <div className="col-sm-6">
                <div>
                    <h3>Contact Method</h3>
                    <p className="text-secondary">Select contact method and our Team will get back to you within in 24 hours</p>
                </div>
                <div className="row text-center" id="bordering"> 
                    <div className="col-12 py-2 text-nowrap">
                        <button onClick={()=>setContactType('live')} 
                            className={`btn rounded col-12 col-md-6 p-3 contact-btn
                                        ${contactType==="live"?'selected':''}
                                        ${currentUser?"":"disabled"}
                                      `}
                        >
                            <FontAwesomeIcon className="pe-2" icon={faMessage} />
                            Live Chat {!currentUser&&<span> (Login Required) </span>}
                        </button> 
                    </div>
                    <div className="col-12 py-2">
                        <button onClick={()=>setContactType('inbox')} 
                            className={`btn rounded col-12 col-md-6 p-3 contact-btn
                                ${contactType==="inbox"?'selected':''}
                            `}
                        >
                            <FontAwesomeIcon className="pe-2" icon={faInbox} />
                            Inbox
                        </button> 
                    </div>
                    <div className="col-12 py-2">
                        <button onClick={()=>setContactType('others')} 
                            className={`btn rounded col-12 col-md-6 p-3 contact-btn
                                 ${contactType==="others"?'selected':''}
                            `}
                        >
                            <FontAwesomeIcon className="pe-2" icon={faPhone}/>
                            Others
                        </button> 
                    </div>
                </div>
            </div>
            <div className="col-sm-6 pad mt-3">
                {contactType==="inbox" &&
                    <Inbox/>
                }
                {contactType==="live" &&
                    <LiveChat/>
                }
                {contactType==="others" &&
                    <OtherContact/>
                }
            </div>
        </div>
    </div>
  )
}

export default Contact