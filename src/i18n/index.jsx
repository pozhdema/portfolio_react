import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import ReduxDetector from "i18next-redux-languagedetector";
import XHR from 'i18next-xhr-backend';

const Detector = new LanguageDetector();
Detector.addDetector(ReduxDetector);

const getCookie = (name) => {
    let cookie = {};
    document.cookie.split(';').forEach(function (el) {
        let [k, v] = el.split('=');
        cookie[k.trim()] = v;
    })
    return cookie[name];
}

const getLanguage = () => {
    let lngCode = getCookie('lang')
    if (typeof lngCode === 'undefined') {
        lngCode = 'uk'
    }
    return lngCode
}

export default function configureI18n({i18nextConfig, redux}) {
    i18n
        .use(XHR)
        .use(Detector)
        .init({
            backend: {
                backendOptions: [{
                    loadPath: '/locales/{{lng}}/common.json'
                }]
            },
            detection: {
                order: ['navigator'],
                lookupRedux: redux.lookupRedux,
                cacheUserLanguageRedux: redux.cacheUserLanguageRedux,
                caches: ['redux'],
                excludeCacheFor: ['cimode']
            },
            lng: getLanguage(),
            whitelist: i18nextConfig.whitelist,
            fallbackLng: 'en-US',
            ns: i18nextConfig.ns,
            defaultNS: i18nextConfig.defaultNS,
            debug: false,
            interpolation: {
                escapeValue: false
            },
            react: {
                wait: true
            },
            nonExplicitWhitelist: true,
            load: 'currentOnly'
        });
    return i18n;
}