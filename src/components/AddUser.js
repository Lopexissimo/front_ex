import { TextField, Typography, Card } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function AddPerson() {
    /*
        -   Props: function to add a person/
        -   function to create an Id randomly(?)
        -   States to manage input changes??
    */
    return (
        <Card className="addUser">
            <Typography>Add a User</Typography>
            <TextField id="Nome" label="Nome" />
            <TextField id="Cognome" label="Cognome" />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="BirthDate" />
            </LocalizationProvider>

        </Card>
    )
}