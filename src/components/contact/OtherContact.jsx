import React,{useState,useEffect} from 'react'
import { useAuth } from "../../firebase/Auth"
import { useDatabase } from "../../firebase/Database"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEnvelope,faPhone,faMap} from '@fortawesome/free-solid-svg-icons';
import { useLoadScript,Marker, GoogleMap } from '@react-google-maps/api';

function OtherContact() {
    const { fetchUserProfile,sendInboxMessage } = useDatabase();
    const { currentUser } = useAuth();
    const [userDetails,setUserDetails] = useState(null)


    const [email,setEmail] = useState(null)
    const [fullName,setFullName] = useState(null)
    const [ message,setMessage] = useState(null)

    const [map, setMap] = useState(null)

    const {isLoaded} =useLoadScript({
        id: 'google-map-script',
        googleMapsApiKey:`${process.env.REACT_APP_GOOGLE_MAP_API}`
    })
    const center = {
        lat: 39.9042,
        lng: 116.4074, 
      };
      const containerStyle = {
        width: '400px',
        height: '400px'
      };

    const campusList = [
        {
            campusName : "Zhong Guan Chun",
            location : {
                lat:39.9604289392967,
                lng:116.3123277583574
            }
        },
        {
            campusName : "Liang Xiang",
            location : {
                lat:39.73108904070357, 
                lng:116.1700678576812
            }
        }
    ]

    const onUnmount = React.useCallback(function callback(map) {
      setMap(null)
    }, [])

    function handleSendMessage(e) {
        e.preventDefault()
        alert(fullName);
        Promise.resolve(sendInboxMessage(fullName,email,message))
        .then((res) => {
          console.log(res,'res');
        })
        .catch((err) => {
        })
        .finally(() => {
        })
    };
    useEffect(()=>{
        fetchUserProfile().then((result)=>{
          setUserDetails(result);
          console.log(result);
          if(userDetails?.fullName){
              setFullName(result?.fullName?.firstName+" "+ result?.fullName?.lastName)
          }
          if (currentUser?.email){
                setEmail(currentUser.email)
          }
        });
      },[fetchUserProfile])
      

  return (
    <div>
        <h1>Other Contact </h1>
        <form className="rounded msg-form" >
            <div class="container">
                <div class="row justify-content-between">
                    <div class="col-12">
                        <div class="wrapper">
                            <div class="row justify-content-between">
                                <div class="col-lg-12 mb-5">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="dbox w-100 text-center">
                                                <div class="icon d-flex align-items-center justify-content-center">
                                                    <FontAwesomeIcon className="rounded-circle bg-dark text-white p-3" icon={faMap} />
                                                </div>
                                                <div class="">
                                                    <b>Address:</b><p> China, Bei Jing Shi, Haidian District, 魏公村中关村大街5号 邮政编码: 100811</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="dbox w-100 text-center">
                                                <div class="d-flex align-items-center justify-content-center">
                                                    <FontAwesomeIcon className="rounded-circle bg-dark text-white p-3" icon={faPhone} />
                                                </div>
                                                <div class="text">
                                                    <b>Phone:</b>
                                                    <p>
                                                        <a className="text-dark text-decoration-none" href="tel://008613811816050">+ 86 138 1181 6050</a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="dbox w-100 text-center">
                                                <div class="icon d-flex align-items-center justify-content-center">
                                                    <FontAwesomeIcon className="rounded-circle bg-dark text-white p-3" icon={faEnvelope} />
                                                </div>
                                                <div class="text">
                                                    <b>Email:</b>
                                                    <p>
                                                        <a className="text-decoration-none" href="mailto:cjzchong1@gmail.com">cjzchong1@gmail.com</a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                {
                    !isLoaded?
                    
                    <div>
                        Loading...
                    </div>:
                    <div className="d-flex justify-content-center">
                        <GoogleMap
                            onLoad={map => {
                                setMap(map)
                              }}
                            mapContainerStyle={containerStyle}
                            zoom={8}
                            center={center}
                            onUnmount={onUnmount}
                        >
                            {campusList.map((campus,index) => (
                                <Marker
                                position={{ lat: campus.location.lat, lng: campus.location.lng }}
                                key={index}
                                label = {campus.campusName}
                                />
                            ))}
                        </GoogleMap>
                    </div>
                }
            </div>
        </form>
    </div>
  )
}

export default OtherContact