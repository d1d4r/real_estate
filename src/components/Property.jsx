import React, { useState, useEffect } from "react";
import { Card, Button, Form, Modal, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Property.css";

const Property = () => {
  const [properties, setProperties] = useState([]);
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);
  const [clients, setClients] = useState([]);
  const [propertyData, setPropertyData] = useState({
    address: "",
    numberOfRooms: "",
    size: "",
    propertyType: "",
    price: "",
    image: "",
    now: "",
    clientId: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    fetchProperties();
    fetchClients();
  }, [propertyData.clientId]);

  const fetchProperties = async () => {
    try {
      const response = await axios.get("http://localhost:8080/property/getAll");
      setProperties(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await axios.get("http://localhost:8080/client/getAll");
      setClients(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddProperty = () => {
    setShowAddPropertyModal(true);
  };

  const handlePropertyFormChange = (e) => {
    const { name, value } = e.target;

    if (name === "clientId") {
      // Separate update for clientId
      setPropertyData({
        ...propertyData,
        clientId: value,
      });
    } else {
      // Update other fields
      setPropertyData({
        ...propertyData,
        [name]: value,
      });
    }
  };

  const handlePropertySubmit = async () => {
    try {
      const selectedClient = clients.find((client) => client.id);
      const updatedPropertyData = {
        ...propertyData,
        propertyType: propertyData.propertyType, // Correct the property type key
        client: {
          id: selectedClient.id, // Assign the selected client ID
        },
      };

      await axios.post(
        "http://localhost:8080/property/add",
        updatedPropertyData
      );
      fetchProperties();
      setShowAddPropertyModal(false);
      setPropertyData({
        address: "",
        numberOfRooms: "",
        size: "",
        propertyType: "",
        price: "",
        image: "",
        now: "",
        clientId: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalClose = () => {
    setShowAddPropertyModal(false);
  };
  const handleNavigateToProperty = (id) => {
    navigate(`/property/get/${id}`);
  };

  return (
    <div>
      <h1>Properties</h1>
      <br />

      <Button variant="primary" onClick={handleAddProperty}>
        Add Property
      </Button>
      <br />
      <br />

      <div className="card-container">
        {properties.map((property) => (
          <Card
            key={property.id}
            style={{ width: "18rem", cursor: "-webkit-grab", cursor: "grab" }}
            className="property-card"
            onClick={() => handleNavigateToProperty(property.id)}
          >
            <Card.Img variant="top" src={property.image} />
            <Card.Body>
              <Card.Title>{property.address}</Card.Title>
              <Card.Text>Size: {property.size}</Card.Text>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>Availability</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{property.now}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        ))}
      </div>

      <Modal show={showAddPropertyModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Property</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={propertyData.address}
                onChange={handlePropertyFormChange}
              />
            </Form.Group>
            <Form.Group controlId="numberOfRooms">
              <Form.Label>Number of Rooms</Form.Label>
              <Form.Control
                type="text"
                name="numberOfRooms"
                value={propertyData.numberOfRooms}
                onChange={handlePropertyFormChange}
              />
            </Form.Group>
            <Form.Group controlId="size">
              <Form.Label>Size</Form.Label>
              <Form.Control
                type="text"
                name="size"
                value={propertyData.size}
                onChange={handlePropertyFormChange}
              />
            </Form.Group>
            <Form.Group controlId="propertyType">
              <Form.Label>Property Type</Form.Label>
              <Form.Control
                type="text"
                name="propertyType"
                value={propertyData.propertyType}
                onChange={handlePropertyFormChange}
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={propertyData.price}
                onChange={handlePropertyFormChange}
              />
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={propertyData.image}
                onChange={handlePropertyFormChange}
              />
            </Form.Group>
            <Form.Group controlId="now">
              <Form.Label>Availability</Form.Label>
              <Form.Control
                type="text"
                name="now"
                value={propertyData.now}
                onChange={handlePropertyFormChange}
              />
            </Form.Group>
            <Form.Group controlId="clientId">
              <Form.Label>Client ID</Form.Label>
              <Form.Control
                as="select"
                name="clientId"
                value={propertyData.clientId}
                onChange={handlePropertyFormChange}
              >
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.id}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handlePropertySubmit}>
            Add Property
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Property;
