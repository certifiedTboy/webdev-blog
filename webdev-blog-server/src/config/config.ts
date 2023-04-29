import dotenv from "dotenv";

dotenv.config();

const { env } = process;

export default {
    APP_PORT: env.PORT || 3001,
    SMTP_HOST: env.SMTP_HOST,
    SMTP_PORT: env.SMTP_PORT,
    SMTP_USER : env.SMTP_USER,
    SMTP_PASSWORD : env.SMTP_PASSWORD,
    DB_URL :<string>env.DB_URL,
    JWT_TOKEN_SECRET:<string>env.JWT_TOKEN_SECRET,
    FRONT_END_URL: <string>env.FRONT_END_URL,
    ACCOUNT_VERIFY_TOKEN_TTL_IN_HOURS: 24,
    PASSWORD_RESET_TOKEN_TTL_IN_HOURS: 1,
    GOOGLE_OAUTH_CLIENT_ID:<string>env.GOOGLE_OAUTH_CLIENT_ID,
    GOOGLE_OAUTH_CLIENT_SECRET:<string>env.GOOGLE_OAUTH_CLIENT_SECRET,
    GOOGLE_OAUTH_REDIRECT_URL:<string>env.GOOGLE_OAUTH_REDIRECT_URL,
    accessTokenPrivateKey : <string>env.accessTokenPrivateKey,
    accessTokenPublicKey :<string>env.accessTokenPublicKey,
    refreshTokenPrivateKey : <string>env.refreshTokenPrivateKey,
    refreshTokenPublicKey :<string>env.refreshTokenPublicKey,
};