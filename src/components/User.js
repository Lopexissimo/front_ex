import { IconButton, TableCell, TableRow } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { useState } from "react";
import EditUser from './EditUser'
import DeleteUser from "./DeleteUser";

export default function User(props) {
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false);

    const handleClickOpen = (type) => {
        if (type === 'edit') {
            setOpenEdit(true)
        } else if (type === 'delete') {
            setOpenDelete(true);
        }
    }

    const handleClose = () => {
        setOpenEdit(false);
        setOpenDelete(false);
    }

    return (<>
        <TableRow >
            <TableCell sx={{ width: '30%' }}>{props.user.id}</TableCell>
            <TableCell sx={{ width: '10%' }}>{props.user.firstName}</TableCell>
            <TableCell sx={{ width: '10%' }}>{props.user.lastName}</TableCell>
            <TableCell sx={{ width: '30%' }}>{props.user.birthDate}</TableCell>
            <TableCell sx={{ width: '20%', textAlign: 'right' }}>
                <IconButton onClick={() => handleClickOpen('edit')}>
                    <EditIcon />
                </IconButton>
                <EditUser onEdit={props.onEdit} user={props.user} open={openEdit} onClose={handleClose} />
                <IconButton onClick={() => handleClickOpen('delete')}>
                    <DeleteIcon />
                </IconButton>
                <DeleteUser onDelete={props.onDelete} open={openDelete} onClose={handleClose} user={props.user} />
            </TableCell>
        </TableRow>

    </>
    )
}