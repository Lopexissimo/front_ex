import { TableCell, TableRow } from "@mui/material";

export default function User(){
/*
    -   Props: oggetto utente / funzione di elimina/ funzione di modifica
    -   le ultime due celle sono bottoni --> link a delete/modify page
    -   L'id, nome e congome sono link alla userInfo page.
*/
    return(
        <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>
                <Fab aria-label="edit"></Fab>
            </TableCell>
            <TableCell>
                <Fab aria-label="delete"></Fab>
            </TableCell>
        </TableRow>
    )
}