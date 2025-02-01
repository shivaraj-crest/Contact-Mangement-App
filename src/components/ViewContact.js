import React from 'react';
import { Button,TextField,InputAdornment,Card,Box,Avatar,Typography,CardContent } from '@mui/material';
import {useParams,useLocation,useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useState, useEffect} from 'react';
import { LocalConvenienceStoreOutlined } from '@mui/icons-material';

const ViewContact = (props) => {
    const navigate = useNavigate();
    const {id}= useParams();
    const location = useLocation();
    const contactData = location.state?.contact;

    const getInitials=(name)=>{
        if(!name) return "";
        const newName= name.trim().split(' ');

        if(newName.length>1) return newName[0][0].toUpperCase()+newName[newName.length-1][0].toUpperCase();

        return newName[0][0].toUpperCase();
    };
    const initials  = getInitials(contactData.name);

    useEffect(()=>{
        console.log(initials)
    },[]);

  return (
    <Card
    sx={{
      maxWidth: 300,
      margin: "20px auto",
      textAlign: "center",
      boxShadow: 3,
      borderRadius: "10px",
    }}
  >
    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
      <Avatar
        sx={{
          bgcolor: "primary.main",
          width: 80,
          height: 80,
          fontSize: 32,
          fontWeight: "bold",
        }}
      >
        {initials}
      </Avatar>
    </Box>
    <CardContent>
      <Typography variant="h6" component="div">
        {contactData.name || "N/A"}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {contactData.email || "No email provided"}
      </Typography>
    </CardContent>
  </Card>
  );
};

export default ViewContact;