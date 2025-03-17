import { Button, CircularProgress, Container, LinearProgress, useMediaQuery, Box, Typography, TextField } from '@mui/material';
import Header from './components/Header';
import AddUser from './components/AddUser';
import { useState, useEffect, useCallback } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import MobileSearchResults from './components/mobile/MobileSearchResults';
import PageHandler from './components/PageHandler'
import Api from './util/Api';

function App() {
  const isMobile = useMediaQuery("(max-width:600px"); //4 visualization 
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([])
  const [openAddPage, setOpenAddPage] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);

  //fuction to open the addPage
  const handleClickOpen = () => {
    setOpenAddPage(true)
  }
  //function to close the addPage
  const handleClose = () => {
    setOpenAddPage(false);
  }
  //effect used to get the users from the API, just at the beginning
  useEffect(() => {
    const fillUsers = async () => {
      console.log('Loading data');
      let iterate = true;
      let data;
      let pag = 0;
      let allUsers = []
      setIsLoading(true);
      while (iterate) {
        data = await Api.getUsers(pag);
        pag++;
        if (data.results.length > 0) {
          allUsers = [...allUsers, ...data.results]
        }
        if (!data.hasNextPage) {
          iterate = false;
          setIsLoading(false);
        }
      }
      setUsers(allUsers);
    }
    fillUsers();
  }, []);

  //function to re-render and update filteredUsers at the beginning
  useEffect(() => {
    setFilteredUsers(users);
  }, [users])

  //function to filter the users based on the search term used
  const filterUsers = useCallback((term) => {
    setIsLoading(true);
    setTimeout(() => {

      if (!term) {
        setFilteredUsers(users);
        setIsLoading(false);
        return;
      }
      const lowerCaseTerm = term.toLowerCase();
      const result = users.filter(user =>
        user.id.includes(lowerCaseTerm) ||
        (user.firstName && user.firstName.toLowerCase().includes(lowerCaseTerm)) ||
        (user.lastName && user.lastName.toLowerCase().includes(lowerCaseTerm))
      )
      setFilteredUsers(result);
      setIsLoading(false);
    }, 300)
    setPage(0);

  }, [users]);

  //function to edit the user and update the modified user
  const editUser = useCallback(async (id, editedUser) => {
    const response = await Api.editUser(id, editedUser);
    if (response) {
      setUsers(prevUsers =>
        prevUsers.map(user => (user.id === id ? editedUser : user))
      );
      setFilteredUsers(prevFilteredUsers =>
        prevFilteredUsers.map(user => (user.id === id ? editedUser : user))
      );
    }
  }, [users, filteredUsers])

  //function to delete user
  const deleteUser = useCallback(async (id) => {
    const result = await Api.deleteUser(id);
    if (result) {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
      setFilteredUsers(prevFilteredUsers => prevFilteredUsers.filter(user => user.id !== id));
    }
  }, [users, filteredUsers])

  //function to add user
  const addUser = useCallback(async (user) => {
    const response = await Api.addUser(user);
    if (response) {
      setUsers(prevUsers => [...prevUsers, { ...user, id: response.data }]);
      setFilteredUsers(prevFilteredUsers => [...prevFilteredUsers, { ...user, id: response.data }]);
    }
  })

  //Function to show next page
  const nextPage = useCallback(() => {
    if (filteredUsers.length > page * 25 + 25) {
      setPage(prevPage => prevPage + 1)
      window.scrollTo({ top: 0 })
    }
  })
  //function to show precedent Page
  const prevPage = useCallback(() => {
    if (page > 0) {
      setPage(prevPage => prevPage - 1);
      window.scrollTo({ top: 0 })
    }
  })
  //function to set and visit a precise page
  const handlePageNumber = (e) => {
    setPage(Number(e.target.value));
  }

  return (
    <Container className='container'>
      <Header />
      <SearchBar onSearch={filterUsers} />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {
          isLoading ? <CircularProgress sx={{ mt: '1rem' }} /> : (
            isMobile ?
              <MobileSearchResults users={filteredUsers.slice(page * 25, page * 25 + 25)} onEdit={editUser} onDelete={deleteUser} />
              :
              <SearchResults users={filteredUsers.slice(page * 25, page * 25 + 25)} onEdit={editUser} onDelete={deleteUser} />
          )}
        <PageHandler page={page} handlePageNumber={handlePageNumber} filteredUsers={filteredUsers} prevPage={prevPage} nextPage={nextPage} />
        <Button onClick={handleClickOpen} color='primary' variant='contained' sx={{ mt: '2rem', mb: '100px' }}>
          Aggiungi Persona
        </Button>
      </Box>
      <AddUser open={openAddPage} onClose={handleClose} onAdd={addUser} />
    </Container >
  );
}

export default App;
