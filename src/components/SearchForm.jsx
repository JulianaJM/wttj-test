import React, { useEffect, useState } from "react"
import { ConnectedField } from '@welcome-ui/connected-field'
import { InputText } from '@welcome-ui/input-text'
import { Form } from 'react-final-form'
import { Select } from '@welcome-ui/select'
import { format, compareAsc } from 'date-fns'
import styled from 'styled-components'


const Wrapper = styled.div`
display:flex;
flex-direction: column;

@media only screen and (min-width: 768px) {
    flex-direction: row;
}
`;

const ItemForm = styled.div`
width:100%;
margin-bottom:10px;

@media only screen and (min-width: 768px) {
    margin-right:${props => props.last ? "0px" : "10px"};
    margin-bottom:0;
}
`;


const SearchForm = () => {

    const [jobs, setJobs] = useState([])
    const [contracts, setContracts] = useState([])
    const [dates, setDates] = useState([])
    const [groups, setGroups] = useState([])

    const API_URL = process.env.REACT_APP_API_URL;


    const onSubmit = async values => {
        window.alert(JSON.stringify(values, 0, 2))
    }


    useEffect(() => {
        fetch(API_URL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                setJobs(data.jobs)

            });
    }, [])


    useEffect(() => {
        const contracts = [...new Set(jobs
            .map((job) => job.contract_type.en))]
            .map((contract => ({ label: contract, value: contract })))

        const dates = jobs
            .map((job) => {
                const publishedAt = new Date(job.published_at);
                return publishedAt;

            })
            .sort(compareAsc)
        const uniqueDates = [...new Set(dates.map((date) => format(date, "yyyy/MM/dd")))]
            .map((publishedAt => ({
                label: publishedAt
                , value: publishedAt
            })))

        const offices = [...new Set(jobs
            .map((job) => job.office.name))]
            .map((office => ({ label: office, value: office })))


        const departments = [...new Set(jobs
            .map((job) => job.department.name))]
            .map((department => ({ label: department, value: department })))

        const groups = departments.concat(offices)





        setContracts(contracts)
        setDates(uniqueDates)
        setGroups(groups)



    }, [jobs])

    return (
        <Form initialValues={{}} onSubmit={onSubmit}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
                <form onSubmit={handleSubmit}>
                    <Wrapper>
                        <ItemForm>
                            <ConnectedField
                                name="jobname"
                                placeholder="Your dream job ?"
                                component={InputText}
                            />
                        </ItemForm>

                        <ItemForm>

                            <ConnectedField
                                component={Select}
                                options={contracts}
                                name="contract"
                                placeholder="Contract Type"
                            />
                        </ItemForm>

                        <ItemForm>

                            <ConnectedField
                                component={Select}
                                options={dates}
                                name="date"
                                placeholder="Date"
                            />
                        </ItemForm>
                        <ItemForm last>
                            <ConnectedField
                                component={Select}
                                options={groups}
                                name="groupby"
                                placeholder="Group By"
                            />
                        </ItemForm>
                    </Wrapper>
                </form>
            )}
        />
    )
}

export default SearchForm;