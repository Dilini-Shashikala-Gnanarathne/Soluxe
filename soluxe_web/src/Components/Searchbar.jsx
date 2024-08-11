import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Row, Col, Button, Offcanvas } from 'react-bootstrap';
import { FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { UserContext } from './UserProvider';
import './Searchbar.css';

export default function Searchbar() {
  const { isLoggedIn, logout, token } = useContext(UserContext);
  const navigate = useNavigate();

  const [showCart, setShowCart] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const handleCartClose = () => setShowCart(false);
  const handleCartShow = () => setShowCart(true);

  const handleUserClose = () => setShowUser(false);

  const handleUserShow = async () => {
    if (isLoggedIn) {
      try {
        const response = await fetch('http://localhost:3001/api/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Fetched data:', data); 
          setUserName(data.data.name); // Assuming the API returns the user data under the `data` key
          setUserEmail(data.data.email); // Assuming the API returns the user data under the `data` key
          setShowUser(true);
        } else {
          console.error('Failed to fetch user details');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    } else {
      navigate('/login');
    }
  };

  const handleLogOut = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className='searchbar'>
      <Form inline>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className="mr-sm-2"
            />
            <i className="fas fa-search search-icon"></i>

            <FaUser className='user_icon' onClick={handleUserShow} />
            <Offcanvas show={showUser} onHide={handleUserClose} backdrop="static" placement='end'>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>User Details</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <div className="user-info">
                  <span className="user-name">Name: {userName}</span>
                  <br />
                  <span className="user-email">Email: {userEmail}</span>
                  <Button variant="outline-secondary" onClick={handleLogOut} className="ml-2">Logout</Button>
                </div>
              </Offcanvas.Body>
            </Offcanvas>

            <div>
              <FaCartShopping className='cart_icon' onClick={handleCartShow} />
              <Offcanvas show={showCart} onHide={handleCartClose} backdrop="static" placement='end'>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  Added Items will appear here
                </Offcanvas.Body>
              </Offcanvas>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
