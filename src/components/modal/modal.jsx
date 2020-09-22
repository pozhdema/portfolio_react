import FontAwesome from "react-fontawesome";
import React from "react";
import ReactDOM from 'react-dom';
import './modal.css'

const Modal = ({show, hide, children}) => show ? ReactDOM.createPortal(
    <React.Fragment>
        <div className='modal'  onClick={(event) => {
            if (event.target.classList.contains("modal")) {
                hide()
            }
        }}>
            <button onClick={hide} className='modal-btn-close'>
                <FontAwesome
                    className="fas fa-times"
                    name="close"
                    size="3x"
                    style={{color: '#be94a0'}}
                />
            </button>
            <section className='modal-main'>
                {children}
            </section>
        </div>
    </React.Fragment>, document.body
) : null;

export default Modal;