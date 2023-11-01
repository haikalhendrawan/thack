import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, useNavigation, redirect } from 'react-router-dom';
import axios from "axios";
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, FormControlLabel, Alert, AlertTitle, Snackbar, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import AuthContext from "../../../context/AuthProvider"
import {useAuth} from "../../../hooks/useAuth";


// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const {auth, setAuth} = useAuth(); // {user_id:xxx, username: xx, nik:xx, name:xx, accessToken, role:[xx],msg:xx}
  const [showPassword, setShowPassword] = useState(false); 
  const [value, setValue] = useState({    // value dari input form
    username:"",
    password:"",
  }); 
  const [open, setOpen] = useState(false);  // state snackBar
  const [loading, setLoading] = useState(false);  // state loading Button

  const urlParams = new URLSearchParams(window.location.search);
  const origin = urlParams.get('origin');

  useEffect(()=>{   // effect setiap awal render
  setOpen(false);
  },[])
 
  useEffect(()=>{  // effect ketika variabel auth berubah
  if(auth){
    if(auth.accessToken){
      setLoading(true); 
    }else{
      setOpen(true)
    }
  }
  },[auth])

  const handleChange = (event) => {
    setValue({
      ...value,
      [event.target.name]:event.target.value,
    });
  };

  const handleSubmit = async (event)=>{
    event.preventDefault();
    try{
      const response = await axios.post("http://localhost:3031/login", {username:value.username, password:value.password}, {withCredentials:true});
      setAuth(response.data);  //  {user_id:xxx, username: xx, nik:xx, name:xx, accessToken, role:[xx],msg:xx}
      localStorage.setItem('mode', 'light');
      {origin?window.location.href=`${origin}/home?accessToken=${JSON.stringify(response.data)}`:window.location.href="http://localhost:3030/app"};
    }catch(err){
      console.log(err);
      setAuth(err.response.data);
      setOpen(true);
    }
  }

  const handleClose = ()=>{
    setOpen(false);
  }

  
// ----------------------------------------------------------------------

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField name="username" label="Username atau NIK" onChange={handleChange} value={value.username}/>

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={handleChange}
          value={value.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical:'top', horizontal:'right'}} >
        <Alert 
          onClose={handleClose} 
          variant="filled" 
          severity={auth&&auth.accessToken?"success":"error"} 
          sx={{ width: '100%' }}
        >
          {auth&&auth.accessToken?"Login Success":
          auth?.errorMsg?auth.errorMsg:"Server Unavailable"}
        </Alert>
      </Snackbar>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <FormControlLabel control={<Checkbox />} label="Remember me" /> 
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading} >
        Login
      </LoadingButton>
      </form>
    </div>
    
  );
}
