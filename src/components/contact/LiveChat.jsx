import React,{useEffect,useRef,useState} from 'react'
import "../css/components/liveChat.css"
import {useRealtimeDatabase} from "../../firebase/RealtimeDatabase"
import { realtimeDb,auth} from "../../firebase/Config"
import { getDatabase,ref,onChildAdded,onValue} from "firebase/database";
import { useAuth } from "../../firebase/Auth"
import {useStorage} from "../../firebase/Storage"
import unknowProfileImg from '../../public/unknown-profile.png'

function MessageList(messageArray){
    console.log(messageArray);
    
    var displayData = [];
    let appendIndex = 0 ;
    // Object.values(messageArray).map((message,index,array)=>{
    //     if(index!==0&&)
    // });
    return (
    <>
        {
            Object.values(messageArray).length>0?(
                Object.values(messageArray).map((message,index,array)=>
                    {
                        if (message?.type==="system") {
                            return (
                                <div key={index}>
                                    <div className="media media-meta-day"><span>Previous History</span></div>
                                </div>
                            )  
                        }else{
                            return (

                                <div key={index}>
                                    {
                                    (message?.type==="admin"&&(array[index-1]===null||message?.type!==array[index-1]?.type))?
                                        (
                                        <div className="media media-chat"> 
                                            <img className="avatar" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="..."/>
                                        </div>   
                                        ):(
                                            <></>
                                        )
                                    }
                                <div className={`
                                    ${message.type===array[index-1]?.type||array[index-1]!==null
                                        ?"media media-chat ":"py-5"} 
                                        ${message?.type==='user'?' media-chat-reverse':''}`} 
                                    key={index}
                                    >

                                    <div className={`${message.type!==array[index-1]||array[index-1]!==null?'media-body':''}`} key={index}>
                                        <p>{(message.content)}</p>
                                    </div>
                                </div>
                            </div> 
                            )
                        }

                    }
                 
                )
            // displayData
            // <p>hihi1</p>
            ):(
                <>
                    <div className="media media-meta-day center"><span>Start New Chat Now!{messageArray.length}</span></div>
                </>
            )
        }

    </>
    )
}

function LiveChat() {

  const { insertChatData,fetchChatData,receiveChatData } = useRealtimeDatabase();
  const {getProfileImage} = useStorage()
//   const [currentUser, setCurrentUser] = useState();
  const promises = []
  const contentRef = useRef()
  const { currentUser } = useAuth();
  const [messageArray,setMessageArray] = useState([]);
  const [profileImage,setProfileImage] = useState(null);

  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  function handleSendMessage() {

    promises.push(insertChatData(contentRef.current.value));

    Promise.all(promises)
    .then((res) => {
    //   console.log(res,'res');
        contentRef.current.value = ""
    })
    .catch((err) => {
    })
    .finally(() => {
    })

  };
  useEffect(()=>{
    // setPreview(getProfileImage());
    getProfileImage().then((result)=>{
      setProfileImage(result);
    });

  },[getProfileImage])

  useEffect(()=>{
    let tempArray =[];
    try {
        Promise.resolve(fetchChatData()).then(value => {
            console.log(value,'v1'); 
            // messageArray?setMessageArray([...messageArray, value]):setMessageArray([value])
            // console.log(...messageArray);
            // setMessageArray(prevMessage =>([...prevMessage,...value]))
            messageArray.push(...value);
            console.log(Object.values(messageArray).length,'length');
            if(Object.values(messageArray).length){
                setMessageArray(prevMessage =>([...prevMessage,{
                    content : "Previous History",
                    type : "system",
                }]))
            }

            // tempArray.push(...value);
            // message.push(value);
        })
    } catch (e) {
        console.log(e);
    } finally{
        console.log(tempArray,'tempArray');
        // setMessageArray(tempArray)
        console.log(messageArray,'messageArray1');
    };
    // console.log(receiveChatData(),'123');
  },[fetchChatData]);

  useEffect(()=>{
    const db = getDatabase();
    let isNewItem = true;
    const chatRecordRef = ref(db, `live-chat/${currentUser.uid}`);
    try {
        onChildAdded(chatRecordRef, (data) => {
            if(!isNewItem) {
                setMessageArray([...messageArray,data.val()])
            }
          });
    } 
    catch (ex) {
        console.error(ex);
    } 
    finally {
        onValue(chatRecordRef, () => {
            isNewItem = false
          }, {
            onlyOnce: true
          });
        scrollToBottom()
      }

  },[messageArray])

  return (
    <div>
        <h1>LiveChat</h1>
        <div className="page-content page-container" id="page-content">
            <div className="padding">
                <div className="row container d-flex justify-content-center">
                    <div className="col-md-12">
                        <div className="card card-bordered">
                            <div className="card-header">
                                <h4 className="card-title"><strong>Chat</strong></h4> <a className="btn btn-xs btn-secondary" href="#" data-abc="true">Let's Chat App</a>
                            </div>
                            <div className="ps-container ps-theme-default ps-active-y" id="chat-content" style={{overflowY: "scroll",height:"400px !important"}}>
                                {/* <div className="media media-chat"> <img className="avatar" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="..."/>
                                    <div className="media-body">
                                        <p>Hi</p>
                                        <p>How are you ...???</p>
                                        <p>What are you doing tomorrow?<br/> Can we come up a bar?</p>
                                        <p className="meta"><time dateTime="2018">23:58</time></p>
                                    </div>
                                </div>
                                <div className="media media-meta-day">Today</div>
                                <div className="media media-chat media-chat-reverse">
                                    <div className="media-body">
                                        <p>Hiii, I'm good.</p>
                                        <p>How are you doing?</p>
                                        <p>Long time no see! Tomorrow office. will be free on sunday.</p>
                                        <p className="meta"><time dateTime="2018">00:06</time></p>
                                    </div>
                                </div>
                                <div className="media media-chat"> <img className="avatar" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="..."/>
                                    <div className="media-body">
                                        <p>Okay</p>
                                        <p>We will go on sunday? </p>
                                        <p className="meta"><time dateTime="2018">00:07</time></p>
                                    </div>
                                </div>
                                <div className="media media-chat media-chat-reverse">
                                    <div className="media-body">
                                        <p>That's awesome!</p>
                                        <p>I will meet you Sandon Square sharp at 10 AM</p>
                                        <p>Is that okay?</p>
                                        <p className="meta"><time dateTime="2018">00:09</time></p>
                                    </div>
                                </div>
                                <div className="media media-chat"> <img className="avatar" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="..."/>
                                    <div className="media-body">
                                        <p>Okay i will meet you on Sandon Square </p>
                                        <p className="meta"><time dateTime="2018">00:10</time></p>
                                    </div>
                                </div>
                                <div className="media media-chat media-chat-reverse">
                                    <div className="media-body">
                                        <p>Do you have pictures of Matley Marriage?</p>
                                        <p className="meta"><time dateTime="2018">00:10</time></p>
                                    </div>
                                </div>
                                <div className="media media-chat"> <img className="avatar" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="..."/>
                                    <div className="media-body">
                                        <p>Sorry I don't have. i changed my phone.</p>
                                        <p className="meta"><time dateTime="2018">00:12</time></p>
                                    </div>
                                </div>
                                <div className="media media-chat media-chat-reverse">
                                    <div className="media-body">
                                        <p>Okay then see you on sunday!!</p>
                                        <p>Okay then see you on sunday!!</p>
                                        <p className="meta"><time dateTime="2018">00:12</time></p>
                                    </div>
                                </div> */}

                                <MessageList {...messageArray} />
                                <div ref={messagesEndRef} />
                                <div className="ps-scrollbar-x-rail" style={{left: "0px", bottom: "0px"}}>
                                    <div className="ps-scrollbar-x" tabIndex="0" style={{left: "0px",width: "0px"}}></div>
                                </div>
                                <div className="ps-scrollbar-y-rail" style={{top: "0px",height: "0px", right: "2px"}}>
                                    <div className="ps-scrollbar-y" tabIndex="0" style={{top: "0px",height: "2px"}}></div>
                                </div>
                            </div>
                            <div className="publisher bt-1 border-light"> 
                                <img 
                                    className="avatar avatar-xs" 
                                    src= {profileImage??unknowProfileImg}
                                    alt="UserProfileImage"
                                /> 
                                <input className="publisher-input" type="text" ref={contentRef} placeholder="Write something" onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}/> 
                                <span className="publisher-btn file-group"> 
                                <i className="fa fa-paperclip file-browser"/>
                                
                                <input type="file"/> </span> 
                                <a className="publisher-btn" href="#" data-abc="true">
                                    <i className="fa fa-smile"></i>
                                </a> 
                                <a className="publisher-btn text-info" href="#" data-abc="true">
                                    <i className="fa fa-paper-plane"/>
                                </a> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LiveChat