import {Button, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import React from "react";

export function Bar({size}) {

    return (
        <Navbar bg={"dark"} variant={"dark"} fixed="top">
            <Navbar.Brand style={{marginLeft: '1vw'}} bg="light">CLIENT</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown title={"menu"}>
                        <Link to="/store">
                            <Button variant={"light"} style={{minWidth: 300}}>store</Button>
                        </Link>
                        <Link to="/order">
                            <Button variant={"light"} style={{minWidth: 300}}>my order</Button>
                        </Link>
                    </NavDropdown>
                </Nav>
                <Button
                    variant={"dark"}
                    style={{minWidth: 100, marginLeft: '1vw'}}
                >{size + " products in your order"}</Button>
            </Navbar.Collapse>
        </Navbar>
    );
}



