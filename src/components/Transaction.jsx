import React, { useState, useEffect } from 'react';
import { Table, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:8080/transaction/getAll');
      setTransactions(response.data);
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/transaction/search?term=${searchTerm}`);
      setTransactions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTransaction = async (contractId) => {
    try {
      await axios.delete(`http://localhost:8080/transaction/delete/${contractId}`);
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
        <Form.Label>Search Term</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter search term"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" onClick={handleSearch}>
        Search
      </Button>
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
          {transactions.map((transaction) => (
            <tr key={transaction.contract_id}>
              <td>{transaction.contract_id}</td>
              <td>{transaction.price}</td>
              <td>{transaction.property.id}</td>
              <td>{transaction.client.id}</td>
              <td>{transaction.seller.id}</td>
              <td>{transaction.date}</td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteTransaction(transaction.contract_id)}>
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
