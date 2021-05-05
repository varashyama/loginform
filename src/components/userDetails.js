import React from 'react';
import { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const useStyles = makeStyles({
  container: {
    marginTop: 80

  },
  head: {
    textAlign: 'center'
  },
  search: {
    marginTop: 20,
    width: 200,
    float: 'right',

  },
  table: {
    marginTop: 20,
    minWidth: 700,
  },
  space: {
    marginRight: 10
  }
});


function handleClick() {
  console.log("edit");
}

export default function UserDetails() {
  const classes = useStyles();
  const [search, handleChange] = useState("");
  const [details, setDetails] = useState([]);

  function getUserData(){
    axios.get('http://localhost:5000/user')
    .then(response => {
    const data = response.data;
      setDetails(data)
      console.log(response.data);
      if (response.status === 200) {
        console.log('data received');
      }
    })
    .catch(error => {
      console.log(error)
    })  
  }

  function handleDelete(id) {
    axios.delete(`http://localhost:5000/user/${id}`)  
    .then(response => {
      if(response.status === 200){
        getUserData();
        console.log('data deleted');
        alert('successfully deleted');
      }
    })
    .catch(error => {   
      console.log(error)
    })
  
  }  

  useEffect(() =>{
    getUserData()
  },[])

  return (
    <Container className={classes.container} component="main" >

      <Typography className={classes.head} component="h1" variant="h4">
        User Details
      </Typography>

      <TextField
        className={classes.search}
        name="search"
        variant="outlined"
        fullWidth
        id="search"
        label="Search"
        onChange={event => { handleChange(event.target.value) }}
      />

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>

              <StyledTableCell>Firstname</StyledTableCell>
              <StyledTableCell>Lastname</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Qualification</StyledTableCell>
              <StyledTableCell>Gender</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>

            </TableRow>
          </TableHead>
          <TableBody>

            { details?.filter((row) => {

              if (search === "") {
                return details;
              }
              else if (row.firstName.toLowerCase().includes(search.toLowerCase())) {
                return row;
              }             

              }).map((row) => {
              return (
                <StyledTableRow key={row._id}>

                  <StyledTableCell>{row.firstName}</StyledTableCell>
                  <StyledTableCell>{row.lastName}</StyledTableCell>
                  <StyledTableCell>{row.email}</StyledTableCell>
                  <StyledTableCell>{row.qualification}</StyledTableCell>
                  <StyledTableCell>{row.gender}</StyledTableCell>
                  <StyledTableCell>
                    <IconButton onClick={handleClick}>
                      <EditIcon className={classes.space} />
                    </IconButton>
                    <IconButton onClick={handleDelete.bind(window,row._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })
            }

          </TableBody>
        </Table>
      </TableContainer>
    </Container>

  );
}

