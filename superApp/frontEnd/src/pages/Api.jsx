import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import {useEffect} from "react";
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';

import {useAuth} from "../hooks/useAuth";

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Page404() {
  const {auth, setAuth} = useAuth();
  console.log(auth)
  return (
    <>
      <Helmet>
        <title> 404 Page Not Found | Minimal UI </title>
      </Helmet>

      <Container>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            This content came from Dummy app2
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            API DummyApp2
          </Typography>

          <Box
            component="img"
            src="https://images.pond5.com/closeup-funny-cat-face-curious-footage-070633093_prevstill.jpeg"
            sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
          />

          <Button to="/" size="large" variant="contained" component={RouterLink}>
            Go to Home
          </Button>
        </StyledContent>
      </Container>
    </>
  );
}
