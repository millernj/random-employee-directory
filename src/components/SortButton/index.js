import React from 'react';
import './style.css'

const SortButton = ({ onclick, name, sorting: { focus, sort }, children }) =>
  <button id={name} type="button" className="btn btn-dark" onClick={e => onclick(name, e)}>
    {
      focus ?
        <i className={`fa fa-sort-${sort ? 'up' : 'down'}`} /> :
        <i className="fa fa-circle icon-sm" />
    }
    {children}
  </button>

export default SortButton;