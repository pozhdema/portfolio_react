import React from 'react';
import {connect} from 'react-redux';
import {NamespacesConsumer} from 'react-i18next';
import './LanguageSwitcher.css'
import FontAwesome from 'react-fontawesome'

const LanguageSwitcher = React.memo(props => {
    const {t} = props;
    const onChange = (lng, i18n) => {
        i18n.changeLanguage(lng);
    };

    return (
        <NamespacesConsumer ns={['common']} wait={true}>
            {(t, {i18n}) => (
                <>
                    <FontAwesome id='lang' name="language" className="fa-language"/>
                    <select
                        className="LanguageSwitcher"
                        defaultValue={props.lng}
                        onChange={e => onChange(e.target.value, i18n)}
                    >
                        <option></option>
                        <option value="uk">UK</option>
                        <option value="en-US">EN</option>
                    </select>
                </>
            )}
        </NamespacesConsumer>
    );
});

const mapStateToProps = state => {
    return {
        lang: state.i18next
    };
};

export default connect(mapStateToProps)(LanguageSwitcher);