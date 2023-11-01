import { Helmet } from 'react-helmet-async';
import {useState, useEffect} from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button, Card, Alert, Box, LinearProgress} from '@mui/material';
// hooks
import Waterwave from "react-water-wave";
import useResponsive from '../hooks/useResponsive';
// components
import Iconify from '../components/iconify';
// sections
import { LoginForm } from '../sections/auth/login';


// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: '720px', 
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
}));


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

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');
  const [showAlert, setShowAlert] = useState(false);

  const handleClick=()=>{
    setShowAlert((prevState)=>{return !prevState})
  }


  return (
    <>
      <Helmet>
        <title> Login </title>
      </Helmet>

      <StyledRoot>
          <StyledSection>
            <img
              src={'backdropThack.png'}
              alt="background"
              style={{
                width: 'auto',
                height: '600px',
                backgroundSize:'cover',
                minWidth: '120%'
              }}
            />
          </ StyledSection>
          
        <Container maxWidth="sm" >
          <StyledContent>
            <Stack direction='row'>
              <Typography variant="h4" gutterBottom sx={{mr:1}}>
                Sign in ke 
              </Typography>
              <Typography variant="h4" gutterBottom color={'primary'}>
                Super
              </Typography>
              <Typography variant="h4" gutterBottom sx={{color:'#FFC107'}}>
                Apps
              </Typography>
            </Stack>
            <Typography variant="body" gutterBottom>
              Press tombol berikut utk lihat akun dan password!
            </Typography>

            <Stack direction="column" spacing={1} justifyContent="center" alignItems="center">
              <Button size="large" color="inherit" variant="outlined" sx={{mb:2}} onClick={handleClick}>
                  <Iconify icon="line-md:account" color="#2065D1" width={22} height={22} />
              </Button>
              {showAlert?(
                <Alert 
                  variant="filled" 
                  severity="info"   
                  sx={{
                    position: 'relative',
                    bottom: '7px', 
                  }}
                > Use <strong>"root/index"</strong>as username/password
                </Alert>):null}
            </Stack>

            <LoginForm />   {/* logika dihandle di komponen ini */}
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
