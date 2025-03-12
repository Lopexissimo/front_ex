import { IconButton, TableCell, TableRow } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit"
import { useCallback, useState } from "react";
import EditUser from './EditUser'

export default function User(props) {
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (<>
        <TableRow key={props.index}>
            <TableCell>{props.user.id}</TableCell>
            <TableCell>{props.user.firstName}</TableCell>
            <TableCell>{props.user.lastName}</TableCell>
            <TableCell>{props.user.birthDate}</TableCell>
            <TableCell>

            </TableCell>
            <TableCell>
                <IconButton onClick={handleClickOpen}>
                    <EditIcon />
                </IconButton>
                <EditUser onEdit={props.onEdit} user={props.user} open={open} onClose={handleClose}/>
            </TableCell>
        </TableRow>

    </>
    )
}