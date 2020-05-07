import React from "react";
import '../styles/components/btn.css';

const Button = props => {
    return(
        <button
            className="admin-submit"
            onSubmit={props.action}
            disabled={props.value}
        >
            {props.title}
        </button>
    );
};
export default Button;