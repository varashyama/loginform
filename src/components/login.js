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

function checkData(values,history){ 

  axios.post('http://localhost:5000/login',values)  
  .then(response => {
    console.log(response);
    if(response.status === 200){

      sessionStorage.setItem('jwtToken', response.data.token);
      console.log('token generated');
      history.push("/details");

    }
  })
  .catch(error => {   
    alert('Invalid details');
    console.log(error);
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

export default function Login() {
  const classes = useStyles();
  let history = useHistory();


  return (
    <Container component="main" maxWidth="xs">

      <div className={classes.paper}>

        <Typography  variant="h5">
            Login
        </Typography>

        <Formik
          initialValues={{
           
            email: '',
            password: ''
           
          }}

          validate={values => {

            const errors = {};

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

           
            return errors;
          }}

          onSubmit={(values, { setSubmitting }) => {        
               checkData(values,history);
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
              <Link to='/signup'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>

            </form>
          )}
        </Formik>
      </div>

    </Container>
  );
}