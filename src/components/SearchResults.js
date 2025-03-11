import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

export default function SearchResults() {
    /*
    -Props: Array di utenti, azioni per modifica/eliminazione da passare agli user
    -In tablebody itera nell'array di users per mostrarli.

    */
    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell>Nome</TableCell>
                        <TableCell>Cognome</TableCell>
                        <TableCell>Data di Nascita</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                </TableBody>
            </Table>
        </>
    )
}