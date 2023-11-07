export interface CompleteForm {
    editLock: {
        editorId: string,
        isLocked: boolean
    },
    _id: string,
    title: string,
    author: string,
    mode: string,
    editors: any,
    fields: {
        id: string,
        question: string,
        type: string,
        options: string[],
        answer: string[] | string,
        isRequired: boolean,
        _id?: string    // or here because this is used in edit form component and there new fields won't have _id
    }[],
    createdAt: string,
    updatedAt: string
};

