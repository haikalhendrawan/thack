import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import axios from "axios"
// @mui
import { Container, Stack, Typography, Grid, Card, CardHeader, Box, Button, Tooltip, IconButton, Skeleton } from '@mui/material';
import Iconify from "../components/iconify";
import UserRoleCard from "../sections/admin/UserRoleCard";


// ----------------------------------------------------------------------

export default function HomePage(props) {
  const [userData, setUserData] = useState(null);  // variabel utk nyimpen user data dari SQL, kemudian di map ke tabel2
  const [roleData, setRoleData] = useState (null); // variabel utk nyimpen role data dari SQL, kemudian di map ke tabel2


  // ----- narik data user dari sql ketika pertama kali render page
  useEffect(() => {
    const getData = async() => {
      try{

        const response = await axios.get("http://localhost:3031/getAllUser");
        const response2 = await axios.get("http://localhost:3031/getAllRole");
        setUserData(response.data); // [{user_id, username, nik, name}]
        setRoleData(response2.data);// [{junction_id, user_id, app_id, role_id}]
        return
      }catch(err){
        console.log(err);
      }
    };
    getData();
  },[])

  return (
    <>
      <Helmet>
        <title> Dashboard:Home </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Role Management
        </Typography>

      <Grid container spacing={3}>
        {userData?.map((object, index) => (
            <UserRoleCard key={index} name={object.name} nik={object.nik} username={object.username} user_id={object.user_id} roleData={roleData && roleData}/>
        ))}
      </Grid>

      </Container>
    </>
  );
}
