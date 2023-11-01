import {useState} from "react";
import axios from "axios";
import { Container, Stack, Typography, Grid, Card, CardHeader, Button, Divider, Avatar, Select, FormControl, InputLabel, MenuItem, IconButton} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import Iconify from "../../components/iconify";
import Label from "../../components/label";




const UserDataCard = (props) => {

    const handleDelete = async (id) => { // --------- fungsi untuk delete user, melakukan request ke API
        try{
            await axios.delete(`http://localhost:3031/deleteUser/${id}`);
            console.log('delete success');
            props.onDelete();
        }catch(err){
            console.log(err)
        }
    }

    return(
        <Grid item xs={12} sm={12} md={12}>
            <Card>
                <CardHeader title={<Head name={props.name}/>}  subheader="317405080499902"/> 

                <Grid container sx={{mt:5}}spacing={0}>  {/* Kepala Table*/}
                    <Grid item xs={4} sx={{textAlign:'center'}}>
                        <Typography variant="body"> Nama User</Typography>
                    </Grid>

                    <Divider orientation='vertical' flexItem/>  

                    <Grid item xs={2} sx={{textAlign:'center'}}>
                        <Typography variant="body">NIK</Typography>
                    </Grid>

                    <Divider orientation='vertical' flexItem/>  

                    <Grid item xs={3} sx={{textAlign:'center'}}>
                        <Typography variant="body">Username</Typography>
                    </Grid>

                    <Divider orientation='vertical' flexItem/>  

                    <Grid item xs={2} sx={{textAlign:'center'}}>
                        <Typography variant="body">Manage</Typography>
                    </Grid>
                </Grid>

                <Divider  flexItem/>  

                <Grid container sx={{mt:1, height:'50px'}} spacing={0}>  {/* Table Body*/}

                    <Grid item xs={4} sx={{textAlign:'center', justifyContent:'center'}}> {/* Kolom Nama User*/}
                        <Typography variant="body2">{props.name}</Typography>
                    </Grid>

                    <Divider orientation='vertical' flexItem/>  

                    <Grid item xs={2} sx={{textAlign:'center', justifyContent:'center'}}>  {/* Kolom NIK*/}
                        <Label color="success" sx={{mt:1}}>{props.nik}</Label>
                    </Grid>

                    <Divider orientation='vertical' flexItem/>  

                    <Grid item xs={3} sx={{textAlign:'center', justifyContent:'center'}}>     {/* Kolom Username*/}
                        {props.username}
                    </Grid>

                    <Divider orientation='vertical' flexItem/>  

                    <Grid item xs={2.5} sx={{textAlign:'center', justifyContent:'center'}} >  {/* Manage User*/}
                        <Button color="error" variant="contained" size="small" startIcon={<Iconify icon="solar:trash-bin-trash-bold"/>} onClick={()=> {handleDelete(props.user_id)}}sx={{mr:1}}>
                            Delete
                        </Button>
                        <Button color="warning" variant="contained" size="small" startIcon={<Iconify icon="solar:pen-new-square-bold"/>} 
                        onClick={() => {props.onEdit(props.name, props.nik, props.username, props.user_id);}}>
                            Edit
                        </Button>
                    </Grid>
                </Grid>

            </Card>
        </Grid> 
        
        ) 
}

const Head = (props) => {  // bagian atas dari masing2 tabel gambar dan nama user
    const randomNumber = Math.floor(Math.random()*15)+1;
    return(
    <>
    <Stack direction="row" spacing={2} sx={{alignItems:'center'}}>
        <Typography>{props.name}</Typography>
        <Avatar src={`../../../avatars/avatar_${randomNumber}.jpg`} />
    </Stack>
    
    </>
    )

}

export default UserDataCard;
