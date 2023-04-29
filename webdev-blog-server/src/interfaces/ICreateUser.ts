import { UserType } from "../constants";

/**
 * @interface ICreateUser
 */
export interface ICreateUser {
    username?:string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    email?: string;
    password?: string;
}
