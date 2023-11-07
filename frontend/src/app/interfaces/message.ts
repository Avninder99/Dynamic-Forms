export interface Message {
    message: string, 
    createdAt: string, 
    sender: { 
        _id: string, 
        fullname: string 
    }
}