import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Grid, Paper, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import image from "../assets/electricss.avif"
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';

function Electricity() {
  // State variables for the input fields
  const [name, setName] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [units, setUnits] = useState('');  // To store the number of units
  
  
  const [openDialog, setOpenDialog] = useState(false);  // To control the modal for the bill
  const [billAmount, setBillAmount] = useState(null);   // To store the generated bill amount

  const handleSubmit = (e) => {
    e.preventDefault();

   

    if (units <= 100) {
      const totalBill = units * 0.10
      setBillAmount(totalBill.toFixed(2));
    } else if (units <= 200) {
     const totalBill = 100 * 0.10 + (units - 100) * 0.15
      setBillAmount(totalBill.toFixed(2));
    } else {
    const  totalBill = 100 * 0.10 + 100 * 0.15 + (units - 200) * 0.20
      setBillAmount(totalBill.toFixed(2));
    }

    
    

    // Show the generated bill in a dialog
      // Round the bill to two decimal places
    setOpenDialog(true);  // Open the dialog to display the bill
  };

  // Close the dialog when the user clicks "Close"
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Container maxWidth="sm"
      sx={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        paddingTop: 4,
        paddingBottom: 4,
      }}>
      
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={3}>

          <Grid item xs={12} md={4} mt={10} align='center'>
            <Paper elevation={4}  sx={{ height: "90%", width:'70%',padding:4,backgroundColor: 'rgba(255, 255, 255, 0.9)',borderRadius:4 }}>
              <Grid container justifyContent='center' alignItems='center' rowSpacing={2} columnSpacing={2} >
                 {/* Circle with Electricity Icon */}
                <Grid item xs={12} align="center">
                  <Box
                    sx={{
                      width: 50,  // Size of the circle
                      height: 50,
                      borderRadius: '50%',  // Makes the box a circle
                      border:'2px solid black',  // Circle background color (can change)
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: 3,  // Adds space between the circle and form
                    }}
                  >
                    <ElectricBoltIcon sx={{ color: 'black', fontSize: 50 }} />
                  </Box>

                  <Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold' }}>
                    Generate Electricity Bill
                  </Typography>
                </Grid>
                 <Grid item xs={12} >
                    <TextField
                      label="Enter Customer ID"
                       variant="outlined"
                       fullWidth
                       value={customerId}
                       onChange={(e) => setCustomerId(e.target.value)}
                       size='small'
                    sx={{
                       borderRadius: '12px', // Apply border-radius to make corners rounded
                       '& .MuiOutlinedInput-root': {
                        borderRadius: '12px', // Ensure border-radius for the input element
                        },
                      }}
                    />
                </Grid>
                <Grid item xs={12} >
                   <TextField
                    label="Customer Name"
                    variant="outlined"
                    fullWidth
                    
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    size='small'
                    sx={{
                       borderRadius: '12px', // Apply border-radius to make corners rounded
                       '& .MuiOutlinedInput-root': {
                        borderRadius: '12px', // Ensure border-radius for the input element
                        },
                      }}
                   />
                </Grid>
                <Grid item xs={12} >
                   <TextField
                    label="Units"
                    type='number'
                   variant="outlined"
                    fullWidth
                    
                    value={units}
                    onChange={(e) => setUnits(e.target.value)}
                    size='small'
                    sx={{
                       borderRadius: '12px', // Apply border-radius to make corners rounded
                       '& .MuiOutlinedInput-root': {
                        borderRadius: '12px', // Ensure border-radius for the input element
                        },
                      }}
                  />
                </Grid>
                <Grid item xs={12}>
                    <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    >
                    Generate Bill
                     </Button>
                </Grid>
              </Grid>
            </Paper>
            </Grid>     
        </Grid>
      </Box>



      {/* Dialog to display the generated bill */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle sx={{ textAlign: 'center', color: '#1976d2', fontWeight: 'bold' }}>Electricity Bill</DialogTitle>
        <DialogContent sx={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
          <Typography variant="h6" sx={{ marginBottom: '15px', fontWeight: 'bold' }}>
            <strong>Customer Name:</strong> {name}
          </Typography>
          <Typography variant="h6" sx={{ marginBottom: '15px', fontWeight: 'bold' }}>
            <strong>Customer ID:</strong> {customerId}
          </Typography>
          <Typography variant="h6" sx={{ marginBottom: '15px', fontWeight: 'bold' }}>
            <strong>Units Consumed:</strong> {units} units
          </Typography>
          <Typography variant="h6" sx={{ color: '#388e3c', fontWeight: 'bold', marginBottom: '20px' }}>
            <strong>Total Bill: ₹ </strong>
            <span style={{ fontSize: '1.5rem' }}>{billAmount}</span>
          </Typography>
        </DialogContent>
        <DialogActions sx={{ padding: '10px 20px', backgroundColor: '#e0e0e0' }}>
          <Button onClick={handleCloseDialog} color="primary" sx={{ fontWeight: 'bold' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Electricity;
