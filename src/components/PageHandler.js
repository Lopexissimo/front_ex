import { Box, Typography, TextField, Button } from "@mui/material";


export default function PageHandler({ page, handlePageNumber, filteredUsers, prevPage, nextPage }) {

    return (
        <Box>
            <Typography sx={{ mt: '1rem' }}>Total results: {filteredUsers.length}  | Page number:
                <TextField value={page} onChange={handlePageNumber} onKeyDown={(e) => e.key === 'Enter' && window.scrollTo({top:0})}
                    sx={{
                        width: '3rem', height: '1rem', p: '0px', ml:'1rem', mr:'1rem',
                        '& .MuiOutlinedInput-root': {
                            padding: 0
                        },
                        '& .MuiInputBase-input': {
                            padding: '4px 8px',
                            height: '1rem'
                        }
                    }} />
                     of {Math.ceil(filteredUsers.length / 25)}
            </Typography>
            <Box sx={{ display: 'flex', mt: '1rem', justifyContent:'center' }}>
                <Button sx={{ textTransform: 'none' }} onClick={prevPage}>Previous</Button>
                <Button sx={{ textTransform: 'none' }} onClick={nextPage}>Next</Button>
            </Box>
        </Box>
    )

}