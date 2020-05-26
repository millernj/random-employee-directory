import React from 'react';

function FilterButton({ name, onchange }) {

  return (
    <input 
    name={name} 
    className="form-control" 
    id={name + "Filter"} 
    placeholder={`Search by ${name[0].toUpperCase() + name.slice(1)}`}
    onChange={onchange}
    />
  )
}

export default FilterButton;