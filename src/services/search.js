import Fuse from 'fuse.js'
import { buildOption, uniqueArray } from '../utils/utils';


export const initSearchData = (data) => {
    const options = {
        useExtendedSearch: true,
        keys: ["name", "description", "profile", "contract_type.en",
            "department.name", "office.name"/*, "published_at"*/]
    }

    const fuse = new Fuse(data, options)
    return fuse;
}


export const search = (fuse, search) => {
    return fuse.search(search)
}


export const computeSearchTerms = (values) => {
    const jobname = values.jobname || "";
    const contract = values.contract || "";
    // const date = values.date ? `^${values.date.toISOString()}$` : "";
    const groupby = values.groupby || "";

    return `${jobname}|${contract}|${groupby}`
}

export const computeContracts = (jobs) => {
    const contracts =
        uniqueArray(jobs.map((job) => job.contract_type.en))
            .map((contract => (buildOption(contract, contract))))

    return contracts
}


export const computeGroups = (jobs) => {
    const offices = uniqueArray(jobs
        .map((job) => job.office.name))
        .map((office => (buildOption(office, office))))

    const departments =
        uniqueArray(jobs.map((job) => job.department.name))
            .map((department => (buildOption(department, department))))

    return departments.concat(offices)
}
