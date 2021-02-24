import React from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Title = styled.h3`
    text-decoration: underline;
    text-decoration-color: #E5B800;
    letter-spacing: .2rem;
    padding: .5rem;
`;


const Content = styled.div`
    a { 
        text-decoration-color: #E5E5E5; 
        color: #737373;
        
        &:hover {
            color: #E5B800;
            text-decoration-color: #E5B800; 
        }
    }
`;

const JobDescriptionItem = ({ title, content, isLast }) => (
    <>
        <Title>{title}</Title>
        <Content>
            {content}
        </Content>
        { !isLast && <hr />}
    </>
)


JobDescriptionItem.propTypes = {
    content: PropTypes.node.isRequired,
    isLast: PropTypes.bool,
    title: PropTypes.string.isRequired,
}

export default JobDescriptionItem;
