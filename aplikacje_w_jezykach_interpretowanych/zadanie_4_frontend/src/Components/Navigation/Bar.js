import {Button, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import {ToCsvButton} from "./ToCsvButton";
import {FromCsvButton} from "./FromCsvButton";
import React from "react";

export function Bar({URL, setShouldReload, size, newBookMode, setNewBookMode}) {

    return (
        <Navbar bg={"dark"} variant={"dark"} fixed="top">
            <Navbar.Brand style={{marginLeft: '1vw'}} bg="light">LIBRARY</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown title={"menu"} id="basic-nav-dropdown">
                        <NavDropdown.Header>navigation</NavDropdown.Header>
                        <Link to="/">
                            <Button variant={"light"} style={{minWidth: 300}} onClick={() => {
                            }}>books</Button>
                        </Link>
                        <NavDropdown.Divider/>
                        <NavDropdown.Header>settings</NavDropdown.Header>
                        <ToCsvButton URL={URL}/>
                        <FromCsvButton URL={URL} setShouldReload={setShouldReload}/>
                    </NavDropdown>
                </Nav>
                <Button
                    variant={"warning"}
                    style={{minWidth: 200, marginLeft: '2vw'}}
                >{size + " pozycji"}</Button>
                <Button
                    onClick={() => setNewBookMode(prevState => !prevState)}
                    style={{minWidth: 200, marginLeft: '2vw'}}
                    variant={newBookMode ? "primary" : "primary"}
                >
                    {newBookMode ? "zakończ dodawanie" : "dodaj nową książkę"}
                </Button>
                <Button
                    href={"/login"}
                    variant={"danger"}
                    style={{minWidth: 200, marginLeft: '2vw'}}>
                    Wyloguj
                </Button>
            </Navbar.Collapse>
        </Navbar>
    );
}



