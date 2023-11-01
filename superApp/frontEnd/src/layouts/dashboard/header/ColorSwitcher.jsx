import {useState, useEffect, useContext} from "react";
import {styled, alpha, useTheme} from "@mui/material/styles";
import {Switch, Button, IconButton, Stack, Popper, Paper, Fade, ClickAwayListener} from "@mui/material";
import { ThemeContext } from "@emotion/react";
import useMode, {ModeContext} from "../../../hooks/display/useMode";
import Iconify from '../../../components/iconify';
import {GREY, PRIMARY, SECONDARY, INFO, SUCCESS, WARNING, ERROR, GREEN, PURPLE} from '../../../theme/palette';



const ColorSwitcher = () => {
    const {mode, setMode, primaryColor, setPrimaryColor} = useMode();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setOpen(prev => !prev)
        setAnchorEl(event.currentTarget)
    };
    const handleColorClick = (color) => {
        setPrimaryColor(color);
        localStorage.setItem('color', JSON.stringify(color))
      };

    const handleClose= () => {
        setOpen(false);
    };

    return(
    <div>
    <IconButton variant='contained' size='large' sx={{mr:1}} onClick={handleClick}>
        <Iconify icon={"mdi:palette"} />    
    </IconButton>
    <Popper open={open} anchorEl={anchorEl} placement={'bottom'} transition sx={{ zIndex: 1102}}>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper sx={{boxShadow:"0px 5px 5px -3px rgba(145, 158, 171, 0.2), 0px 8px 10px 1px rgba(145, 158, 171, 0.14), 0px 3px 14px 2px rgba(145, 158, 171, 0.12)"}}>
            <ClickAwayListener onClickAway={handleClose}>
            <div>
                <Stack direction="row" spacing={2}>
                    <IconButton onClick={() => handleColorClick(PRIMARY)}><Iconify icon={"carbon:dot-mark"} sx={{color:'#2065d1', borderRadius:'50%', backgroundColor: JSON.parse(localStorage.getItem('color'))?.name==='primary'?theme.palette.action.selected:null}} /></IconButton>
                    <IconButton onClick={() => handleColorClick(GREEN)}><Iconify icon={"carbon:dot-mark"} sx={{color:'rgb(0, 167, 111)', borderRadius:'50%', backgroundColor: JSON.parse(localStorage.getItem('color'))?.name==='green'?theme.palette.action.selected:null}} /></IconButton>
                    <IconButton onClick={() => handleColorClick(PURPLE)}><Iconify icon={"carbon:dot-mark"} sx={{color:'#9c27b0', borderRadius:'50%', backgroundColor: JSON.parse(localStorage.getItem('color'))?.name==='purple'?theme.palette.action.selected:null}} /></IconButton>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <IconButton onClick={() => handleColorClick(ERROR)}><Iconify icon={"carbon:dot-mark"} sx={{color:ERROR.main, borderRadius:'50%', backgroundColor: JSON.parse(localStorage.getItem('color'))?.name==='error'?theme.palette.action.selected:null}} /></IconButton>
                    <IconButton onClick={() => handleColorClick(WARNING)}><Iconify icon={"carbon:dot-mark"} sx={{color:WARNING.main, borderRadius:'50%', backgroundColor: JSON.parse(localStorage.getItem('color'))?.name==='warning'?theme.palette.action.selected:null}} /></IconButton>
                    <IconButton onClick={() => handleColorClick(PRIMARY)}><Iconify icon={"bx:reset"}/></IconButton>
                </Stack>
            </div>
            </ClickAwayListener>
            </Paper>
          </Fade>
        )}
    </Popper>
    </div>
    )
}

export default ColorSwitcher;