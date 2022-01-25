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
        owner: string,
        cardNumber: string,
        expirationDate: string
    },
    id: string,
    name: string,
    email: string,
    username: string,
    age: Number,
    role: string,
    phoneNumber: string,
    cinNumber: String;
    cin: string;
    range: Number,
    address: string,
    status: string,
    createdAt: string,
    updatedAt:string,

}