import { TextField, IconButton, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useCallback, useState } from "react";

export default function SearchBar(props) {
    const [term, setTerm] = useState('');

    //handles change and update the state
    const handleTermChange = (e) => {
        setTerm(e.target.value);
    };
    //handle research once the button is clicked or enter is pressed
    const search = useCallback(() => {
        props.onSearch(term)
    }, [term, props.onSearch])

    return (
        <div className="searchBar">
            <TextField
  fullWidth
  id="search"
  label="search"
  onChange={handleTermChange}
  onKeyDown={(e) => e.key === 'Enter' && search()}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={search} color="primary">
          <SearchIcon />
        </IconButton>
      </InputAdornment>
    )
  }}
/>

        </div>
    )
}