import React from 'react';
import { Button,TextField,InputAdornment,Box,Card,Container } from '@mui/material';
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { Typography} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../services/axiosConfig';

const Login = () => {
    const navigate = useNavigate();
    const initialValues = {
        email: "",
        password: ""
    }

    const validationSchema = yup.object({
        email: yup.string().email('Invalid email').required('Email is required'),
        password: yup.string().required('Password is required')
    });

    const onSubmit =async (values) => {
      try {
        const response = await axios.post("/user/login", values);
        console.log("login reponseeee",response);
        
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            navigate("/"); // Redirect to home page
        } else {
            alert("Invalid credentials");
        }
        if(response.data.userId){
          localStorage.setItem("userId", response.data.userId);
        }


    } catch (error) {
        console.error("Login failed:", error);
        alert("Login failed! Please check your credentials.");
    }
  
  }
  return (
    <Container maxWidth="sm" sx={{ mt: 4, p: 3, boxShadow: 2, borderRadius: 2,backgroundColor:"#8080800f" }}>
        <Typography variant="h6" align="left" gutterBottom sx={{fontWeight:"700"}}>
            Login</Typography>
        {/* <Typography sx={{color:"grey"}}variant="body1" align="center" gutterBottom>Enter your details to login in to your account</Typography> */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched,handleChange, handleBlur }) => (
          <Form>
            <Box sx={{ mb: 2 }}>
            <Typography variant='body1' className="al-label mt-3">Email</Typography>
              <TextField
              className='al-input'
                fullWidth
                id="email"
                name="email"
                placeholder="Enter your email"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                
              />
            </Box>
            <Box sx={{ mb: 2 }}>
            <Typography variant='body1' className="al-label mt-3">Password</Typography>
              <TextField
              className='al-input'
                fullWidth
                id="password"
                name="password"
                placeholder="Enter your password"
                variant="outlined"
                type="password"
                error={errors.password && touched.password}
                helperText={errors.password && touched.password && errors.password}
                onChange={handleChange}
                onBlur={handleBlur}

              />
            </Box>
            <Button className='submit-button' type="submit" variant="contained" color="primary" sx={{backgroundColor:"black"}}>
              Login
            </Button>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Don't have an account?{" "}
              <Link to="/register" style={{ color: "#1976d2", textDecoration: "none", fontWeight: "bold" }}>
                Register
              </Link>
            </Typography> 
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Login;