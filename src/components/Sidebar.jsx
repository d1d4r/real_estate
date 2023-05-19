import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { AiOutlineUser, AiOutlineHome, AiOutlineDollarCircle } from 'react-icons/ai';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <Nav className="sidebar flex-column">
      <Nav.Link as={Link} to="/client">
        <AiOutlineUser className="sidebar-icon" />
        <span className="sidebar-text">Client</span>
      </Nav.Link>
      <Nav.Link as={Link} to="/property">
        <AiOutlineHome className="sidebar-icon" />
        <span className="sidebar-text">Property</span>
      </Nav.Link>
      <Nav.Link as={Link} to="/transaction">
        <AiOutlineDollarCircle className="sidebar-icon" />
        <span className="sidebar-text">Transaction</span>
      </Nav.Link>
    </Nav>
  );
};

export default Sidebar;
