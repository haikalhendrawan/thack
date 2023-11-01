import {Stack, Typography} from "@mui/material";


const Footer = () => {
    return(
        <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{mt:5, mb:-2}}
        >
            <Typography variant='body2'>Copyright © 2023 Kanwil DJPb Prov Sumbar</Typography>
        </Stack>
    )
}

export default Footer;