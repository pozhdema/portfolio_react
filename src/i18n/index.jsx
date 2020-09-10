import i18n from "i18next";
import {reactI18nextModule} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import ReduxDetector from "i18next-redux-languagedetector";
import Backend from "i18next-chained-backend";
import Locize from 'i18next-locize-backend';
import XHR from 'i18next-xhr-backend';


const Detector = new LanguageDetector();
Detector.addDetector(ReduxDetector);

export default function configureI18n({i18nextConfig, redux}) {
    i18n
        .use(Backend)
        .use(Detector)
        .use(reactI18nextModule)
        .init({
            backend: {
                projectId: '2596e805-2ce2-4e21-9481-ee62202ababd',
                backends: [
                    Locize,
                    XHR
                ],
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
            whitelist: i18nextConfig.whitelist,
            fallbackLng: i18nextConfig.fallbackLng,
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