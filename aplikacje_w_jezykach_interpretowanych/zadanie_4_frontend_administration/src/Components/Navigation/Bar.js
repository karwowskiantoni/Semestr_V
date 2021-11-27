import {Button, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import React from "react";

export function Bar({size, newProductMode, setNewProductMode}) {

    return (
        <Navbar bg={"dark"} variant={"dark"} fixed="top">
            <Navbar.Brand style={{marginLeft: '1vw'}} bg="light">ADMINISTRATION</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown title={"menu"}>
                        <NavDropdown.Header>navigation</NavDropdown.Header>
                        <Link to="/store">
                            <Button variant={"light"} style={{minWidth: 300}}>store</Button>
                        </Link>
                        <Link to="/order">
                            <Button variant={"light"} style={{minWidth: 300}}>orders</Button>
                        </Link>
                        <NavDropdown.Divider/>
                        <NavDropdown.Header>settings</NavDropdown.Header>

                        <Button
                            onClick={() => setNewProductMode(prevState => !prevState)}
                            style={{minWidth: 300}}
                            variant={newProductMode ? "secondary" : "light"}
                        >
                            {newProductMode ? "end editing" : "add new product"}
                        </Button>
                    </NavDropdown>
                </Nav>
                <Button
                    variant={"dark"}
                    style={{minWidth: 100, marginLeft: '1vw'}}
                >{size + " products"}</Button>
            </Navbar.Collapse>
        </Navbar>
    );
}



