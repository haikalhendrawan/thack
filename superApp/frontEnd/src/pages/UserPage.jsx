import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import axios from "axios";
// @mui
import { Container, Stack, Typography, Grid, Box, Button, Modal, InputAdornment, IconButton, Paper, TextField, FormHelperText, FormControl} from '@mui/material';
import Iconify from "../components/iconify";
import UserDataCard from "../sections/admin/UserDataCard";

// ----------------------------------------------------------------------
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius:'12px'
};

export default function HomePage(props) {
  const [open, setOpen] = useState(false); // open dan close modal 1 (tambah user)
  const [open2, setOpen2] = useState(false); // open dan close modal 2 (edit user)
  const [value, setValue] = useState({    // value dari input form 1 (tambah user)
    username:"",
    nama:"",
    nik:"",
    password:""
  }); 
  const [value2, setValue2] = useState({    // value dari input form 2 (edit user)
    username:"",
    nama:"",
    nik:"",
    userId:"",
  }); 
  const [showPassword, setShowPassword] = useState(false);  // nunjukin password di form input
  const [response, setResponse] = useState("");  // nunjukin feedback di modal apakah query sukses atau tidak
  const [userData, setUserData] = useState(null);  // variabel utk nyimpen user data dari SQL, kemudian di map ke tabel2

  const handleClick = (prev) => { // open dan close modal 1 (tambah user)
    setOpen(prev => !prev);
  }
  const handleClick2 = (name, nik, username, userId) => { //open dan close modal 2 (edit user)
    setOpen2(true);
    setValue2({
      username: username,
      nama: name,
      nik: nik,
      userId:userId
    });
  };

  const handleClose = () => {
    setOpen(false);
    setOpen2(false);
  }

  const handleChange = (event) => {
    setValue({
      ...value,
      [event.target.name]:event.target.value,
    });
  };

  const handleChange2 = (event) => {
    setValue2({
      ...value2,
      [event.target.name]:event.target.value,
    });
  };

  const addUser = async (event) => {
    event.preventDefault();
    try{
      // ---- tambah user ke SQL
      const response = await axios.post("http://localhost:3031/addUser", {username:value.username, password:value.password, nik:value.nik, name:value.nama});
      setResponse('success inserting data');

      // ----- narik table terbaru dari sql untuk me refresh tampilan UI seketika
      const response2 = await axios.get("http://localhost:3031/getAllUser");
      setUserData(response2.data);
      setValue({
        username:"",
        nama:"",
        nik:"",
        password:""
      })
      return
    }catch(err){
      console.log(err);
      setResponse("data failed to be inserted")
    }
  }

  const editUser = async (event) => {
    event.preventDefault();
    try{
      // ---- edit user ke SQL
      const response = await axios.post(`http://localhost:3031/editUser/${value2.userId}`, {username:value2.username, nik:value2.nik, name:value2.nama});
      setResponse('success edit data');
    
      // ----- narik table terbaru dari sql untuk me refresh tampilan UI seketika
      const response2 = await axios.get("http://localhost:3031/getAllUser");
      setUserData(response2.data);

      setValue2({
        username:"",
        nama:"",
        nik:"",
        userId:""
      })
    }catch(err){
      console.log(err);
      setResponse("data failed to be inserted")
    }
  }

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async() => {
      try{
        // ----- narik data user dari sql ketika pertama kali render page
        const response = await axios.get("http://localhost:3031/getAllUser");
        setUserData(response.data); // [{user_id, username, nik, name}]
        setIsLoading(false);
        return
      }catch(err){
        console.log(err);
        setIsloading(false);
      }
    };
    getData();
  },[])

  const updateTable = () => {
    const getData = async() => {
      try{
        // ----- narik table terbaru dari sql untuk me refresh tampilan UI seketika, fungsi ini di pass ke prop anak component
        const response = await axios.get("http://localhost:3031/getAllUser");
        setUserData(response.data);
        console.log(response.data);
        return
      }catch(err){
        console.log(err);
      }
    };
    getData();
  }

  // ------------------------------------------------------------------------------
  return (
    <>
      <Helmet>
        <title> Super App </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            User Management
          </Typography>

          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleClick}>
              New User
          </Button>
        </Stack>

      {/* Tabel Data User  di generate menggunakan fungsi map, komponen UserDataCard ada di folder section/admin */}
      <Grid container spacing={3}>
        {userData?.map((object, index) => (
            <UserDataCard key={index} name={object.name} nik={object.nik} username={object.username} user_id={object.user_id} onDelete={updateTable} onEdit={handleClick2}/>
        ))
        }
      </Grid>

      {/* --------------------------- --------MODAL UNTUK INPUT USER BARU------------------------------------------------- */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Paper sx={{height:'600px', width:'300px'}}>
            <Typography variant="h4" sx={{ mb: 5 }}>
              Add User
            </Typography>

            <Stack spacing={3}>
              <FormControl>
                <TextField name="username" label="Username" onChange={handleChange} value={value.username}/>
                <FormHelperText>String Varchar</FormHelperText>
              </FormControl>

              <FormControl>
              <TextField name="nama" label="Nama" onChange={handleChange} value={value.nama}/>
                <FormHelperText>String Varchar</FormHelperText>
              </FormControl>

              <FormControl>
                <TextField name="nik" label="NIK" onChange={handleChange} value={value.nik}/>
                <FormHelperText>Varchar 16 Digit</FormHelperText>
              </FormControl>
            
              <TextField name="password" label="Password" type={showPassword ? 'text' : 'password'} onChange={handleChange} value={value.password}
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

              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={addUser}>
                  Add
              </Button>

              <Typography variant="body" sx={{ mb: 5 }}>
              Response: {response}
              </Typography>
            </Stack>
          </Paper>
        </Box>
      </Modal>

      {/* --------------------------- --------MODAL UNTUK EDIT USER ------------------------------------------------- */}
      <Modal open={open2} onClose={handleClose}>
        <Box sx={style}>
          <Paper sx={{height:'600px', width:'300px'}}>
            <Typography variant="h4" sx={{ mb: 5 }}>
              Edit User
            </Typography>

            <Stack spacing={3}>
              <FormControl>
                <TextField name="username" label="Username" disabled value={value2.username}/>
                <FormHelperText>String Varchar</FormHelperText>
              </FormControl>

              <FormControl>
              <TextField name="nama" label="Nama" onChange={handleChange2} value={value2.nama}/>
                <FormHelperText>String Varchar</FormHelperText>
              </FormControl>

              <FormControl>
                <TextField name="nik" label="NIK" onChange={handleChange2} value={value2.nik}/>
                <FormHelperText>Varchar 16 Digit</FormHelperText>
              </FormControl>
            
              <Button variant="contained" color="warning" startIcon={<Iconify icon="eva:plus-fill" />} onClick={editUser}>
                  Update
              </Button>

              <Typography variant="body" sx={{ mb: 5 }}>
              Response: {response}
              </Typography>
            </Stack>
          </Paper>
        </Box>
      </Modal>

      </Container>
      </>

  );
 
}
