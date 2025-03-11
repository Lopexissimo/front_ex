import { Container,Typography } from "@mui/material";

export default function Header(){
    return(
        <Container className="header">
            <Typography variant="h1" sx={{textAlign:"center"}}>
                HEADER
            </Typography>
        </Container>
    )
}