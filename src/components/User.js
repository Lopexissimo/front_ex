import { IconButton, TableCell, TableRow } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { useCallback, useState } from "react";
import EditUser from './EditUser'
import DeleteUser from "./DeleteUser";

export default function User(props) {
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false);

    const handleClickOpen = (type) => {
        if(type === 'edit'){
            setOpenEdit(true)
        }else if(type === 'delete'){
            setOpenDelete(true);
        }
    }

    const handleClose = () => {
        setOpenEdit(false);
        setOpenDelete(false);
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
                <IconButton onClick={()=> handleClickOpen('edit')}>
                    <EditIcon />
                </IconButton>
                <EditUser onEdit={props.onEdit} user={props.user} open={openEdit} onClose={handleClose}/>
            </TableCell>
            <TableCell>
                <IconButton  color="error" onClick={() => handleClickOpen('delete')}>
                    <DeleteIcon/>
                </IconButton>
                <DeleteUser onDelete={props.onDelete} open={openDelete} onClose={handleClose} id={props.user.id} />
            </TableCell>
        </TableRow>

    </>
    )
}