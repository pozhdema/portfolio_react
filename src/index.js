import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import {Router} from "react-router-dom";
import {Provider} from 'react-redux';
import {I18nextProvider} from 'react-i18next';
import {languageChange} from 'i18next-redux-languagedetector';
import configureStore, {history} from './redux';
import configureI18n from './i18n';
import App from './App';


const i18nextConfig = {
    whitelist: ['en', 'uk'],
    ns: ['common'],
    defaultNS: 'common'
};

const store = configureStore({
    i18next: i18nextConfig
});

const i18n = configureI18n({
    i18nextConfig,
    redux: {
        lookupRedux: function () {
            return store.getState().i18next;
        },
        cacheUserLanguageRedux: function (language) {
            store.dispatch(languageChange(language));
        }
    }
});

ReactDOM.render(
    <React.Fragment>
        <Provider store={store}>
            <Router history={history}>
                <I18nextProvider i18n={i18n}>
                    <Suspense fallback={null}>
                        <App/>
                    </Suspense>
                </I18nextProvider>
            </Router>
        </Provider>
    </React.Fragment>,
    document.getElementById('root')
);

