import React, { useState, useEffect } from "react";
import { Table, Form, Button } from "react-bootstrap";
import axios from "axios";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/transaction/getAll"
      );
      setTransactions(response.data);
      console.log(response.data);
      //console.log(transactions)
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/transaction/search?term=${searchTerm}`
      );
      setTransactions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTransaction = async (contractId) => {
    try {
      await axios.delete(`http://localhost:8080/transaction/delete?id=${contractId}`);
      // Perform any necessary actions after deleting the transaction
      fetchTransactions(); // Refresh the transactions after deletion
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Transaction Management</h1>
      <Form.Group controlId="searchTerm">
      
        <Form.Control
          type="text"
          placeholder="Enter search term"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>
      <br></br>
      <Button variant="primary" onClick={handleSearch}>
        Search
      </Button>
      <br></br>
      <br></br>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Contract ID</th>
            <th>Price</th>
            <th>Property ID</th>
            <th>Client ID</th>
            <th>Seller ID</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((e) => (
            
            <tr key={e.contract_id}>
              <td>{e.contract_id}</td>
              <td>{e.price}</td>
              <td>{e.property.id}</td>
              <td>{e.client.id}</td>
              <td>{e.seller.id}</td>
              <td>{e.date}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() =>
                    handleDeleteTransaction(e.contract_id)
                  }
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Transaction;
