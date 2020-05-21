import React from "react";
import '../styles/components/input.css';


const Input = props => {
    return (
        <input
            className="admin-input"
            id={props.name}
            name={props.name}
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            required
            onChange={props.handleChange}
        />
    );
};
export default Input;