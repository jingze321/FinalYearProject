import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert,Container,Row,Col } from "react-bootstrap"
import { useAuth } from "../../firebase/Auth"
import {useDatabase} from "../../firebase/Database"
import { Link, useNavigate } from "react-router-dom"

export function SignUp() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  // const genderRef = useRef("male")
  const [gender, setGender] = useState("male");
  const { signup } = useAuth()
  const { storeUserProfile } = useDatabase()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  async function handleSubmit(e) {
    e.preventDefault()

    if ((firstNameRef.current.value).length<1||(lastNameRef.current.value).length<1) {
      return setError("First name and last name should more than 3 character")
    }

    if ((passwordRef.current.value).length <6) {
      return setError("Passwords should more than 6 digits")
    }
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value).then((credentials)=>{
        
        storeUserProfile(firstNameRef.current.value, lastNameRef.current.value,gender,credentials.user.uid)

      })
      
      navigate('/')
    } catch (error){
      setError(error.message)
    }

    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="name" >
            <Container fluid className='gx-0'>
              <Row >
              <Col>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  ref={firstNameRef}
                  required
                />
              </Col>
              <Col>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  ref={lastNameRef}
                  required
                />
              </Col>
              </Row>
              </Container>
            </Form.Group>

            <Form.Group id="gender">

              <Form.Label>Gender</Form.Label>
              <Row>
                <Col>
                  <Form.Check
                    label="Male"
                    inline
                    name="group"
                    type="radio"
                    id={`male`}
                    value="male"
                    defaultChecked
                    onChange={(e)=>setGender(e.target.value)}
                  />
                  <Form.Check
                    label="Female"
                    inline
                    name="group"
                    type="radio"
                    value="female"
                    id={`female`}
                    onChange={(e)=>setGender(e.target.value)}
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  )
}