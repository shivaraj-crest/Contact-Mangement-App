import React from "react";
import { Button, TextField, Typography, Snackbar, Alert } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../services/axiosConfig";

const AddList = (props) => {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  // ✅ Define Formik with Yup validation
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().matches(/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces").required("Name is required"),
      email: Yup.string().email("Invalid email format").required("Email is required"),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      props.onAddContact(values);
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
        console.log("userId",userId);
      try {
        const response = await axios.post("/contact/create", values, {
        //no need to send token in header as we have interceptor in axiosConfig.js
        //   headers: {
        //     "Authorization": `Bearer ${token}`
        //   },
          params: {
            userId: userId
          }
        });
        console.log("response", response);
        resetForm();
        setOpenSnackbar(true);
      } catch (error) {
        console.error("Error creating contact:", error);
        // Handle error (e.g., show an error message to the user)
      }
    },
  });

  const handleCloseSnackbar = (event, reason) => {  
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  return (
    <div className="AddList">
      <div className="w-75 mx-auto mt-3">
        <div className="d-flex align-items-center">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="icons"
            onClick={() => navigate(-1)}
            style={{ marginRight: "5px" }}
          />
          <Typography variant="h5" className="al-heading" sx={{ marginBottom: "0px" }} gutterBottom>
            Add Contact
          </Typography>
        </div>

        {/* Formik Form */}
        <form className="al-form" onSubmit={formik.handleSubmit}>
          {/* Name Input */}
          <Typography variant="body1" className="al-label mt-3">Name</Typography>
          <TextField
            className="al-input"
            placeholder="Enter your name"
            variant="outlined"
            fullWidth
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          {/* Email Input */}
          <Typography variant="body1" className="al-label">Email</Typography>
          <TextField
            className="al-input"
            placeholder="Enter your email"
            variant="outlined"
            fullWidth
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          {/* Phone Input */}
          <Typography variant="body1" className="al-label">Phone Number</Typography>
          <TextField
            className="al-input"
            placeholder="Enter your Phone number"
            variant="outlined"
            fullWidth
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />

          {/* Submit Button */}
          <Button variant="contained" type="submit" className="al-input al-btn mt-2">
            Add Contact
          </Button>
        </form>
      </div>

      {/* ✅ Snackbar for Success Message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{
          position: "absolute !important",
          top: "59px !important",
          right: "33px !important",
          zIndex: 9999,
        }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          Contact has been added successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddList;
