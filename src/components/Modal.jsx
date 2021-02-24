import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button } from '@welcome-ui/button';
import FocusTrap from 'focus-trap-react';


const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background-color: rgba(0,0,0,0.5);
    z-index: 1;
`;


const ModalWraper = styled.div`
    width:100%;
    height:100%;
    position: fixed;
    top: 50%; 
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 5px;
    z-index: 2;
    padding: 5px 15px;

    @media only screen and (min-width: 768px) {
        width:50%;
        height: 90vh;
    }
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #969696;

    button {
        background: none;
        border: none;
        align-self: start;
        font-size: 1.5rem;
        color: #969696;
        cursor: pointer;
    }
    
    h2 {
        padding-left: 15px;
    }
`;


const ModalBody = styled.div`
    overflow-y:scroll;
    height:75vh;
    padding: 25px 5px;

    @media only screen and (min-width: 768px) {
        width:100%;
        height:65vh;
    }

    

`;

const ModalFooter = styled.div`
    display:flex;
    justify-content:center;
    position absolute;
    bottom:0;
    left:0;
    width:100%;
    padding:10px;
    background:#fff;  

    @media only screen and (min-width: 768px) {
        padding:20px;
    }

`;


const Modal = ({ children, title, btnFooterTitle, isOpen, onClose, onCtaClick }) => {

    const enableScroll = () => {
        // enable scroll
        const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
        document.body.style.overflow = null;
        document.body.style.position = 'initial';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    const saveScrollY = () => {
        document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
    }

    const handleClose = () => {
        enableScroll();
        onClose();
    }

    const handleCtaClick = () => {
        onCtaClick();
        handleClose();
    }

     const onClickOutside = (event) => {
         if (event.target.matches("#overlay")) {
            handleClose();
            event.preventDefault();
        }
    }

    useEffect(() => {
        document.addEventListener('scroll', saveScrollY);
        document.addEventListener("click", onClickOutside);

        return () => {
            handleClose();
            document.removeEventListener('scroll', saveScrollY);
            document.removeEventListener('click', onClickOutside);

        };
    }, [])

    useEffect(() => {
        if (isOpen) {
            // disable scroll
            const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');

            document.body.style.overflow = "hidden";
            document.querySelector("html").scrollTop = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.top = `-${scrollY}`;
        }

    }, [isOpen])

    return (
        isOpen &&
        <FocusTrap>
            <div>
                <Overlay id="overlay" />
                <ModalWraper>
                    <ModalHeader>
                        <h2>{title}</h2>
                        <button type="button" onClick={handleClose}>X</button>
                    </ModalHeader>
                    <ModalBody>
                        {children}
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="tertiary" onClick={handleCtaClick} w={100}>{btnFooterTitle}</Button>
                    </ModalFooter>
                </ModalWraper>
            </div>
        </FocusTrap>
    )
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onCtaClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    btnFooterTitle: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}

export default Modal;