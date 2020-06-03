import React, {Component} from "react";
import "../styles/components/filter.css"
import "../styles/components/btn.css"

export default class Filter extends Component {

    render() {
        const {categories, onFilterChange, clicked} = this.props;
        const buttons = categories.map(({id, title_en}) => {
            const clazz = id === clicked ? 'btn-input active' : 'btn-input all';
            return (
                <button type="button"
                        className={`btn ${clazz}`}
                        key={id}
                        onClick={() => onFilterChange(id)}
                >
                    {title_en}
                </button>
            )
        });
        return (
            <div className="filter">
                {buttons}
            </div>
        );
    }
}