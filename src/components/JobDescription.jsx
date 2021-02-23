import React from "react";
import PropTypes from 'prop-types'
import parse from 'html-react-parser';
import Modal from "./Modal";
import JobDescriptionItem from "./JobDescriptionItem";




const JobDescription = ({ job, isOpen, onClose, applyLink }) => {

    const handleJobApply = () => {
        window.location.href = applyLink;
    }
    return (
        <Modal title="Job Description" btnFooterTitle="Apply" isOpen={isOpen} onClose={onClose} onCtaClick={handleJobApply}>
            <JobDescriptionItem title="Description" content={parse(job.description)} />
            <JobDescriptionItem title="Profile" content={parse(job.profile)} />
            <JobDescriptionItem title="Recruitment process" content={parse(job.recruitment_process)} isLast />
        </Modal>
    )


}

JobDescription.propTypes = {
    job: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    applyLink: PropTypes.string,
}


export default JobDescription;