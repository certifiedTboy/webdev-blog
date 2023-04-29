
/**
 * @interface IGoogleOauthToken
 */
export interface IGoogleOauthToken {
    access_token: string;
    id_token: string;
    expires_in: number;
    refresh_token: string;
    token_type: string;
    scope: string;
  }