
import { Dialog, TextField, Button, MenuItem, Select, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { useState } from "react";

export default function EditUser({ user, open, onClose, onEdit }) {

    const [userData, setUserData] = useState({
        id: user.id || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        birthDate: user.birthDate ? dayjs(user.birthDate) : null,
        userType: user.userType || "Customer"
    });

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
        onClose();
    };

    return (
        <Dialog className="editUserPage" onClose={onClose} open={open}>
            <DialogTitle>Edit user {user.id}</DialogTitle>
            <DialogContent>
                <TextField name="firstName" label="First Name" value={userData.firstName} onChange={handleChange} fullWidth margin="dense" />
                <TextField name="lastName" label="Last Name" value={userData.lastName} onChange={handleChange} fullWidth margin="dense" />
                <TextField name="email" label="Email" value={userData.email} onChange={handleChange} fullWidth margin="dense" />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Birth Date"
                        value={dayjs(userData.birthDate)}  
                        onChange={handleDateChange}
                        slotProps={{ textField: { fullWidth: true, margin: "dense" } }}
                    />
                </LocalizationProvider>

                <Select name="userType" value={userData.userType} onChange={handleChange} fullWidth margin="dense">
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
