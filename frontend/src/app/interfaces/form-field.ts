// This is for form fields in show form component (show form fields) and edit component
// this is sub part of basic & complete form interface
export interface FormField {
    id: string,
    question: string,
    type: string,
    options: string[],
    answer: string[] | string,
    isRequired: boolean,
    _id?: string
};