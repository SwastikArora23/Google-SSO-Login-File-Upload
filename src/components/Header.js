import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { API_URL } from '../utils/constants';

function Header () {

  const [user, setUserDetails] = useState({});

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/getUser`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUserDetails(data);
      } catch (error) {
        console.log(error);
      }
    };

    getUserDetails();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  }

  return (
    <div className="header">
      <h1>File Upload And Download {localStorage.getItem('token') ? `for ${user.firstName} ${user.lastName}` : '' }</h1>
      {
        localStorage.getItem('token') ?
        <Button onClick={logout} variant="light">Logout</Button> : <></>
      }
    </div>

  );
};

export default Header;
