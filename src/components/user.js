import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Formik } from 'formik';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';


function sendData(values,history){ 

  axios.post('http://localhost:5000/user',values)
  
  .then(response => {
    console.log(response);
    if(response.status === 200){
      console.log('data inserted');
      alert('successfully inserted');
      history.push("/details");
    }
    else if(response.status === 400){
      alert('Invalid details');
      console.log("hijkhjkbnm")
    }
  })
  .catch(error => {   
    console.log(error)
  })

}



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  let history = useHistory();

  return (
    <Container component="main" maxWidth="xs">

      <div className={classes.paper}>

        <Typography  variant="h5">
            Sign Up
        </Typography>

        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            qualification:'',
            gender: ''
          }}

          validate={values => {

            const errors = {};

            // firstname validation
            if (!values.firstName){
              errors.firstName = 'Enter your firstname';
            } else if(values.firstName.length < 4 || values.firstName.length > 15){
              errors.firstName = 'Firstname is too short or too long';
            }

            // lastname validation
            if (!values.lastName){
              errors.lastName = 'Enter your lastname';
            } else if(values.lastName.length < 4 || values.lastName.length > 15){
              errors.lastName = 'name is too short or too long';
            }

            // email validation
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }

            // password validation
            if(!values.password){
              errors.password = 'enter password';
            } 
            else if(!/^(?=.*\d)(?=.*[a-z]).{8,}$/.test(values.password)){
              errors.password = 'password must contain atleast one number and 8 characters';
            }

            // qualification validation
            if (!values.qualification){
              errors.qualification = 'Enter your qualification';
            } else if(values.qualification.length < 2 || values.qualification.length > 10){
              errors.qualification = 'qualification is too short or too long';
            }

            // gender validation
            if(!values.gender){
              errors.gender = 'enter gender';
            }
            else if(values.gender !==  'male' && values.gender !== 'female' && values.gender !== 'other'){
              errors.gender = 'invalid gender';
            }
            return errors;
          }}

          onSubmit={(values, { setSubmitting }) => {        
            sendData(values,history);
           console.log(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,

          }) => (

            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.firstName && errors.firstName}
                    helperText = {touched.firstName && errors.firstName}
                    
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.lastName && errors.lastName}
                    helperText = {touched.lastName && errors.lastName}
                    autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && errors.email}
                    helperText = {touched.email && errors.email}
                    autoComplete="email"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && errors.password}
                    helperText = {touched.password && errors.password}                    
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="qualification"
                    label="Qualification"                   
                    value={values.qualification}                   
                    id="qualification"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.qualification && errors.qualification}
                    helperText = {touched.qualification && errors.qualification}
                    autoComplete="qualification"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="gender"
                    label="gender"
                    name="gender"
                    value={values.gender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.gender && errors.gender}
                    helperText = {touched.gender && errors.gender}
                    autoComplete="gender"
                  />
                </Grid>

              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                className={classes.submit}
              >
                Submit
            </Button>
            <Grid item>
              <Link to='/login'>
                {"Already have an account? Sign In"}
              </Link>
            </Grid>

            </form>
          )}
        </Formik>
      </div>

    </Container>
  );
}