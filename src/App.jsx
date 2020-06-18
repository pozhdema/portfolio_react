import React, {Component} from 'react';
import './styles/style.css';
import Nav from './components/nav';
import Gallery from './pages/gallery';
import Contacts from './pages/contacts';
import SignIn from './pages/signIn';
import SignUp from "./pages/signUp";
import Footer from "./components/footer";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/home";
import Settings from "./pages/settings";
import Helper from "./components/helper";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            roles: ""
        }
    }

    componentDidMount() {
        this.setState({isLoading: true});
        fetch('/api/user/get')
            .then(response => response.json())
            .then(response => {
                if (response["status"] === "success") {
                    this.setState({roles: response["data"]["role"], isLoading: false});
                    console.log(this.state);
                } else {
                    toast(response["message"], {
                        autoClose: 5000,
                        closeButton: true,
                        type: toast.TYPE.ERROR,
                    });
                }
            })
            .catch(error => this.setState({error, isLoading: false}));
    }

    render() {
        return (
            <Router>
                <Helper/>
                <div className="App">
                    <Nav roles={this.state.roles}/>
                    <Switch>
                        <Route path="/" exact component={HomeLoad}/>
                        <Route path="/gallery" component={Gallery}/>
                        <Route path="/contacts" component={Contacts}/>
                        <Route path="/signIn" component={SignIn}/>
                        <Route path="/signUp" component={SignUp}/>
                        {this.state.roles==="admin"?<Route path="/settings" component={Settings}/>: null}
                    </Switch>
                    <ToastContainer/>
                    <Footer/>
                </div>
            </Router>
        )
    }
}

const HomeLoad = () => (
    <Home/>
);

export default App
