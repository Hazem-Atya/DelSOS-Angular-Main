export class ShopperRegister {
    name: string;
    age: number;
    phoneNumber: number;
    email:string;
    password: string;
    owner: string;
    cardNumber: string;
    expirationDate: string;
}


export interface Shopper {
    bankDetails: {
        owner: String,
        cardNumber: String,
        expirationDate: String
    },
    id: String,
    name: String,
    email: String,
    username: String,
    age: Number,
    phoneNumber:String,
    range: Number,
    address: String,
    status: String,
    createdAt: String,
    updatedAt:String,

}