import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ThankYouPage = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        textAlign: "center",
        mt: 10,
        p: 4,
        boxShadow: 3,
        borderRadius: 3,
        backgroundColor: "#fff",
      }}
    >
      <CheckCircleIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Thank You!
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Your submission has been received successfully.  
        We’ll get back to you soon.
      </Typography>
      <Button variant="contained" color="primary" href="/">
        Back to Home
      </Button>
    </Container>
  );
};

export default ThankYouPage;
