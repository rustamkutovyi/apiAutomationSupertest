import {faker} from "@faker-js/faker";

export interface User {
        userId: string,
        username: string,
        email: string,
        avatar: string
        password: string,
        birthdate: Date,
        registeredAt: Date,
}