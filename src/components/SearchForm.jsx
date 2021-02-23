import React from "react";
import PropTypes from 'prop-types'
import { ConnectedField } from '@welcome-ui/connected-field';
import { InputText } from '@welcome-ui/input-text';
import { Form, FormSpy } from 'react-final-form';
import { Select } from '@welcome-ui/select';
// import { DatePicker } from '@welcome-ui/date-picker';
import styled from 'styled-components';


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


const SearchForm = ({ contractOptions, groupOptions, onSubmit, onChange }) => {
    return (
        <Form initialValues={{}} onSubmit={onSubmit}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
                <form onSubmit={handleSubmit}>
                    <FormSpy onChange={onChange} subscription={{ values: true }} />

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
                                options={contractOptions}
                                name="contract"
                                placeholder="Contract Type"
                            />
                        </ItemForm>

                        {/* <ItemForm>
                            <ConnectedField component={DatePicker} name="date" />
                        </ItemForm> */}
                        <ItemForm last>
                            <ConnectedField
                                component={Select}
                                options={groupOptions}
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


SearchForm.propTypes = {
    contractOptions: PropTypes.array.isRequired,
    groupOptions: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
}


export default SearchForm;