import { Box, Stack } from "@mui/material";
import UserMobile from './UserMobile';

export default function SearchResults(props) {
  //visualized just in Mobile mode
  
  return (
    <Box sx={{ mt: '1rem' }}>
      <Stack spacing={2}>
        {props.users.map((user, index) => (
          <UserMobile key={index} user={user} onEdit={props.onEdit} onDelete={props.onDelete} />
        ))}
      </Stack>
    </Box>
  );
}