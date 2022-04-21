import React, { useEffect, useRef, useState } from "react"
import { Form, Button, Card, Alert,Container,Row,Col } from "react-bootstrap"
import { useAuth } from "../../firebase/Auth"
import {useStorage} from "../../firebase/Storage"
import {useDatabase} from "../../firebase/Database"
import { Link, useNavigate } from "react-router-dom"
import unknowProfileImg from '../../public/unknown-profile.png'
import '../css/components/profileImage.css'

export default function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  
  const { currentUser, changePassword, changeEmail } = useAuth()
  const { changeProfileImage,getProfileImage,deleteProfileImage} = useStorage()
  const { fetchUserProfile,storeUserProfile } = useDatabase()

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const [image,setImage] = useState(null)
  const [imageError,setImageError]=useState('')
  const [uploadError,setUploadError]=useState('')
  const types = ['image/jpeg', 'image/png', 'images/gif']

  const [preview, setPreview] = useState(null)
  const [userDetails,setUserDetails] = useState(null)
    
  useEffect(()=>{
    // setPreview(getProfileImage());
    getProfileImage().then((result)=>{
      setPreview(result);
    });
    fetchUserProfile().then((result)=>{
      setUserDetails(result);
    });
  },[getProfileImage,fetchUserProfile])

  const handleProfileImage = (e)=>{
    let selectedFile = e.target.files[0];
    if (selectedFile){
        if (selectedFile&&types.includes(selectedFile.type)){
            setImage(selectedFile)
            setImageError('')

            const objectUrl = URL.createObjectURL(selectedFile)
            setPreview(objectUrl)

        }else{
            setImage(null);
            setImageError('Image type not supported')

            setPreview(null);
        }
    }else{
        console.log('gg')
    }

  }

  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }
    if (!lastNameRef.current.value || !firstNameRef.current.value) {
      return setError("Name is required")
    }
    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(changeEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(changePassword(passwordRef.current.value))
    }
    if (image){
      promises.push(changeProfileImage(image))
    }
    if (lastNameRef&&firstNameRef){
      promises.push(storeUserProfile(firstNameRef.current.value,lastNameRef.current.value))
    }
    
    Promise.all(promises)
      .then((res) => {
        navigate('/')
        console.log(res,'res');
      })
      .catch((err) => {
        setError(`Failed to update account :` +err)
      })
      .finally(() => {
        setLoading(false)
      })
      
  }

  function handleDelete(e){
    e.preventDefault()
    try {
      deleteProfileImage();
    } catch (ex) {
      console.error(ex);
      throw ex;
    } finally {
      setImage(null);
      setPreview(null)
      return;
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            {/* {image && <Alert variant="danger">{image}</Alert>} */}
            <div className="text-center profile-image-container"> 
              <div className="img ">
                <img src={preview??unknowProfileImg} className="img-responsive" alt="profile image" style={{width: "15%",minWidth:"11.150rem"}}/> 
              </div> 
              {preview&&
                <button onClick={handleDelete} className="btn">Delete</button>
              }
            </div>

            <Form.Group id="file" controlId="formFile" className="mb-3">
              <Form.Label>Product Image</Form.Label>
              <Form.Control  type="file" onChange={handleProfileImage} className="form-control"/>
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="name" >
            <Container fluid className='gx-0'>
              <Row >
              <Col>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  ref={firstNameRef}
                  defaultValue={userDetails?.fullName.firstName??''}
                  required
                />
              </Col>
              <Col>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  ref={lastNameRef}
                  defaultValue={userDetails?.fullName.lastName??''}
                  required
                />
              </Col>
              </Row>
              </Container>
            </Form.Group>
            
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>
  )
}