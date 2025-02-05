import React from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../services/axiosConfig";




const EditContact = (props) => {
  const navigate = useNavigate();
  let { id } = useParams();
  const location = useLocation();
  const contactData = location.state?.contact;

  // **Formik validation schema**
  const validationSchema = Yup.object({
    name: Yup.string().matches(/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces").required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: contactData?.name || "",
      email: contactData?.email || "",
      phone: contactData?.phone || "",
    },
    validationSchema,
    onSubmit: async(values) => {
      const userId = localStorage.getItem("userId");
      try {
        values = {
          ...values,
          id: id
        }
        console.log('Request URL:', axios.defaults.baseURL + '/contact/update/' + id);
        const response = await axios.put(`/contact/update`, values, {
          params: {
            userId: userId
          }
        });
        console.log("response", response);
      } catch (error) {
        console.error("Error updating contact:", error);
      }
      navigate("/", { state: { refresh: true } });
    },
  });

  return (
    <div className="AddList">
      <div className="w-75 mx-auto mt-3">
        <div className="d-flex align-items-center">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="icons"
            onClick={() => navigate(-1)}
            style={{ marginRight: "5px", cursor: "pointer", fontSize: "21px" }}
          />
          <Typography variant="h5" className="al-heading" sx={{ marginBottom: "0px" }} gutterBottom>
            Edit Contact
          </Typography>
        </div>
        
        <form className="al-form" onSubmit={formik.handleSubmit}>
          {/* Name Field */}
          <Typography variant="body1" className="al-label mt-3">Name</Typography>
          <TextField
            className="al-input"
            variant="outlined"
            fullWidth
            placeholder="Enter your name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          {/* Email Field */}
          <Typography variant="body1" className="al-label">Email</Typography>
          <TextField
            className="al-input"
            variant="outlined"
            fullWidth
            placeholder="Enter your email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          {/* Phone Field */}
          <Typography variant="body1" className="al-label">Phone</Typography>
          <TextField
            className="al-input"
            variant="outlined"
            fullWidth
            placeholder="Enter your phone number"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />

          {/* Submit Button */}
          <Button variant="contained" type="submit" className="al-input al-btn mt-2">
            Edit Contact
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditContact;
