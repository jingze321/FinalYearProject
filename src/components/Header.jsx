import React from 'react';
import {Link} from 'react-router'
import logo from '../public/covid.png'
// import {Navbar, NavItem} from 'react-materialize';
import { BrowserRouter } from 'react-router-dom';
import {Nav,Navbar,NavDropdown,NavItem } from "react-bootstrap"
import { LinkContainer } from 'react-router-bootstrap';

export const Header = () => {
  return (

      <>
        <BrowserRouter>
          <Navbar bg="dark" variant="dark" sticky="top" expand="sm" inverse="true" collapseOnSelect>

            <Navbar.Brand href="/">
            <img src={logo} height="42" width="42" alt="logo"/>
                MyData
            </Navbar.Brand>
            <Navbar.Toggle />
              <Navbar.Collapse>
                      <Nav className="container-fluid ">
                        {/* <NavDropdown title="Products">
                          <NavDropdown.Item href="addproduct">Product1</NavDropdown.Item>
                          <NavDropdown.Item href="">Product2</NavDropdown.Item>
                          <NavDropdown.Item href="">Product3</NavDropdown.Item>
                          <NavDropdown.Divider />
                          <NavDropdown.Item href="/countries">Country</NavDropdown.Item>
                        </NavDropdown> */}
                        <Nav.Link href="/countries">Country</Nav.Link>
                        <Nav.Link href="#about-us">About Us</Nav.Link>
                        <Nav.Link href="#contact-us">Contact Us</Nav.Link>
                        
                    </Nav>
                    <Nav pullright="true">
                      <Nav.Link href="#contact-us">Contact Us</Nav.Link>
                    </Nav>
              </Navbar.Collapse>
        </Navbar>
    </BrowserRouter>

      </>

  )
}