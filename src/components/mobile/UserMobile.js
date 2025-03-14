import { Card, CardContent, Box, IconButton, List, ListItem, ListItemText, Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import EditUser from '../EditUser';
import DeleteUser from "../DeleteUser";

export default function UserMobile(props) {
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const handleClickOpen = (type) => {
        if (type === 'edit') {
            setOpenEdit(true);
        } else if (type === 'delete') {
            setOpenDelete(true);
        }
    };

    const handleClose = () => {
        setOpenEdit(false);
        setOpenDelete(false);
    };

    return (
        <Card sx={{ boxShadow: 1, borderRadius: 2, overflow: 'hidden' }}>
            <CardContent>
                <List >
                    <ListItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <ListItemText secondary="ID" />
                        <ListItemText primary={props.user.id} />
                    </ListItem>
                    <Divider />
                    <ListItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <ListItemText secondary="Nome" />
                        <ListItemText primary={props.user.firstName} />
                    </ListItem>
                    <Divider />
                    <ListItem sx={{ display: 'flex', flexDirection: 'column',alignItems:'flex-start'  }}>
                        <ListItemText secondary="Cognome" />
                        <ListItemText primary={props.user.lastName} />
                    </ListItem>
                    <Divider />
                    <ListItem sx={{ display: 'flex', flexDirection: 'column',alignItems:'flex-start'  }}>
                        <ListItemText secondary="Data di Nascita" />
                        <ListItemText primary={props.user.birthDate} />
                    </ListItem>
                </List>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <IconButton onClick={() => handleClickOpen('edit')} sx={{width:'40%', boxShadow: 1, borderRadius: 2, m:'1rem'}}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleClickOpen('delete')} sx={{width:'40%', boxShadow: 1, borderRadius: 2, m:'1rem'}}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </CardContent>

            <EditUser onEdit={props.onEdit} user={props.user} open={openEdit} onClose={handleClose} />
            <DeleteUser onDelete={props.onDelete} open={openDelete} onClose={handleClose} user={props.user} />
        </Card>
    );
}