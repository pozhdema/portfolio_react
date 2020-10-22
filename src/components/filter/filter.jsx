import React from "react";
import "./filter.css"
import {withNamespaces} from "react-i18next";

const Filter = React.memo(props => {
    const {categories, onFilterChange, clicked} = props;
    const buttons = categories.map(({id, title}) => {
        const clazz = id === clicked ? 'btn-input active' : 'btn-input all';
        return (
            <button
                className={`btn ${clazz}`}
                key={id}
                onClick={() => onFilterChange(id)}
            >
                {title}
            </button>
        )
    });
    return (
        <div className="filter">
            {buttons}
        </div>
    );
})

export default withNamespaces('common')(Filter);