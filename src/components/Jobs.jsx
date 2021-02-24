import React, { useState } from "react";
import PropTypes from 'prop-types';
import Highlighter from "react-highlight-words";
import { Card } from '@welcome-ui/card';
import { Button } from '@welcome-ui/button';
import styled from 'styled-components';
import JobDescription from "./JobDescription";
import { WEBSITE_REF } from "../utils/constants";


const JobItem = styled.div`
    margin: 15px 0
`;

const JobLine = styled.div`
    display:flex;
    flex-direction: column;

    .highlight {
        background: #FFE166
;
    }

    @media only screen and (min-width: 768px) {
        flex-direction: row;
        align-items:center;
        justify-content:space-between;
    }
`;

const JobDesc = styled.div`
    display:flex;
    align-items:center;
    p { 
        margin: 0 5px;
        font-size: initial;

        .highlight {
            background: #FFE166
;
        }
    }
`;

const Title = styled.h2`
    font-size: initial;
    margin:0;

    @media only screen and (min-width: 768px) {
    font-size: initial;
    }
`;


const Jobs = ({ jobs, websitesUrls, highlightWords }) => {

    const [activeJobId, setActiveJobId] = useState("")

    const showDescription = (id) => {
        setActiveJobId(id)
    }

    const handleClose = () => {
        setActiveJobId("")
    }


    const websiteUrl = websitesUrls.find((website) => {
        return website.reference === WEBSITE_REF
    })

    return (
        jobs.map(({ item }) => {
            return (
                <JobItem key={item.id} >
                    <Card lineHeight="2">
                        <Card.Body>
                            <JobLine>
                                <div>
                                    <Title>
                                        <Highlighter
                                                highlightClassName="highlight"
                                                searchWords={highlightWords}
                                                autoEscape={true}
                                                textToHighlight={item.name}
                                            />
                                    </Title>
                                    <JobDesc>
                                        <p>
                                            <Highlighter
                                                highlightClassName="highlight"
                                                searchWords={highlightWords}
                                                autoEscape={true}
                                                textToHighlight={item.contract_type.en}
                                            />
                                        </p>
                                        {" - "} 
                                         <p>
                                             <Highlighter
                                                highlightClassName="hightlight"
                                                searchWords={highlightWords}
                                                autoEscape={true}
                                                textToHighlight={item.office.name}
                                            />
                                        </p>
                                        {" - "} 
                                        <p>
                                            <Highlighter
                                                highlightClassName="highlight"
                                                searchWords={highlightWords}
                                                autoEscape={true}
                                                textToHighlight={item.department.name}
                                            />
                                        </p>
                                    </JobDesc>
                                </div>
                                <Button variant="tertiary" onClick={() => showDescription(item.id)}>See more</Button>
                            </JobLine>
                        </Card.Body>
                    </Card>
                    <JobDescription job={item} isOpen={activeJobId === item.id} onClose={handleClose} applyLink={websiteUrl.root_url} />
                </JobItem>
            )
        }
        )
    )
}

Jobs.propTypes = {
    jobs: PropTypes.array.isRequired,
    websitesUrls: PropTypes.array.isRequired,
}

export default Jobs;