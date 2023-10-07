export default interface SingleFormElement {
    question: String,
    answer?: string | string[],
    type: string,
    id: string,
    options: string | string[] | null,
    required: boolean
}