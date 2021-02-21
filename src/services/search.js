import Fuse from 'fuse.js'


export const initSearchData = (data) => {
    const options = {
        useExtendedSearch: true,
        keys: ["name", "description", "profile", "contract_type.en",
            "department.name", "office.name", "published_at"]
    }

    const fuse = new Fuse(data, options)
    return fuse;
}


export const search = (fuse, search) => {
    return fuse.search(search)
}