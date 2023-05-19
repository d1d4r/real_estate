import React from "react";
import { Route, Routes } from "react-router-dom";
import Client from "./Client";
import Property from "./Property";
import Transaction from "./Transaction";
import { BrowserRouter as Router } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";
import PropertyDetails from "./PropertyDetails";
const RoutePage = () => {
  return (
    <Router>
      <Container fluid>
        <Row>
          <Col xs={2} style={{ height: "100vh", backgroundColor: "#f8f9fa" }}>
            <Sidebar />
          </Col>
          <Col xs={10}>
            <Routes>
              <Route exact path="/client" element={<Client />} />
              <Route exact path="/property" element={<Property />} />
              <Route exact path="/transaction" element={<Transaction />} />
              <Route path="/property/get/:id" element={<PropertyDetails />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
};

export default RoutePage;
