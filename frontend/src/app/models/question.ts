export default interface SingleFormElement {
    question: string,
    answer?: string | string[],
    type: string,
    id: string,
    options: string | string[] | null,
    required: boolean
}