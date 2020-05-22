import React, { useState, useRef } from 'react';
import { Container, Row } from '../Grid';
import Loading from '../Loading';
import ColButton from '../ColButton';
import './style.css';



function getUserValue(user, query) {
  switch(query) {
    case 'name':
      const { name: { first, last } } = user;
      return `${first} ${last}`
    case 'contact':
      const { email, phone } = user;
      return `${email} ${phone}`
    case 'location':
      const { city, country } = user.location;
      return `${city} ${country}`
    default:
      return user[query];
  }
}

function UserTable({ users, setUsers }) {

  const [sort, setSort] = useState({})

  function sortUsers(query, ascending) {
    const source = users.concat();
    const direction = ascending ? 1 : -1;
    source.sort((currentUser, nextUser) => {
      const result = getUserValue(currentUser, query) > getUserValue(nextUser, query) ? direction * 1 : direction * -1
      return result
    });
    setUsers(source);
  }

  const handleSortToggle = (id, event) => {
    sortUsers(id, !sort[id]);
    setSort({ [id]: !sort[id] });
  }

  return (
    <Container>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col"></th>
              <th scope="col">
                <ColButton name={'name'} sorting={{ focus: 'name' in sort, sort: sort.name }} onclick={handleSortToggle}>
                  Name
                </ColButton>
              </th>
              <th scope="col">
                <ColButton name={'contact'} sorting={{ focus: 'contact' in sort, sort: sort.contact }} onclick={handleSortToggle}>
                  Contact
                </ColButton>
              </th>
              <th scope="col">
                <ColButton name={'location'} sorting={{ focus: 'location' in sort, sort: sort.location }} onclick={handleSortToggle}>
                  Location
                </ColButton>
              </th>
            </tr>
          </thead>

          {
            users === undefined || users.length === 0 ?
              (
                <tbody>
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      <Loading />
                    </td>
                  </tr>
                </tbody>
              )
              :
              <tbody>
                {users.map(user => <User key={user.email} user={user} />)}
              </tbody>
          }
        </table>
      </div>

    </Container>
  )
}

function User({ user }) {
  const {
    name,
    picture,
    email,
    phone,
    location: { country, city }
  } = user;

  const nameString = `${name.title + ' ' || ''}${name.first} ${name.last}`;

  return (
    <tr>
      <th scope="row"><img src={picture.large} alt={`${nameString}`}></img></th>
      <td>{nameString}</td>
      <td>
        Email: {email}
        <br />
        Phone: {phone}
      </td>
      <td>{city}, {country}</td>
    </tr>
  )
};

export default UserTable;