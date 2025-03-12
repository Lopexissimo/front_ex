import { Button, Container } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import UserInfo from './components/UserInfo.js'
import { useState, useEffect, useCallback, use } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Api from './util/Api';

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([])
  const [displayAddUser, setDisplayAddUser] = useState(false);
  const [displayUserInfo, setDisplayUserInfo] = useState(false);
  const [openAddPage, setOpenAddPage] = useState(false)
  //fuction to open the addPage
  const handleClickOpen = () => {
    setOpenAddPage(true)
  }
  //function to close the add page
  const handleClose = () => {
    setOpenAddPage(false);
  }
  //effect used to get the users from the API
  useEffect(() => {
    const fillUsers = async () => {
      console.log('Loading data');
      const data = await Api.getUsers();
      console.log(data)
      if (data.length > 0) {
        console.log('dati ricevuti: ', data)
        setUsers(data);
        setFilteredUsers(data);
      }
    }
    fillUsers();
  }, []);

  //function to filter the users based on the seaarch term used
  const filterUsers = useCallback((term) => {
    if (!term) {
      setFilteredUsers(users);
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
  }, [users, setUsers]);

  //function to edit the user and update the modified user
  const editUser = useCallback(async (id, editedUser) => {
    await Api.editUser(id, editedUser);
    const updatedUsers = users.map(user => user.id === id ? editedUser : user)
    setUsers(updatedUsers);
  }, [users, Api])

  //function to delete user
  const deleteUser = useCallback(async (id) =>{
    await Api.deleteUser(id);
    const updateUsers = users.filter(user => user.id != id)
    setUsers(updateUsers);
  })

  return (
    <Container className='container'>
      <Header />
      <SearchBar onSearch={filterUsers} />
      <SearchResults users={filteredUsers} onEdit={editUser} onDelete={deleteUser} />
      <Button onClick={handleClickOpen}>Aggiungi Utente</Button>
      {
        displayUserInfo && <UserInfo />
      }
    </Container>
  );
}

export default App;
