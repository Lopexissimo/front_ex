import { Dialog, DialogActions, DialogTitle, Button, Typography, DialogContent } from "@mui/material";

export default function DeleteUser({ user, onClose, open, onDelete }) {

    const handleDelete = () => {
        onDelete(user.id);
        onClose();
    }

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle sx={{ fontWeight: 'bold' }}>Elimina persona</DialogTitle>
            <DialogContent>
                <Typography>Sei sicuro di voler eliminare la persona <b>{user.firstName} {user.lastName}</b>?</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} sx={{textTransform:'none', color:'rgb(42, 38, 38)'}}>Annulla</Button>
                <Button onClick={handleDelete} variant="contained" sx={{
                    bgcolor:'rgb(207, 0, 0)', p:'0.5rem 1.5rem', borderRadius:3, textTransform:'none'
                    }}>Rimuovi</Button>
            </DialogActions>
        </Dialog >
    )
}