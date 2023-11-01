import PropTypes from 'prop-types';
import { useMemo, useState, createContext, useEffect } from 'react';
// @mui
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
//
import palette, {paletteDark, GREY, PRIMARY, SECONDARY, INFO, SUCCESS, WARNING, ERROR} from './palette';
import shadows from './shadows';
import typography from './typography';
import GlobalStyles from './globalStyles';
import customShadows from './customShadows';
import componentsOverride from './overrides';
import {useAuth} from  "../hooks/useAuth";
import useMode, {ModeContext} from "../hooks/display/useMode";

// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
  children: PropTypes.node,
};


export default function ThemeProvider({ children }) {
  const [mode, setMode] = useState('light');
  const [primaryColor, setPrimaryColor] = useState('primary'); 
  const themeOptions = useMemo(() => ({
      palette: {
        ...localStorage.getItem('mode') === 'dark' ? paletteDark : palette,
        primary: localStorage.getItem('color')?JSON.parse(localStorage.getItem('color')):PRIMARY,
      },
      shape: { borderRadius: 6 },
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
    }),[mode, primaryColor]
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <ModeContext.Provider value={{mode, setMode, primaryColor, setPrimaryColor}}>
        {children}
        </ModeContext.Provider>
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}

export {ModeContext};
