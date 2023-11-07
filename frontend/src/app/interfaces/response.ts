export interface Response {
    createdAt: string,
    fields: {
        type: string,
        id: string,
        options: string[],
        answer: any,
        _id: string
    }[],
    submittedBy: string,
    submittedToWhichForm: {
        _id: string,
        title: string
    },
    _id: string
};