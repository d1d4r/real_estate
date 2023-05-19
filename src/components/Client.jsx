import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import axios from "axios";

import "./Client.css";

const Client = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [clientData, setClientData] = useState({
    id: "",
    name: "",
    contactInfo: "",
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get("http://localhost:8080/client/getAll");
      setClients(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddClient = () => {
    setShowModal(true);
  };

  const handleEditClient = (id, name, contactInfo) => {
    setClientData({ id, name, contactInfo });
    setShowModal(true);
  };

  const handleDeleteClient = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/client/delete?id=${id}`);
      fetchClients(); // Fetch clients again after successful deletion
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormChange = (event) => {
    setClientData({ ...clientData, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = async () => {
    try {
      if (clientData.id) {
        // Perform update request
        await axios.put(
          `http://localhost:8080/client/update?id=${clientData.id}`,
          clientData
        );
      } else {
        // Perform add request
        await axios.post(`http://localhost:8080/client/add`, clientData);
      }

      setShowModal(false); // Close the modal
      setClientData({ id: "", name: "", contactInfo: "" }); // Reset form data
      fetchClients(); // Fetch clients again after successful add/update
      console.log(clientData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="client">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <Button variant="primary" onClick={handleAddClient}>
        Add Employee
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Contact Info</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Render table rows based on the filtered client data */}
          {clients
            .filter((client) =>
              client.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((client) => (
              <tr key={client.id}>
                <td>{client.id}</td>
                <td>{client.name}</td>
                <td>{client.contactInfo}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() =>
                      handleEditClient(
                        client.id,
                        client.name,
                        client.contactInfo
                      )
                    }
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteClient(client.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {/* Modal for adding/updating client */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {clientData.id ? "Edit Client" : "Add Client"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={clientData.name}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group
              controlId="formcontactInfo
"
            >
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                name="contactInfo
"
                value={clientData.contactInfo}
                onChange={handleFormChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleFormSubmit}>
            {clientData.id ? "Update" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Client;
