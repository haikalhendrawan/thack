import {useState, useEffect, useContext} from "react";
import {styled} from "@mui/material/styles";
import {Switch, Button, IconButton, Badge, Chip, Fab} from "@mui/material";
import useMode, {ModeContext} from "../../../hooks/display/useMode";
import Iconify from '../../../components/iconify';

// value dari useMode hook ada di ../theme/index.js

const ThemeSwitcher = () => {
    const {mode, setMode} = useMode();
    const handleClick = () => {
        setMode((prev) => 
            prev==='light'?'dark':'light'
        )
        const currentMode = localStorage.getItem('mode');
        const newMode = currentMode === 'dark' ? 'light' : 'dark';
        localStorage.setItem('mode', newMode);
    };

    return(
    <div>
    <IconButton onClick={handleClick} variant='contained' size='large' sx={{mr:1}}>
        <Iconify icon={localStorage.getItem('mode')==='light'?"solar:sun-2-bold-duotone":"tdesign:mode-dark"}sx={{color:'orange'}} />    
    </IconButton>
    </div>
    )
}

export default ThemeSwitcher;