import {useState, useEffect} from "react";
import axios from "axios";
import { Container, Stack, Typography, Grid, Card, CardHeader, Button, Divider, Avatar, Select, FormControl, InputLabel, MenuItem, IconButton} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import Iconify from "../../components/iconify";
import Label from "../../components/label";


const selectItem1 = [
    {jenis:'User', value:1},
    {jenis:'Admin', value:2},
  ]

  const selectItem2 = [
    {jenis:'User', value:3},
    {jenis:'Admin', value:4},
    {jenis:'Super Admin', value:5}, 
  ]

  const selectItem3 = [
    {jenis:'User', value:6},
    {jenis:'Admin Lv.1', value:7},
    {jenis:'Admin Lv.2', value:8},
    {jenis:'Admin Lv.3', value:9},
    {jenis:'Admin Lv.4', value:10},
    {jenis:'Admin Lv.5', value:11},
  ]

  // -------------------------------------------------


const UserRoleCard = (props) => {
    const [value, setValue] = useState({
        app1:null,
        app2:null,
        app3:null
    });
    const [selectedRoleIds, setSelectedRoleIds] = useState({
    });

    useEffect(() => {
        console.log(value)
    },[value])

    const roleData = props.roleData; //[{junction_id, user_id, app_id, role_id}]
    const roleDataByUser = roleData.filter((item) => item.user_id===props.user_id);
    const roleApp1 = roleDataByUser.filter((item) => item.app_id===1); // super app
    const roleApp2 = roleDataByUser.filter((item) => item.app_id===2); // app a
    const roleApp3 = roleDataByUser.filter((item) => item.app_id===3); //app b

    const isUser1 = roleApp1.length > 0; //superApp
    const isUser2 = roleApp2.length > 0; //app a
    const isUser3 = roleApp3.length > 0; //app b

    const handleGrant = async (userId, appId, roleId) => {
        try {
            const response = await axios.post(`http://localhost:3031/addRole/${userId}/${appId}/${roleId}`, {
            });
            console.log(response.data);
            window.location.reload();
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handleChange = (event, appId) => {
        const selectedRoleText = event.target.value;
        setValue(prevState => ({
            ...prevState,
            [`app${appId}`]: selectedRoleText
        }));
    };
    const handleRevoke = async (userId, appId) => {
        try {
            const response = await axios.delete(`http://localhost:3031/deleteRole/${userId}/${appId}`, {
            });
            console.log(response.data);
            window.location.reload();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleUpdate = async (userId, appId, roleId) => {
        try {
            const response = await axios.get(`http://localhost:3031/editRole/${userId}/${appId}/${roleId}`, {
            });
            console.log(response.data);
            window.location.reload();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return(
        <Grid item xs={12} sm={12} md={12}>
            <Card>
                <CardHeader title={<Head name={props.name}/>} subheader={props.nik}/> 

                <Grid container sx={{mt:5}}spacing={0}>  {/* Kepala Table*/}
                    <Grid item xs={4} sx={{textAlign:'center'}}>
                        <Typography variant="body">Aplikasi</Typography>
                    </Grid>

                    <Divider orientation='vertical' flexItem/>  

                    <Grid item xs={2} sx={{textAlign:'center'}}>
                        <Typography variant="body">Access</Typography>
                    </Grid>

                    <Divider orientation='vertical' flexItem/>  

                    <Grid item xs={3} sx={{textAlign:'center'}}>
                        <Typography variant="body">Role</Typography>
                    </Grid>

                    <Divider orientation='vertical' flexItem/>  

                    <Grid item xs={2} sx={{textAlign:'center'}}>
                        <Typography variant="body">Manage</Typography>
                    </Grid>
                </Grid>

                <Divider  flexItem/>  

                <Grid container sx={{mt:1, height:'50px'}}spacing={0}>  {/* -------------Table Body Super App ----------------*/}

                    <Grid item  xs={4} sx={{textAlign:'center', justifyContent:'center'}}> {/* Kolom Nama Aplikasi*/}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="body2">Super App</Typography>
                            <img src="https://www.freepnglogos.com/uploads/s-letter-logo-png-3.png" style={{ width: '40px', height: '40px' }} alt="logo" />
                        </div>
                    </Grid>

                    <Divider orientation='vertical' flexItem/>  

                    <Grid item xs={2} sx={{textAlign:'center', justifyContent:'center'}}>  {/* Kolom Status Apakah Terdaftar*/}
                        {isUser1 ? (
                            <Label color="success" sx={{mt:1}}>Terdaftar</Label>
                        ): <Label color="error" sx={{mt:1}}>Tidak Terdaftar</Label>}
                    </Grid>

                    <Divider orientation='vertical' flexItem/>  

                    <Grid item xs={3} sx={{textAlign:'center', justifyContent:'center'}}>     {/* Kolom Pilh Role*/}
                        {isUser1 ? roleApp1[0].role_name : null}
                        {isUser1 ? (
                            <FormControl sx={{  minWidth: 120, ml:2}} size="small">
                                <InputLabel id="demo-simple-select-label" sx={{typography:'body2'}}>Update Role</InputLabel>
                                <Select labelId="selectRole" id="selectRole" value={value.app1 || ''} sx={{width:'140px', typography:'body2'}} label="Update Role" onChange={(event) => handleChange(event, 1)}>
                                    {selectItem1.map((item, index) => {
                                    return(<MenuItem sx={{typography:'body2'}} key={index} value={item.value}>{item.jenis}</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                        ): 
                            <FormControl sx={{  minWidth: 120 }} size="small">
                                <InputLabel id="demo-simple-select-label" sx={{typography:'body2'}}>Update Role</InputLabel>
                                <Select disabled labelId="selectRole" id="selectRole" value={value.app1  || ''} sx={{width:'140px', typography:'body2'}} label="Update Role" onChange={(event) => handleChange(event, 1)}>
                                    {selectItem1.map((item, index) => {
                                    return(<MenuItem sx={{typography:'body2'}} key={index} value={item.value}>{item.jenis}</MenuItem>)
                                    })}
                                </Select>   
                            </FormControl>
                        }
                    </Grid>

                    <Divider orientation='vertical' flexItem/>  

                    {isUser1? 
                    <Grid item xs={2.5} sx={{textAlign:'center', justifyContent:'center'}} >  {/* Kolom Status Apakah Terdaftar*/}
                        <Button color="error" variant="contained" size="small" startIcon={<Iconify icon="solar:forbidden-circle-bold"/>} sx={{mr:1}}
                        onClick={() => {handleRevoke(props.user_id, 1)}}>
                            Revoke
                        </Button>
                        <Button color="warning" variant="contained" size="small" startIcon={<Iconify icon="solar:refresh-circle-bold"/>}
                        onClick={() => {handleUpdate(props.user_id, 1, value.app1)}}>
                            Update
                        </Button>
                    </Grid>
                    : 
                    <Grid item xs={2} sx={{textAlign:'start', justifyContent:'start'}}>  {/* Kolom Status Apakah Terdaftar*/}
                        <Button color="success" variant="contained" size="small" startIcon={<Iconify icon="solar:add-circle-bold"/>} sx={{ml:3}} 
                        onClick={() => {handleGrant(props.user_id, 1, 1)}}>
                            Grant
                        </Button>
                    </Grid>
                    }
                    </Grid>

                <Grid container sx={{mt:1, height:'50px'}}spacing={0}>  {/* -------------Table Body2 ----------------*/}

                    <Grid item  xs={4} sx={{textAlign:'center', justifyContent:'center'}}> {/* Kolom Nama Aplikasi*/}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="body2">Aplikasi A</Typography>
                            <img src="../../../logo-telkom.png" style={{ width: '40px', height: '40px' }} alt="logo" />
                        </div>
                    </Grid>

                    <Divider orientation='vertical' flexItem/>  

                    <Grid item xs={2} sx={{textAlign:'center', justifyContent:'center'}}>  {/* Kolom Status Apakah Terdaftar*/}
                        {isUser2 ? (
                            <Label color="success" sx={{mt:1}}>Terdaftar</Label>
                        ): <Label color="error" sx={{mt:1}}>Tidak Terdaftar</Label>}
                    </Grid>

                    <Divider orientation='vertical' flexItem/>  

                    <Grid item xs={3} sx={{textAlign:'center', justifyContent:'center'}}>     {/* Kolom Pilh Role*/}
                        {isUser2 ? roleApp2[0].role_name : null}   
                        {isUser2 ? (
                            <FormControl sx={{  minWidth: 120 ,ml:2}} size="small">
                                <InputLabel id="demo-simple-select-label" sx={{typography:'body2'}}>Update Role</InputLabel>
                                <Select labelId="selectRole" id="selectRole" value={value.app2 || ''} sx={{width:'140px', typography:'body2'}} label="Update Role" onChange={(event) => handleChange(event, 2)}>
                                    {selectItem2.map((item, index) => {
                                    return(<MenuItem sx={{typography:'body2'}} key={index} value={item.value}>{item.jenis}</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                        ): 
                            <FormControl sx={{  minWidth: 120 }} size="small">
                                <InputLabel id="demo-simple-select-label" sx={{typography:'body2'}}>Update Role</InputLabel>
                                <Select disabled labelId="selectRole" id="selectRole" value={value.app2 || ''} sx={{width:'140px', typography:'body2'}} label="Update Role" onChange={(event) => handleChange(event, 2)}>
                                    {selectItem2.map((item, index) => {
                                    return(<MenuItem sx={{typography:'body2'}} key={index} value={item.value}>{item.jenis}</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                        }
                    </Grid>

                    <Divider orientation='vertical' flexItem/>  
                    
                    {isUser2? 
                    <Grid item xs={2.5} sx={{textAlign:'center', justifyContent:'center'}} >  {/* Kolom Status Apakah Terdaftar*/}
                        <Button color="error" variant="contained" size="small" startIcon={<Iconify icon="solar:forbidden-circle-bold"/>} sx={{mr:1}}
                        onClick={() => {handleRevoke(props.user_id, 2)}}>
                            Revoke
                        </Button>
                        <Button color="warning" variant="contained" size="small" startIcon={<Iconify icon="solar:refresh-circle-bold"/>}
                        onClick={() => {handleUpdate(props.user_id, 2, value.app2)}}>
                            Update
                        </Button>
                    </Grid>
                    : 
                    <Grid item xs={2} sx={{textAlign:'start', justifyContent:'start'}}>  {/* Kolom Status Apakah Terdaftar*/}
                        <Button color="success" variant="contained" size="small" startIcon={<Iconify icon="solar:add-circle-bold"/>} sx={{ml:3}}
                        onClick={() => {handleGrant(props.user_id, 2, 3)}}>
                            Grant
                        </Button>
                    </Grid>
                    }
                </Grid>

                <Grid container sx={{mt:1, height:'50px'}}spacing={0}>  {/* ---------------Table Body3 ------------------*/}
                    <Grid item  xs={4} sx={{textAlign:'center'}}> {/* Kolom Nama Aplikasi*/}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="body2">Aplikasi B</Typography>
                            <img src="../../../kemenkeu.png" style={{ width: '40px', height: '40px' }} alt="logo" />
                        </div>
                    </Grid>

                    <Divider orientation='vertical' flexItem/>  

                    <Grid item xs={2} sx={{textAlign:'center', justifyContent:'center'}}>  {/* Kolom Status Apakah Terdaftar*/}
                        {isUser3 ? (
                            <Label color="success" sx={{mt:1}}>Terdaftar</Label>
                        ): <Label color="error" sx={{mt:1}}>Tidak Terdaftar</Label>}
                    </Grid>

                    <Divider orientation='vertical' flexItem/>  

                    <Grid item xs={3} sx={{textAlign:'center'}}>     {/* Kolom Pilh Role*/}
                        {isUser3 ? roleApp3[0].role_name : null}   
                        {isUser3 ? (
                            <FormControl sx={{  minWidth: 120, ml:2 }} size="small">
                                <InputLabel id="demo-simple-select-label" sx={{typography:'body2'}}>Update Role</InputLabel>
                                <Select labelId="selectRole" id="selectRole" value={value.app3 || ''} sx={{width:'140px', typography:'body2'}} label="Update Role" onChange={(event) => handleChange(event, 3)}>
                                    {selectItem3.map((item, index) => {
                                    return(<MenuItem sx={{typography:'body2'}} key={index} value={item.value}>{item.jenis}</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                        ): 
                            <FormControl sx={{  minWidth: 120 }} size="small">
                                <InputLabel id="demo-simple-select-label" sx={{typography:'body2'}}>Update Role</InputLabel>
                                <Select disabled labelId="selectRole" id="selectRole" value={value.app3 || ''} sx={{width:'140px', typography:'body2'}} label="Update Role" onChange={(event) => handleChange(event, 3)}>
                                    {selectItem3.map((item, index) => {
                                    return(<MenuItem sx={{typography:'body2'}} key={index} value={item.value}>{item.jenis}</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                        }
                    </Grid>

                    <Divider orientation='vertical' flexItem/>    
                    {isUser3? 
                        <Grid item xs={2.5} sx={{textAlign:'center', justifyContent:'center'}} >  {/* Kolom Status Apakah Terdaftar*/}
                            <Button color="error" variant="contained" size="small" startIcon={<Iconify icon="solar:forbidden-circle-bold"/>} sx={{mr:1}}
                            onClick={() => {handleRevoke(props.user_id, 3)}}>
                                Revoke
                            </Button>
                            <Button color="warning" variant="contained" size="small" startIcon={<Iconify icon="solar:refresh-circle-bold"/>}
                            onClick={() => {handleUpdate(props.user_id, 3, value.app3)}}>
                                Update
                            </Button>
                        </Grid>
                    : 
                    <Grid item xs={2} sx={{textAlign:'start', justifyContent:'start'}}>  {/* Kolom Status Apakah Terdaftar*/}
                        <Button color="success" variant="contained" size="small" startIcon={<Iconify icon="solar:add-circle-bold"/>} sx={{ml:3}}
                        onClick={() => {handleGrant(props.user_id, 3, 6)}}>
                            Grant
                        </Button>
                    </Grid>
                    }
                    
                </Grid>

                <Grid container sx={{mt:1, height:'50px'}}spacing={0}>  {/* ------------------Table Body 4 ------------------*/}

                    <Grid item xs={4} sx={{textAlign:'center'}}> {/* Kolom Nama Aplikasi*/}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="body2">Aplikasi C</Typography>
                            <img src="../../../tokopedia.png" style={{ width: '40px', height: '40px' }} alt="logo" />
                        </div>
                    </Grid>

                    <Divider orientation='vertical' flexItem/>  

                    <Grid item xs={2} sx={{textAlign:'center', justifyContent:'center'}}>  {/* Kolom Status Apakah Terdaftar*/}
                        <Label color="success" sx={{mt:1}}>Terdaftar</Label>
                    </Grid>

                    <Divider orientation='vertical' flexItem/>  

                    <Grid item xs={3} sx={{textAlign:'center'}}>     {/* Kolom Pilh Role*/}
                
                        <FormControl sx={{  minWidth: 120, ml:2 }} size="small">
                            <InputLabel id="demo-simple-select-label" sx={{typography:'body2'}}>Update Role</InputLabel>
                            <Select disabled labelId="selectRole" id="selectRole" value={value} sx={{width:'140px', typography:'body2'}} label="Update Role" onChange={handleChange}>
                                {selectItem3.map((item, index) => {
                                return(<MenuItem sx={{typography:'body2'}}key={index} value={item.value}>{item.jenis}</MenuItem>)
                                })}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Divider orientation='vertical' flexItem/>  

                    <Grid item xs={2.5} sx={{textAlign:'center', justifyContent:'center'}} >  {/* Kolom Status Apakah Terdaftar*/}
                        <Button color="error" variant="contained" size="small" startIcon={<Iconify icon="solar:forbidden-circle-bold"/>} sx={{mr:1}}>
                            Revoke
                        </Button>
                        <Button color="warning" variant="contained" size="small" startIcon={<Iconify icon="solar:refresh-circle-bold"/>}>
                            Update
                        </Button>
                    </Grid>
                </Grid>

                <Grid container sx={{mt:1, height:'50px'}}spacing={0}>  {/* --------------Table Body 5 -----------------*/}

                    <Grid item  xs={4} sx={{textAlign:'center'}}> {/* Kolom Nama Aplikasi*/}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="body2">Aplikasi D</Typography>
                            <img src="../../../pln.png" style={{ width: '40px', height: '40px' }} alt="logo" />
                        </div>
                    </Grid>

                    <Divider orientation='vertical' flexItem/>  

                    <Grid item xs={2} sx={{textAlign:'center', justifyContent:'center'}}>  {/* Kolom Status Apakah Terdaftar*/}
                        <Label color="success" sx={{mt:1}}>Terdaftar</Label>
                    </Grid>

                    <Divider orientation='vertical' flexItem/>  

                    <Grid item xs={3} sx={{textAlign:'center'}}>     {/* Kolom Pilh Role*/}
                 
                        <FormControl sx={{  minWidth: 120, ml:2 }} size="small">
                            <InputLabel id="demo-simple-select-label" sx={{typography:'body2'}}>Update Role</InputLabel>
                            <Select disabled labelId="selectRole" id="selectRole" value={value} sx={{width:'140px', typography:'body2'}} label="Update Role" onChange={handleChange}>
                                {selectItem3.map((item, index) => {
                                return(<MenuItem sx={{typography:'body2'}}key={index} value={item.value}>{item.jenis}</MenuItem>)
                                })}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Divider orientation='vertical' flexItem/>  

                    <Grid item xs={2.5} sx={{textAlign:'center', justifyContent:'center'}} >  {/* Kolom Status Apakah Terdaftar*/}
                        <Button color="error" variant="contained" size="small" startIcon={<Iconify icon="solar:forbidden-circle-bold"/>} sx={{mr:1}}>
                            Revoke
                        </Button>
                        <Button color="warning" variant="contained" size="small" startIcon={<Iconify icon="solar:refresh-circle-bold"/>}>
                            Update
                        </Button>
                    </Grid>
                </Grid> 
            </Card>
        </Grid> 
        
        )
    
}


const Head = (props) => {
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

export default UserRoleCard;
