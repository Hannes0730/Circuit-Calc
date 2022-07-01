import { Calculate } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Container, Nav, Navbar } from "react-bootstrap";
import React from "react";

function Nav_Bar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container className="justify-content-center">
        <Navbar.Brand>
          <Calculate sx={{ color: "whitesmoke" }} />
          BJT and JFET Calculator
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Nav_Bar;
