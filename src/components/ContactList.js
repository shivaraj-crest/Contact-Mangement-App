import React from 'react';
import { Button,TextField,InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {Search} from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare} from '@fortawesome/free-solid-svg-icons';

const ContactList = (props) => {

  const navigate = useNavigate();

  const handleAddContact = () =>{
    console.log("Add Contact Clicked");
    navigate('/add-contact');
  }

  const onDeleteContact = (id) =>{
    console.log(id)
    const newContacts = props.contacts.filter((contact)=>{
      console.log(contact.id);
      return contact.id!==id;
    })

    props.onDeleteContact(newContacts);
  }

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
      {props.contacts && props.contacts.length > 0 ? (
          props.contacts.map((contact) => (
            <div
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