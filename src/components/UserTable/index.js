import React, { useState, useEffect } from 'react';
import { debounce, omit } from 'lodash';

import { Container } from '../Grid';
import Loading from '../Loading';
import SortButton from '../SortButton';
import './style.css';
import FilterButton from '../FilterButton';



function getUserValue(user, query) {
  switch(query) {
    case 'name':
      const { name: { title, first, last } } = user;
      return `${first} ${last} ${title}`
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

function UserTable({ users: inputUsers }) {

  const [users, setUsers] = useState([]);
  const [debounced, setDebounced] = useState();
  const [sort, setSort] = useState({
    query: null,
    ascending: null
  });
  const [filters, setFilters] = useState({});

  useEffect(() => {
    setUsers(inputUsers);
  }, [inputUsers]);

  useEffect(() => {
    debounced && debounced();
  }, [debounced])

  useEffect(filterUsers, [filters]);
  useEffect(sortUsers, [sort]);

  function sortUsers() {
    
    let {query, ascending} = sort;
    const source = users.concat();
    const direction = ascending ? 1 : -1;
    source.sort((currentUser, nextUser) => {
      const result = getUserValue(currentUser, query) > getUserValue(nextUser, query) ? direction * 1 : direction * -1
      return result
    });

    setUsers(source);
  }

  function filterUsers() {
    if (Object.keys(filters).length !== 0) {
      const filtered = inputUsers.filter((user) => {
        const conditions = Object.entries(filters).map(([ key, value ]) => {
          const tester = new RegExp(`${value}`, 'i');
          return tester.test(getUserValue(user, key))
        }
  
        );
        return conditions.every(a => a);
      });
      setUsers(filtered);
    } else {
      setUsers(inputUsers);
    }
  }

  const handleFilterChange = (event) => {
    // don't nullify event object
    event.persist();
    if ( !debounced ) {
      let debouncedFunction = debounce(() => {
        const { name, value } = event.target;
        if (value) {
          setFilters({ ...filters, [name]: value});
        } else {
          setFilters(omit(filters, name));
        }
      }, 300);
      setDebounced(debouncedFunction);
    }
  }

  const handleSortToggle = (id, event) => {
    setSort({ query: id, ascending: !sort.ascending});
  }

  return (
    <Container>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col"></th>
              <th scope="col">
                <SortButton name={'name'} sorting={{ focus: 'name' === sort.query, sort: sort.ascending }} onclick={handleSortToggle}>
                  Name
                </SortButton>
                <FilterButton name={'name'} onchange={handleFilterChange}/>
              </th>
              <th scope="col">
                <SortButton name={'contact'} sorting={{ focus: 'contact' === sort.query, sort: sort.ascending }} onclick={handleSortToggle}>
                  Contact
                </SortButton>
                <FilterButton name={'contact'} onchange={handleFilterChange}/>
              </th>
              <th scope="col">
                <SortButton name={'location'} sorting={{ focus: 'location' === sort.query, sort: sort.ascending }} onclick={handleSortToggle}>
                  Location
                </SortButton>
                <FilterButton name={'location'} onchange={handleFilterChange}/>
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
                {users.map(user => <User key={Math.random()} user={user} />)}
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