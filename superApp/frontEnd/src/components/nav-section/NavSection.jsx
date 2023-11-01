import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Box, List, ListItemText, ListSubheader, Button, Divider} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
  header:PropTypes.string
};

export default function NavSection({ data = [], ...other}) {
  return (
    <Box {...other}>
      <List 
        disablePadding sx={{ p: 1 }}
        subheader={other.header?
        <ListSubheader component='a' sx={{fontSize: '12px', color:'rgb(99, 115, 129)', backgroundColor:'transparent'}}>
          {other.header}
        </ListSubheader>:null
        }
      >
        {data.map((item) => (
          <NavItem key={item.title} item={item}/>
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, info, newTab } = item;
  const theme = useTheme();

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      target={newTab?'_blank':null}
      sx={
        localStorage.getItem('mode')==='light'?
        {
          '&.active': {
            color: theme.palette.primary.main,
            bgcolor: alpha(theme.palette.primary.main, 0.08),
            fontWeight: 600,
           },
        }:
        {
        '&.active': {
          color: theme.palette.primary.light,
          bgcolor: alpha(theme.palette.primary.main, 0.08),
          fontWeight: 600,
         },
        }
      }
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />



      {info && info}
    </StyledNavItem>
  );
}
