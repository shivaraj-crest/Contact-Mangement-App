import React, { useState, useEffect } from 'react';
import { Button,TextField,InputAdornment } from '@mui/material';
import { useNavigate,useLocation } from 'react-router-dom';
import {Search} from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import axios from '../services/axiosConfig';


const ContactList = (props) => {

  const navigate = useNavigate();
  const location = useLocation();
  const [contacts, setContacts] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const fetchContacts = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.get("/contact/get", {
        // headers: {
        //   "Authorization": `Bearer ${token}`
        // }
        params: {
          userId: userId
        }
      });
      setContacts(response.data.contacts);
      // console.log("response",response.data.contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    // Check if refresh is present in location state
    if (location.state?.refresh) {
      console.log("refresh2",location.state.refresh);
      setRefresh(true); // Toggle refresh to trigger useEffect
    }
    
  }, []);

  useEffect(() => {
    console.log("refresh1",refresh);
    fetchContacts();
    // setRefresh(false);
  }, [refresh]);

  const handleAddContact = () =>{
    console.log("Add Contact Clicked");
    navigate('/add-contact');
  }

  const onDeleteContact = async (id) => {
    try {
      const userId = localStorage.getItem("userId");
      await axios.delete(`/contact/delete`, {
        params: {
          userId: userId,
        }
      });
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const editContactHandler = (contact) =>{
    navigate(`/edit-contact/${contact.id}`,{state:{contact}})
  }

  const onClickProfile = (contact)=>{
    navigate(`/view-contact/${contact.id}`,{state:{contact}});
  }

  return (
    <div className='contact-list mt-4'>
      <div className='c-body w-75 mx-auto d-flex justify-content-between'>
        <h2 className='list-header'>Contact List</h2>
        <Button className='' variant="contained" onClick={handleAddContact}>Add Contact</Button>
      </div>
      <div className='c-search mx-auto mt-3'>
        <TextField
          className='c-tsearch d-flex w-75 mx-auto'
          variant="outlined"
          placeholder='Search Contacts'
          sx={{
            "& .MuiOutlinedInput-root": {
              height: "45px", // Adjust the height of the container
              padding: "15px", // Adjust the padding of the container
            },
            "& .MuiOutlinedInput-input": {
              // height: "50%", // Ensure the input takes the full height
              // padding: "20px", // Adjust padding if needed
              // backgroundColor: "green",
              padding: "0px",
            },
          }}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start"><Search/></InputAdornment>,
              //i can add styles using style prop also and it overrides sx
              // style: { height: "45px", padding: "10px" }
            },
          }}
        
        />   
      </div>

      <div className='c-list w-75 mx-auto mt-3'>
      {contacts && contacts.length > 0 ? (
          contacts.map((contact) => (
            <div
              key={contact.id}
              className="d-flex align-items-center justify-content-between border-bottom py-2"
            >
              {/* Contact Info */}
              <div className="d-flex align-items-center">
                <AccountCircleIcon
                  fontSize="large"
                  className="me-3"
                  style={{ color: "#1976d2", cursor: "pointer" }}
                  onClick={()=> onClickProfile(contact)}
                />
                <div className="d-flex flex-column">
                  <span onClick={()=> onClickProfile(contact)} className="fw-bold" style={{cursor:"pointer"}}>{contact.name} </span>
                  <span onClick={()=> onClickProfile(contact)} style={{ fontSize: "0.9rem", color: "gray", cursor: "pointer" }}>
                    {contact.email}
                  </span>
                  <span onClick={()=> onClickProfile(contact)} style={{ fontSize: "0.9rem", color: "gray", cursor: "pointer" }}>{contact.phone}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="d-flex align-items-center">
                <DeleteIcon
                  fontSize="medium"
                  className="me-3"
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => {onDeleteContact(contact.id)}}
                />
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  style={{ color: "#1976d2", cursor: "pointer" }}
                  onClick={()=>{editContactHandler(contact)}}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No contacts available.</p>
        )}
      </div>

    </div>
  );
};

export default ContactList;