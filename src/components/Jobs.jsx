import React from "react";
import { Card } from '@welcome-ui/card'
import { Button } from '@welcome-ui/button'
import styled from 'styled-components'



const JobItem = styled.div`
margin: 15px 0
`;

const JobLine = styled.div`
display:flex;
flex-direction: column;

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

}
`;

const Title = styled.h2`
font-size: initial;
margin:0;

@media only screen and (min-width: 768px) {
font-size: initial;
}

`;


const Jobs = ({ jobs }) => {

    return (
        <>
            <JobItem>
                <Card lineHeight="2">
                    <Card.Body>
                        <JobLine>
                            <div>
                                <Title>JobName</Title>
                                <JobDesc>
                                    <p>contract type</p> {" - "} <p>office name</p>
                                </JobDesc>
                            </div>
                            <Button variant="tertiary">See more</Button>
                        </JobLine>
                    </Card.Body>
                </Card>
            </JobItem>

            <JobItem>
                <Card lineHeight="2">
                    <Card.Body>
                        <JobLine>
                            <div>
                                <Title>JobName</Title>
                                <JobDesc>
                                    <p>contract type</p> {" - "} <p>office name</p>
                                </JobDesc>
                            </div>
                            <Button variant="tertiary">See more</Button>
                        </JobLine>
                    </Card.Body>
                </Card>
            </JobItem>

            <JobItem>
                <Card lineHeight="2">
                    <Card.Body>
                        <JobLine>
                            <div>
                                <Title>JobName</Title>
                                <JobDesc>
                                    <p>contract type</p> {" - "} <p>office name</p>
                                </JobDesc>
                            </div>
                            <Button variant="tertiary">See more</Button>
                        </JobLine>
                    </Card.Body>
                </Card>
            </JobItem>
        </>
    )
}

export default Jobs;