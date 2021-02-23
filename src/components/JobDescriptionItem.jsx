import React from "react";
import PropTypes from 'prop-types'


const JobDescriptionItem = ({ title, content, isLast }) => (
    <>
        <h3>{title}</h3>
        {content}
        { !isLast && <hr />}
    </>
)


JobDescriptionItem.propTypes = {
    content: PropTypes.node.isRequired,
    isLast: PropTypes.bool,
    title: PropTypes.string.isRequired,
}

export default JobDescriptionItem;
