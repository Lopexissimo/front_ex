import { Container,Typography } from "@mui/material";

export default function Header(){
    return(
        <Container className="header" disableGutters sx={{mt:'1.5rem'}}>
            <Typography variant="h3" >
                Persone
            </Typography>
        </Container>
    )
}