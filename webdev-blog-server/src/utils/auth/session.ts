import axios from "axios"
import config from "../../config/config"
import { IGoogleOauthToken } from "../../interfaces"
import { IGoogleUserResult } from "../../interfaces";
import QueryString from "qs";


export const getGoogleOauthToken = async ({
    code,
  }: {
    code: string;
  }): Promise<IGoogleOauthToken> => {
    const rootURl = 'https://oauth2.googleapis.com/token';
  
    const options = {
      code,
      client_id: config.GOOGLE_OAUTH_CLIENT_ID,
      client_secret: config.GOOGLE_OAUTH_CLIENT_SECRET,
      redirect_uri: config.GOOGLE_OAUTH_REDIRECT_URL,
      grant_type: 'authorization_code',
    };
    try {
      const { data } = await axios.post<IGoogleOauthToken>(
        rootURl,
        QueryString.stringify(options),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
  
      return data;
    } catch (err: any) {
      console.log('Failed to fetch Google Oauth Tokens');
      throw new Error(err);
    }
  };
  
 
  
  export async function getGoogleUser({
    id_token,
    access_token,
  }: {
    id_token: string;
    access_token: string;
  }): Promise<IGoogleUserResult> {
    try {
      const { data } = await axios.get<IGoogleUserResult>(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
        }
      );
  
      return data;
    } catch (err: any) {
      console.log(err);
      throw Error(err);
    }
  }

