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
import counterpart from "counterpart";
import en from "./lang/en";
import uk from "./lang/uk";
import Cookies from 'universal-cookie';
import CookieConsent from "react-cookie-consent";
import SimpleReactLightbox from "simple-react-lightbox";


counterpart.registerTranslations('en', en);
counterpart.registerTranslations('uk', uk);

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            roles: "",
            lang: ''
        }

    }

    handleChange = (e) => {
        const cookies = new Cookies();

        cookies.set('lang', e.target.value, { path: '/', maxAge:90*24*3600  });

        this.setState({lang: e.target.value});
        this.refreshPage()
        counterpart.setLocale("uk");
    };

    refreshPage() {
        window.location.reload(false);
    }

    componentDidMount() {
        const cookies = new Cookies();

        let language = cookies.get('lang');

        if (language !== undefined){
            counterpart.setLocale(language);

        }else{
            counterpart.setLocale("uk");
            cookies.set('lang', "uk", { path: '/', maxAge:90*24*3600  });
        }

        this.setState({
            isLoading: true,
            lang: language
        });
        fetch('/api/user/get')
            .then(response => response.json())
            .then(response => {
                if (response["status"] === "success") {
                    this.setState({roles: response["data"]["role"], isLoading: false});
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
            <SimpleReactLightbox>
            <Router>
                <div className="App">
                    <CookieConsent
                        location="bottom"
                        cookieName="myAwesomeCookieName3"
                        expires={999}
                        overlay
                    >
                        This website uses cookies to enhance the user experience.
                    </CookieConsent>
                    <Nav roles={this.state.roles} lang={this.state.lang} handleChange={this.handleChange}/>
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
            </SimpleReactLightbox>
        )
    }
}

const HomeLoad = () => (
    <Home/>
);

export default App
