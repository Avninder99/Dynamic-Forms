export interface BasicForm {
    editLock: {
        editorId: string,
        isLocked: boolean
    },
    _id: string,
    title: string,
    author: string,
    mode: string,
    fields: {
        id: string,
        question: string,
        type: string,
        options: string[],
        answer: string[] | string,
        isRequired: boolean,
        _id?: string
    }[],
    createdAt: string,
    updatedAt: string,
};