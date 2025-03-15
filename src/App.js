import { Button, CircularProgress, Container, useMediaQuery } from '@mui/material';
import Header from './components/Header';
import AddUser from './components/AddUser';
import { useState, useEffect, useCallback } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import MobileSearchResults from './components/mobile/MobileSearchResults';
import Api from './util/Api';
import { DisplaySettings } from '@mui/icons-material';

function App() {
  const isMobile = useMediaQuery("(max-width:600px"); //4 visualization 
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([])
  const [openAddPage, setOpenAddPage] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

//TO DOOOOOOOOOOOO
/*
-tutti gli user vengono caricati
-abbellisci il caricamento
-serve ancora fare distinzione tra users e filteredusers???
-trova un modo per creare diverse pagine e visualizzare usando .slice()
-aggiungi caricamento anche alle ricerche se necessario
-rilggi consegna
*/

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
      setIsLoading(true);
      while (iterate) {
        data = await Api.getUsers(pag);
        pag++;
        if (data.results.length > 0) {
          setUsers(prevUsers => [...prevUsers, ...data.results]);
          //setFilteredUsers(data.results);
        }
        if (!data.hasNextPage) {
          iterate = false;
          setIsLoading(false);
        }
      }
    }
    fillUsers();
  }, []);

  //to log and see if all the users are actually logged
  useEffect(() => {
    console.log('Users updated:', users);
  }, [users]);
  

  //function to filter the users based on the seaarch term used
  const filterUsers = useCallback((term) => {
    if (!term) {
      setFilteredUsers(users.slice(0,10));
      return;
    }
    const lowerCaseTerm = term.toLowerCase();
    const result = users.filter(user =>
      user.id.includes(lowerCaseTerm) ||
      (user.firstName && user.firstName.toLowerCase().includes(lowerCaseTerm)) ||
      (user.lastName && user.lastName.toLowerCase().includes(lowerCaseTerm))
    )
    setFilteredUsers(result);
    return;
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

  return (
    <Container className='container'>
      <Header />
      <SearchBar onSearch={filterUsers} />
        {
          isLoading ? <CircularProgress sx={{width:'100%'}} /> : (
            isMobile ?
              <MobileSearchResults users={filteredUsers} onEdit={editUser} onDelete={deleteUser} />
              :
              <SearchResults users={filteredUsers} onEdit={editUser} onDelete={deleteUser} />
          )}
        <Button onClick={handleClickOpen} color='primary' variant='contained' sx={{ mt: '2rem', mb: '100px' }}>
          Aggiungi Persona
        </Button>
      <AddUser open={openAddPage} onClose={handleClose} onAdd={addUser} />
    </Container>
  );
}

export default App;
