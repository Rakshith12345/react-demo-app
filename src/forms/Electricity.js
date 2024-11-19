import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography, Box, Grid, Paper, Dialog, DialogActions, DialogContent, DialogTitle, RadioGroup, Radio, FormControlLabel, FormControl } from '@mui/material';
import image from "../assets/electricss.avif";
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';

function Electricity() {
  const [name, setName] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [units, setUnits] = useState(''); // To store the number of units
  const [paidOnTime, setPaidOnTime] = useState('yes'); // To store the payment status ("yes" or "no")
  const [openDialog, setOpenDialog] = useState(false); // To control the modal for the bill
  const [billAmount, setBillAmount] = useState(null); // To store the generated bill amount
  const [finalAmount, setFinalAmount] = useState(null); // To store final amount after penalty if any
  const [error, setError] = useState(''); // To store error messages


   // Calculate the bill
    let totalBill = 0;


  useEffect(() => {
   let finalAmount=0

 if (paidOnTime === 'no') {  
      finalAmount = Number(billAmount)  + 50; // Add ₹50 penalty    
    }
    // Set the final amount after penalty if any
    setFinalAmount(finalAmount.toFixed(2));

},[paidOnTime,billAmount])

   

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Reset error message on form submit

    // Validate inputs
    if (!customerId || !name || units <= 0) {
      setError('Please fill in all fields with valid values.');
      return;
    }

   

    if (units <= 100) {
      totalBill = units * 6;
    } else if (units <= 200) {
      totalBill = 100 * 6 + (units - 100) * 8;
    } else {
      totalBill = 100 * 6 + 100 * 8 + (units - 200) * 12;
    }

    // Round and set bill amount
    setBillAmount(totalBill.toFixed(2));

    // Open dialog to show bill
    setOpenDialog(true);
  };

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
            <Paper elevation={4} sx={{ height: "90%", width: '70%', padding: 4, backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 4 }}>
              <Grid container justifyContent='center' alignItems='center' rowSpacing={2} columnSpacing={2}>
                {/* Circle with Electricity Icon */}
                <Grid item xs={12} align="center">
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      border: '2px solid black',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: 3,
                    }}
                  >
                    <ElectricBoltIcon sx={{ color: 'black', fontSize: 50 }} />
                  </Box>

                  <Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold' }}>
                    Generate Electricity Bills
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Enter Customer ID"
                    variant="outlined"
                    fullWidth
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    size='small'
                    sx={{
                      borderRadius: '12px',
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Customer Name"
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    size='small'
                    sx={{
                      borderRadius: '12px',
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Units"
                    type='number'
                    variant="outlined"
                    fullWidth
                    value={units}
                    onChange={(e) => setUnits(e.target.value)}
                    size='small'
                    sx={{
                      borderRadius: '12px',
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                      },
                    }}
                  />
                </Grid>

                {error && (
                  <Grid item xs={12} sx={{ color: 'red', textAlign: 'center' }}>
                    <Typography variant="body2">{error}</Typography>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                  >
                    Generate the Bills
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Dialog to display the generated bill */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle sx={{ textAlign: 'center', color: '#1976d2', fontWeight: 'bold' }}>Electricity Bills</DialogTitle>
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
            <strong>Original Bill: ₹ </strong>
            <span style={{ fontSize: '1.5rem' }}>{billAmount}</span>
          </Typography>

          {/* Radio buttons to check if the bill was paid on time */}
          <FormControl component="fieldset">
            <Typography variant="h6" sx={{ marginBottom: '10px', fontWeight: 'bold' }}>
              Was the bill paid on time?
            </Typography>
            <RadioGroup
              row
              aria-label="payment-status"
              name="payment-status"
              value={paidOnTime}
              onChange={(e) => setPaidOnTime(e.target.value)}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>

          {paidOnTime === 'no' && (
            <Typography variant="h6" sx={{ color: 'red', fontWeight: 'bold', marginTop: '10px' }}>
              A penalty of ₹50 will be added to the bill.
            </Typography>
          )}

          <Typography variant="h6" sx={{ color: '#388e3c', fontWeight: 'bold', marginTop: '20px' }}>
            <strong>Final Bill: ₹ </strong>
            <span style={{ fontSize: '1.5rem' }}>{paidOnTime==='yes' ? billAmount: finalAmount}</span>
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
