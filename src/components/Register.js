import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
 
} from "@mui/material";
import {Link} from 'react-router-dom';
import axios from '../services/axiosConfig';
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .max(10, "username must be 10 characters or less")
      .required("username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    // phoneNumber: Yup.string()
    // .matches(/^[+]?[0-9]{10}$/, "Please enter 10 digit phone number")
    // .required("Phone number is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit =async (values, { resetForm }) => {
    const response = await axios.post("/user/register", values);

    console.log("Form Data:", values);
    console.log("Registration Response:", response);
    alert("Registration Successful!");
    resetForm();
    navigate("/login");
  };

  return (
    <Container maxWidth="sm" className="container-class" sx={{ mt: 4, p: 3, boxShadow: 2, borderRadius: 2,backgroundColor:"#8080800f" }}>
      <Typography variant="h6" align="left" gutterBottom sx={{fontWeight:"700"}}>
        Sign Up
      </Typography>
              {/* <Typography sx={{color:"grey"}}variant="body1" align="center" gutterBottom>Enter your details to sign in to your account</Typography> */}
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleChange, handleBlur }) => (
          <Form>
            <Box sx={{ mb: 2 }}>
                <Typography variant='body1' className="al-label mt-3">Username</Typography>
              <TextField
              className="al-input"
                fullWidth
                id="username"
                name="username"
                placeholder="Enter your username"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
                <Typography variant='body1' className="al-label mt-3">Email</Typography>
              <TextField
              className="al-input"
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
              className="al-input"
                fullWidth
                id="password"
                name="password"
                placeholder="Enter your password"
                type="password"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
                <Typography variant='body1' className="al-label mt-3">Confirm Password</Typography>
              <TextField
                className="al-input"
                fullWidth
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Enter your Confirm password"
                type="password"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
              />
            </Box>
            
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="submit-button"
                sx={{ mt: 2, width: "100%" }}
              >
                Register
              </Button>
              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#1976d2", textDecoration: "none", fontWeight: "bold" }}>
              Login
            </Link>
          </Typography> 
          </Form>
        )}

      </Formik>
    </Container>
  );
};

export default Register;
