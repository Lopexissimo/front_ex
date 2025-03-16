
import { Dialog, TextField, Button, MenuItem, Select, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { useState, useEffect } from "react";

export default function EditUser({ user, open, onClose, onEdit }) {

    const resetData = {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        birthDate: null,
        userType: "Customer"
    }
    const [userData, setUserData] = useState(resetData);

    useEffect(() => {
        setUserData({
            id: user.id || "",
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            birthDate: user.birthDate || null,
            userType: user.userType || "Customer"
        })
    },[user])

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
        onEdit(user.id, userData);
        setUserData(resetData)
        onClose();
    };

    return (
        <Dialog className="editUserPage" onClose={onClose} open={open}>
            <DialogTitle sx={{fontWeight:'bold'}}>Modifica persona </DialogTitle>
            <DialogContent>
                <TextField name="firstName" label="Nome" value={userData.firstName} onChange={handleChange} fullWidth margin="dense" />
                <TextField name="lastName" label="Cognome" value={userData.lastName} onChange={handleChange} fullWidth margin="dense" />
                <TextField name="email" label="Email" value={userData.email} onChange={handleChange} fullWidth margin="dense" />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Data di Nascita"
                        value={dayjs(userData.birthDate)}
                        onChange={handleDateChange}
                        slotProps={{ textField: { fullWidth: true, margin: "dense" } }}
                        maxDate={dayjs("2025-02-13")} 
                    />
                </LocalizationProvider>

                <Select name="userType" label='Tipologia' value={userData.userType} onChange={handleChange} fullWidth margin="dense">
                    <MenuItem value="Customer">Customer</MenuItem>
                    <MenuItem value="Worker">Worker</MenuItem>
                </Select>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} sx={{textTransform:'none', color:'rgb(42, 38, 38)'}}>Annulla</Button>
                <Button onClick={handleSubmit}  variant="contained" sx={{
                    bgcolor:'rgb(2, 65, 225)', p:'0.5rem 2rem', borderRadius:3, textTransform:'none'
                    }}>Modifica</Button>
            </DialogActions>
        </Dialog>
    );
}
