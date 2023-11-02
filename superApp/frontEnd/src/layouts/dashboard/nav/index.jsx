import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack, LinearProgress } from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';
import { useAuth } from '../../../hooks/useAuth';
// components
import Logo from '../../../components/logo';
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
//
import navConfig, {navConfig3, navConfig4, navConfig5} from './config';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();
  const auth = useAuth();
  const token = JSON.stringify(auth.auth.accessToken);
  console.log(token);
  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex', alignItems:'center' }}>
        <Logo />
        <Typography variant="h5" gutterBottom color={'primary'}>
          Super
        </Typography>
        <Typography variant="h5" gutterBottom sx={{color:'#FFC107'}}>
          Apps
        </Typography>
      </Box>
      
      <NavSection data={navConfig5} header={"ADMIN"} />
      <NavSection data={[
  {
    title: 'Aplikasi A',
    path: `http://localhost:3004/home?accessToken=${token}`,
    icon: <img src="../../../logo-telkom.png" style={{ width: '30px', height: '30px' }}/>,
    newTab:true
  },
  {
    title: 'Aplikasi B',
    path: `http://localhost:3003/home?accessToken=${token}`,
    icon: <img src="../../../kemenkeu.png" style={{ width: '30px', height: '30px' }}/>,
    newTab:true
  },
  {
    title: 'Aplikasi C',
    path: '/',
    icon: <img src="../../../tokopedia.png" style={{ width: '30px', height: '30px' }}/>,
    newTab:false
  },
  {
    title: 'Aplikasi D',
    path: '/',
    icon: <img src="../../../pln.png" style={{ width: '30px', height: '30px' }}/>,
    newTab:false
  },
]} header={"EKOSISTEM SUPER APP"} />
      <NavSection data={navConfig3} header={"FITUR"}/>
      <NavSection data={navConfig4} header={"OTHER"} />

      <Box sx={{ flexGrow: 1 }} />

    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >

      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
