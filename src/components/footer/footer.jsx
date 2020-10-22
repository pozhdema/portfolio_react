import React from 'react'
import FontAwesome from 'react-fontawesome'
import {withNamespaces} from 'react-i18next';
import './footer.css'

const Footer = React.memo(props => {
    const {t} = props;
    return (
        <footer>
            <ul className="navigations">
                <li>
                    <a href="https://www.facebook.com/profile.php?id=100005189898824" className='nav-footer' aria-label="Facebook" rel="nofollow noopener">
                        <FontAwesome name="facebook" className="fa-facebook-f"/>
                    </a>
                </li>
                <li>
                    <a href="https://www.instagram.com/pozhdema/?hl=uk" className='nav-footer' aria-label="Instagram" rel="nofollow noopener">
                        <FontAwesome name="instagram" className="fa-instagram"/>
                    </a>
                </li>
                <li>
                    <a href="https://ua.depositphotos.com/portfolio-18145294.html" className='nav-footer' aria-label="Depositphotos" rel="nofollow noopener">
                        <FontAwesome name="camera" className="fa-camera"/>
                    </a>
                </li>
                <li>
                    <a href="mailto:pozhdema107@gmail.com" className='nav-footer' aria-label="GMAIL" rel="nofollow noopener">
                        <FontAwesome name="gmail" className="fa-envelope"/>
                    </a>
                </li>
            </ul>
            <p className='copyright'> &copy; {new Date().getFullYear()} {t('footer')}</p>
        </footer>
    )
});

export default withNamespaces('common')(Footer);