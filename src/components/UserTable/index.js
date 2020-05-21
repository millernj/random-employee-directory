import React, { useState, useRef } from 'react';
import { Container, Row } from '../Grid';
import Loading from '../Loading';

function UserTable({ users, setUsers }) {

  return (
    <Container>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col" style={{ width: '152px' }}></th>
              <th scope="col">Name</th>
              <th scope="col">Contact</th>
              <th scope="col">Country</th>
              <th scope="col">City</th>
            </tr>
          </thead>

          {
            users === undefined || users.length === 0 ?
              (
                <tbody>
                  <td colspan="6" style={{ textAlign: "center" }}>
                    <Loading />
                  </td>
                </tbody>
              )
              :
              <tbody>
                {users.map(user => <User user={user} />)}
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
  return (
    <tr>
      <th scope="row"><img src={picture.large}></img></th>
      <td>{`${name.title + ' ' || ''}${name.first} ${name.last}`}</td>
      <td>
        Email: {email}
        <br/>
        Phone: {phone}
      </td>
      <td>{country}</td>
      <td>{city}</td>
    </tr>
  )
};

export default UserTable;