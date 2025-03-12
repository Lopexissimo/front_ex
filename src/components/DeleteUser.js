import { Dialog, DialogActions, DialogTitle, Button } from "@mui/material";

export default function DeleteUser({ id, onClose, open, onDelete }) {

    const handleDelete = () => {
        onDelete(id);
        onClose();
    }

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>Vuoi davvero eliminare l'utente con id: {id}</DialogTitle>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Annulla</Button>
                <Button onClick={handleDelete} color="primary" variant="contained">Elimina Utente</Button>
            </DialogActions>
        </Dialog>
    )
}