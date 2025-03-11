import { Container } from '@mui/material';
import Header from './components/Header'
import Footer from './components/Footer'
import addUser from './components/AddUser'
import { useState,useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Api from './util/Api'

function App() {
  const [users, setUsers] =useState();

  useEffect(() => {
    setUsers(Api.getUsers);
  },[users])

  return (
    <Container className='container'>
      <Header/>
      <SearchBar/>
      <SearchResults users={users}/>
      <Footer/>
    </Container>
  );
}

export default App;
