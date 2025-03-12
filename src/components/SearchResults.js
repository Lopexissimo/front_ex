import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import User from './User'

export default function SearchResults(props) {
    /*
    -Props: Array di utenti, azioni per modifica/eliminazione da passare agli user
    -In tablebody itera nell'array di users per mostrarli.

    */
    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Nome</TableCell>
                        <TableCell>Cognome</TableCell>
                        <TableCell>Data di Nascita</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                        {
                            props.users.map((user,index) => {
                                return (
                                    <User user={user} index={index} onEdit={props.onEdit} onDelete={props.onDelete}/>
                                )
                            })
                        }
                </TableBody>
            </Table>
        </>
    )
}