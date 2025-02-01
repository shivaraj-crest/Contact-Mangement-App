import React from 'react';
import { useState } from 'react';
import { Button,TextField,Typography} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { useParams, useLocation, useNavigate } from 'react-router-dom';


const EditContact = (props) => {

    const navigate = useNavigate();
    let {id} = useParams();
    console.log('id1',typeof(id));
    const location = useLocation();

    const contactData = location.state?.contact;

    const [name, setName] = useState(contactData?.name || '');
    const [email, setEmail] = useState(contactData?.email || '');

    const handleSubmit = (e) =>{
        console.log('id2',id);
        e.preventDefault();
        if(name && email){
            props.onEditContact({id,name,email});
            setName('');
            setEmail('');
        }
        navigate('/');
    }

  return (
    <div className='AddList'>
        <div className='w-75 mx-auto mt-3'>
            <div className='d-flex align-items-center'>
                <FontAwesomeIcon icon= {faArrowLeft} className="icons" onClick={()=>{navigate(-1)}}
                    style={{
                        marginRight:"5px",
                        cursor:"pointer",
                        fontSize:"21px"
                    }}/>
                <Typography variant='h5' className="al-heading" sx={{marginBottom:"0px"}}  gutterBottom>Add Contact</Typography>
            </div>
            <form className='al-form ' onSubmit={handleSubmit}>
                <Typography variant='body1' className="al-label mt-3">Name</Typography>
                <TextField
                    className='al-input'
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    placeholder='Enter your name'
                />
                <Typography variant='body1' className="al-label">Email</Typography>
                <TextField
                    className='al-input'
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    placeholder='Enter your email'
                />
                <Button
                    variant="contained"
                    type="submit"
                    className='al-input al-btn mt-2'
                >
                Edit Contact
                </Button>
            </form>
        </div>
    </div>
  );
};

export default EditContact;