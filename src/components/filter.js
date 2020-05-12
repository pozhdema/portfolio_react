import React, {Component} from "react";
import "../styles/components/filter.css"

export default class Filter extends Component {

    render() {
        const {categories, onFilterChange, clicked} = this.props;
        const buttons = categories.map(({id, title}) => {
            const clazz = id === clicked ? 'btn-input active' : 'btn-input all';
            return (
                <button type="button"
                        className={`btn ${clazz}`}
                        key={id}
                        onClick={() => onFilterChange(id)}
                >
                    {title}
                </button>
            )
        });

        return (
            <div className="filter-btn">
                {buttons}
            </div>
        );
    }
}