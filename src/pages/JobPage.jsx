import React from "react";
import SearchForm from '../components/SearchForm';
import Jobs from '../components/Jobs';
import styled from 'styled-components'
import { Box } from '@welcome-ui/box'

const Title = styled.h1`
text-align: center;
margin: 20px;

`;

const Section = styled.section`
margin: 20px 0;

@media only screen and (min-width: 768px) {
    margin: 40px 0;

}
`;

const JobPage = () => {

    return (
        <Box
            fontSize={{ xs: 'h5', lg: 'h4' }}
            backgroundColor={'light.800'}
            padding={{ xs: "10px", lg: "20px" }}>
            <Title>Our offers</Title>
            <Section>
                <SearchForm />
            </Section>
            <Section>
                <Jobs />
            </Section>
        </Box >
    )
}

export default JobPage;