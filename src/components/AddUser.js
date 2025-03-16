
import { Dialog, TextField, Button, MenuItem, Select, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { useState } from "react";

export default function AddUser({ open, onClose, onAdd }) {

    //function to reset data
    const resetData = {
        firstName: "",
        lastName: "",
        email: "",
        birthDate: null,
        userType: "Customer"
    }

    const [userData, setUserData] = useState(resetData);

    //function to handle change 4 name, lastName, email and usertype
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleDateChange = (date) => {
        setUserData(prevData => ({
            ...prevData,
            birthDate: date.format("YYYY-MM-DD")
        }));
    };

    //function do handle submission, includes dialog close.
    const handleSubmit = () => {
        onAdd(userData);
        setUserData(resetData)
        onClose();
    };


    return (
        <Dialog className="addUserPage" onClose={onClose} open={open}>
            <DialogTitle sx={{ fontWeight: 'bold' }}>Aggiungi persona </DialogTitle>
            <DialogContent>
                <TextField name="firstName" label="Nome" value={userData.firstName} onChange={handleChange} fullWidth margin="dense" />
                <TextField name="lastName" label="Cognome" value={userData.lastName} onChange={handleChange} fullWidth margin="dense" />
                <TextField name="email" label="Email" value={userData.email} onChange={handleChange} fullWidth margin="dense" />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Data di nascita"
                        value={dayjs(userData.birthDate)}
                        onChange={handleDateChange}
                        slotProps={{ textField: { fullWidth: true, margin: "dense" } }}
                        maxDate={dayjs("2025-02-13")}
                    />
                </LocalizationProvider>

                <Select name="userType" laber='Tipologia' value={userData.userType} onChange={handleChange} fullWidth margin="dense">
                    <MenuItem value="Customer">Customer</MenuItem>
                    <MenuItem value="Worker">Worker</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                </Select>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Annulla</Button>
                <Button onClick={handleSubmit} color="primary" variant="contained">Salva Modifiche</Button>
            </DialogActions>
        </Dialog>
    );
}
