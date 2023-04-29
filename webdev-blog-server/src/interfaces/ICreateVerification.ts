/**
 * @interface ICreateVerification
 */
export interface ICreateVerification {
    email?: string;
    verificationToken?: string;
    expiresAt?: Date
}
