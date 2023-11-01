import { useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { Grid, Box, Typography} from '@mui/material';
// @mui
import { styled } from '@mui/material/styles';
//
import Header from '../header';
import Nav from '../nav';
import Footer from '../footer';
import {useAuth} from "../../../hooks/useAuth"

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(5),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------
 
export default function RequireAuthLayout({allowedRoles}) {
  const {auth} = useAuth();  //  {user_id:xxx, username: xx, nik:xx, name:xx, accessToken, role:[xx],msg:xx}
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const roleOnSuperApp = auth && auth.role ? auth.role.filter(item => item.app_id === 1) : []; //  {app_id:xx, app_name, role_id:xx, role_name} 

  if (!auth || !auth.accessToken){
    return <Navigate to="/login" state={{from:location}} replace />
  }

  if (roleOnSuperApp.some(item => allowedRoles.includes(item.role_id))){
    return (
    <StyledRoot> 
      <Header onOpenNav={() => setOpen(true)} />
      <Nav openNav={open} onCloseNav={() => setOpen(false)} />
      <Main>
        <Outlet />
        <Footer />
      </Main>
    </StyledRoot>)
  }
  
  return <Navigate to="/404" state={{from:location}} replace /> // if user sudah login, tapi allowed role tidak termasuk

  
}
