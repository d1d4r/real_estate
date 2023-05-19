import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Modal, Form, Image } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [transactionData, setTransactionData] = useState({
    date: "",
    price: "",
    buyerId: "",
  });
    const [buyers, setBuyers] = useState([]);
    
    const navigate = useNavigate();

    const handleNavigateToProperty = () => {
        navigate(`/property`);
      };

  useEffect(() => {
    fetchProperty();
    fetchBuyers();
  }, []);

  const fetchProperty = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/property/get/${id}`
      );
      setProperty(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBuyers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/client/getAll");
      setBuyers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTransactionFormChange = (e) => {
    setTransactionData({
      ...transactionData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTransactionSubmit = async () => {
    try {
      const transactionPayload = {
        date: transactionData.date,
        price: transactionData.price,
        client: {
          id: transactionData.buyerId,
        },
        seller: {
          id: property.client.id,
        },
        property: {
          id: id,
        },
      };

      await axios.post(
        "http://localhost:8080/transaction/add",
        transactionPayload
      );
      setShowTransactionForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProperty = async () => {
    try {
        await axios.delete(`http://localhost:8080/property/delete/${id}`);
        handleNavigateToProperty()
      // Perform any necessary actions after deleting the property
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditProperty = () => {
    // Navigate to the property edit page or show the edit form
    // You can use a router library like react-router-dom for navigation
  };

  if (!property) {
    return <div>Loading...</div>;
  }
  

  return (
    <div>
      <h1>Property Details</h1>
      <Image src={property.image} alt="Property" fluid />

      <p>Address: {property.address}</p>
      <p>Number of Rooms: {property.numberOfRooms}</p>
      <p>Size: {property.size}m</p>
      <p>Property Type: {property.propertyType}</p>
      <p>Price: {property.price}$</p>

      <div>
        <h2>Seller Information</h2>
        <p>Seller ID: {property.client.id}</p>
        <p>Seller Name: {property.client.name}</p>
        <p>Seller Contact Info: {property.client.contactInfo}</p>
      </div>

      <Button variant="primary" onClick={() => setShowTransactionForm(true)}>
        Transaction
      </Button>
      <Button variant="danger" onClick={handleDeleteProperty}>
        Delete
      </Button>
      <Button variant="secondary" onClick={handleEditProperty}>
        Edit
      </Button>

      <Modal
        show={showTransactionForm}
        onHide={() => setShowTransactionForm(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="transactionDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={transactionData.date}
                onChange={handleTransactionFormChange}
              />
            </Form.Group>
            <Form.Group controlId="transactionPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={transactionData.price}
                onChange={handleTransactionFormChange}
              />
            </Form.Group>
            <Form.Group controlId="transactionBuyer">
              <Form.Label>Buyer</Form.Label>
              <Form.Control
                as="select"
                name="buyerId"
                value={transactionData.buyerId}
                onChange={handleTransactionFormChange}
              >
                <option value="">Select a buyer</option>
                {buyers.map((buyer) => (
                  <option key={buyer.id} value={buyer.id}>
                    {buyer.id}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="transactionSeller">
              <Form.Label>Seller ID</Form.Label>
              <Form.Control
                type="text"
                name="sellerId"
                value={property.client.id}
                disabled
              />
            </Form.Group>
            <Form.Group controlId="transactionPropertyId">
              <Form.Label>Property ID</Form.Label>
              <Form.Control type="text" name="propertyId" value={id} disabled />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowTransactionForm(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleTransactionSubmit}>
            Add Transaction
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PropertyDetails;
