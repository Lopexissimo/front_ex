import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper } from "@mui/material";
import User from './User'

export default function SearchResults(props) {
    
    return (
        <TableContainer className="table" component={Paper} sx={{borderRadius:3, overflow:'hidden', boxShadow:1, mt:'1rem'
        }}>
            <Table>
                <TableHead sx={{backgroundColor:'rgba(0,0,0,0.1)'}}>
                    <TableRow >
                        <TableCell>Id</TableCell>
                        <TableCell>Nome</TableCell>
                        <TableCell>Cognome</TableCell>
                        <TableCell>Data di Nascita</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        props.users.map((user, index) => {
                            return (
                                <User key={index} user={user} onEdit={props.onEdit} onDelete={props.onDelete} />
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}