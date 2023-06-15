import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Modal, Form, Image } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      console.log(transactionPayload)
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProperty = async () => {
    try {
      await axios.delete(`http://localhost:8080/property/delete/${id}`);
      navigate("/property");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditProperty = () => {
    setShowEditModal(true);
  };

  const handleUpdateProperty = async () => {
    try {
      await axios.put(
        `http://localhost:8080/property/update?id=${id}`,
        editFormData
      );
      setShowEditModal(false);
      fetchProperty();
    } catch (error) {
      console.log(error);
    }
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    address: "",
    numberOfRooms: "",
    size: "",
    propertyType: "",
    price: "",
    now: "",
    clientId: "",
  });

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

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Property</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={editFormData.address}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, address: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="editNumberOfRooms">
              <Form.Label>Number of Rooms</Form.Label>
              <Form.Control
                type="text"
                name="numberOfRooms"
                value={editFormData.numberOfRooms}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    numberOfRooms: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="editSize">
              <Form.Label>Size</Form.Label>
              <Form.Control
                type="text"
                name="size"
                value={editFormData.size}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, size: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="editPropertyType">
              <Form.Label>Property Type</Form.Label>
              <Form.Control
                type="text"
                name="propertyType"
                value={editFormData.propertyType}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    propertyType: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="editPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={editFormData.price}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, price: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="editnow">
              <Form.Label>now</Form.Label>
              <Form.Control
                type="text"
                name="now"
                value={editFormData.now}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, now: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="editClientId">
              <Form.Label>Client ID</Form.Label>
              <Form.Control
                type="text"
                name="clientId"
                value={editFormData.clientId}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, clientId: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateProperty}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PropertyDetails;
