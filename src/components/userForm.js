import React from "react";

class UserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"",
            password: ""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleOnChange=event=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    };
    handleInputChange(event) {
        const target = event.target;
        const value = target.name === 'remember' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="admin" action="#" method="POST">
                <input
                    type="text"
                    name="email"
                    value={this.state.value}
                    onChange={this.handleOnChange}
                    placeholder="Your email"
                    className="admin-input"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={this.state.value}
                    onChange={this.handleOnChange}
                    placeholder="Your password"
                    className="admin-input"
                    required
                />
                <div className="remember">
                    <label htmlFor="remember-check" className="admin-checkbox">Remember me?
                        <input
                            id="remember-check"
                            name="remember"
                            type="checkbox"
                            checked={this.state.remember}
                            onChange={this.handleInputChange}
                        />
                    </label>
                    <input
                        type="submit"
                        value="ОK"
                        className="admin-submit"
                    />
                </div>
            </form>

        );
    };
}

export default UserForm