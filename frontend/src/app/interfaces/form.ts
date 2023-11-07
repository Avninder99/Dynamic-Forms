// this is used in show response component as form data sent by backend server is quite less/minimal
export interface Form {
    _id: string,
    title: string,
    fields: {
        _id: string,
        question: string,
        isRequired: boolean,
        type: string,
        id: string
    }[]
}
