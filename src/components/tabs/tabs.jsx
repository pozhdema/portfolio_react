import React, {Component} from "react";
import './tabs.css'


class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 0
        }
    }

    select = (i) => {
        let _this = this;
        return function() {
            _this.setState({
                active: i
            });
        }
    }

    renderTabs = () => {
        return React.Children.map(this.props.children, (item, i) => {
            if (i%2 === 0) {
                let active = this.state.active === i ? 'active-tab' : '';
                return <button onClick={this.select(i)} className={`${active} tab`}>{item}</button>;
            }
        });
    }

    renderContent() {
        return React.Children.map(this.props.children, (item, i) => {
            if (i-1 === this.state.active) {
                return <div className='content-tab'>{item}</div>;
            } else {
                return;
            }
        });
    }

    render() {
        return (
            <div className="tabs">
                {this.renderTabs()}
                {this.renderContent()}
            </div>
        );
    }
}


export default Tabs;