import React from 'react';


const MySelect = ({defaultValue, options, value, onChange}) => {
    return (
        <select
        value = {value}
        onChange = {event => onChange(event.target.value)}>
          <option disabled>{defaultValue}</option>
          {options.map((option) => <option key = {option.value} value = {option.value}>{option.name}</option>)}
        </select>
    );
};

export default MySelect;