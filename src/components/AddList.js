import React from 'react';
import { useState } from 'react';
import { Button,TextField,Typography,Snackbar,Alert} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const AddList = (props) => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(name && email){
            props.onAddContact({name,email});
            setName('');
            setEmail('');
            setOpenSnackbar(true);
        }
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return; // Prevent closing the snackbar on click-away
        }
        setOpenSnackbar(false);
    };
  return (
    <div className='AddList'>
        <div className='w-75 mx-auto mt-3'>
            <div className='d-flex align-items-center'>
                <FontAwesomeIcon icon= {faArrowLeft} className="icons" onClick={()=>{navigate(-1)}}
                    style={{marginRight:"5px"}}/>
                <Typography variant='h5' className="al-heading" sx={{marginBottom:"0px"}}  gutterBottom>Add Contact</Typography>
            </div>
            <form className='al-form ' onSubmit={handleSubmit}>
                <Typography variant='body1' className="al-label mt-3">Names</Typography>
                <TextField
                    className='al-input'
                    placeholder='Enter your name'
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                />
                <Typography variant='body1' className="al-label">Email</Typography>
                <TextField
                    className='al-input'
                    placeholder='Enter your email'
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                />
                
                <Button
                    variant="contained"
                    type="submit"
                    className='al-input al-btn mt-2'
                >
                Add Contact
                </Button>
            </form>
        </div>

        <Snackbar
                open={openSnackbar}
                autoHideDuration={3000} // Snackbar will close after 3 seconds
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Position
                sx={{
                    position: 'absolute !important',
                    top: '59px !important', // force the styles to be applied
                    right: '33px !important', // force the styles to be applied
                    zIndex: 9999, // Optional: ensure it stays on top of other elements
                }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Contact has been added successfully!
                </Alert>
            </Snackbar>
    </div>
  );
};

export default AddList;