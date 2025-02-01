import React from 'react';
import { Button,TextField,InputAdornment,Box,Card,Container } from '@mui/material';
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { Typography} from '@mui/material';

const Login = () => {

    const initialValues = {
        email: "",
        password: ""
    }

    const validationSchema = yup.object({
        email: yup.string().email('Invalid email').required('Email is required'),
        password: yup.string().required('Password is required')
    });

    const onSubmit = (values) => {
        console.log('Form data:', values);
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
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Login;