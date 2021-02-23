import React, { useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import { Box } from '@welcome-ui/box';
import { Loader } from '@welcome-ui/loader'
import SearchForm from '../components/SearchForm';
import Jobs from '../components/Jobs';
import { computeContracts, computeGroups, computeSearchTerms, initSearchData, search } from "../services/search";
import { API_URL, DEFAULT_OPTIONS } from "../utils/constants";


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

const LoaderWrapper = styled.div`
    display:flex;
    justify-content: center;
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
   
`;

const JobPage = () => {
    const [allJobs, setAllJobs] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [contractOptions, setContractOptions] = useState([]);
    const [groupOptions, setGroupOptions] = useState([]);
    const [websitesUrls, setWebsitesUrls] = useState([]);

    const searchConnector = useRef();


    useEffect(() => {
        fetch(API_URL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                setAllJobs(data.jobs)
                searchConnector.current = initSearchData(data.jobs);
                setWebsitesUrls(data.websites);
            });
    }, [])


    useEffect(() => {
        const contracts = computeContracts(allJobs);
        const groups = computeGroups(allJobs);

        setContractOptions(contracts);
        setGroupOptions(groups);

        getDefaultSearchResults(allJobs);

    }, [allJobs])

    const getDefaultSearchResults = (allJobs) => {
        //init with all jobs
        const results = allJobs.map((job) => ({ item: { ...job } }));
        setSearchResults(results);
    }

    const handleSubmit = async values => {
        //search
        const searchTerms = computeSearchTerms(values);
        handleSearch(searchTerms);
    }

    const handleChange = async values => {
        if (searchConnector.current) {
            //search
            const searchTerms = computeSearchTerms(values.values);
            handleSearch(searchTerms);
        }
    }

    const handleSearch = (searchTerms) => {
        const results = search(searchConnector.current, searchTerms);
        setSearchResults(results);

        if (results.length === 0) {
            getDefaultSearchResults(allJobs);
        }
    }


    return (
        <Box
            fontSize={{ xs: 'h5', lg: 'h4' }}
            backgroundColor={'light.800'}
            padding={{ xs: "10px", lg: "20px" }}>
            <Title>Our offers</Title>
            <Section>
                <SearchForm
                    contractOptions={DEFAULT_OPTIONS.concat(contractOptions)}
                    groupOptions={DEFAULT_OPTIONS.concat(groupOptions)}
                    onSubmit={handleSubmit}
                    onChange={handleChange}
                />
            </Section>
            {searchResults.length === 0 ?
                <LoaderWrapper>
                    <Loader size={50} />
                </LoaderWrapper>
                :
                <Section>
                    <p>{searchResults.length} results found</p>
                    <Jobs jobs={searchResults} websitesUrls={websitesUrls} />
                </Section>
            }
        </Box >
    )
}

export default JobPage;