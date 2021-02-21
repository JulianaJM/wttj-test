import React, { useEffect, useRef, useState } from "react";
import { format, compareAsc } from 'date-fns';
import styled from 'styled-components';
import { Box } from '@welcome-ui/box';
import SearchForm from '../components/SearchForm';
import Jobs from '../components/Jobs';
import { buildOption, uniqueArray } from "../utils/utils";
import { initSearchData, search } from "../services/search";


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

const API_URL = process.env.REACT_APP_API_URL;

const JobPage = () => {

    const [allData, setAllData] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [contractOptions, setContractOptions] = useState([])
    const [dateOptions, setDateOptions] = useState([])
    const [groupOptions, setGroupOptions] = useState([])
    const searchConnector = useRef();
    const defaultOptions = [{ label: "", value: "" }]

    useEffect(() => {
        fetch(API_URL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                setAllData(data.jobs)
                searchConnector.current = initSearchData(data.jobs)
            });
    }, [])


    useEffect(() => {
        const contracts =
            uniqueArray(allData.map((job) => job.contract_type.en))
                .map((contract => (buildOption(contract, contract))))

        const unformattedDates = allData.map((job) => {
            const key = format(new Date(job.published_at), "yyyy/MM/dd");
            const value = job.published_at
            return { key, value }
        })

        const sortedDates = unformattedDates.map((date) => new Date(date.value))
            .sort(compareAsc)

        const dates =
            uniqueArray(sortedDates.map((date) => format(date, "yyyy/MM/dd")))
                .map((formattedDate, i) => {
                    const unformatteddate = unformattedDates.find(date => date.key === formattedDate)
                    return buildOption(formattedDate, unformatteddate.value)
                })

        const offices = uniqueArray(allData
            .map((job) => job.office.name))
            .map((office => (buildOption(office, office))))


        const departments =
            uniqueArray(allData.map((job) => job.department.name))
                .map((department => (buildOption(department, department))))

        const groups = departments.concat(offices)

        setContractOptions(contracts)
        setDateOptions(dates)
        setGroupOptions(groups)

    }, [allData])


    const handleSubmit = async values => {
        if (searchConnector.current) {
            const jobname = values.jobname || values.values.jobname || "";
            const contract = values.contract || values.values.contract || "";
            const date = values.date || values.values.date || "";
            const groupby = values.groupby || values.values.groupby || "";

            //search
            const searchTerms = `${jobname} | ${contract} | ${date} | ${groupby}`
            const results = search(searchConnector.current, searchTerms)
            setSearchResults(results);
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
                    contractOptions={defaultOptions.concat(contractOptions)}
                    dateOptions={defaultOptions.concat(dateOptions)}
                    groupOptions={defaultOptions.concat(groupOptions)}
                    onSubmit={handleSubmit}
                />
            </Section>
            <Section>
                <Jobs jobs={searchResults} />
            </Section>
        </Box >
    )
}

export default JobPage;