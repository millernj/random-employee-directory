import React, { useState, useEffect } from 'react';
import UserTable from './components/UserTable';
import Jumbotron from './components/Jumbotron';
import API from './utils/API';


const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const { data: { results } } = await API.getUsers();
    setUsers(results);
  };

  return (
    <div>
      <Jumbotron>
        <h1>Employee Directory</h1>
      </Jumbotron>
      <UserTable users={users} setUsers={setUsers} />
    </div>
  );
}

export default App;
