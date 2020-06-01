import React, {Component} from "react";

class Helper extends Component {
    setData = (name, value) => {
        localStorage.setItem(name, value)
    };
    getData = (name) => {
        return localStorage.getItem(name)
    };
    componentDidMount() {
        fetch('/lang/uk.json')
            .then(response => response.json())
            .then(response => {
               this.setData("translate",JSON.stringify(response))
            })
            .catch(error => this.setState({error, isLoading: false}));
    }
    render() {
        return null
    }

}

export default Helper;