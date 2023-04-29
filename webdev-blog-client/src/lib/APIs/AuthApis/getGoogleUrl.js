const getGoogleUrl = (from) => {
  const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;

  const options = {
    redirect_uri: "http://localhost:3001/api/v1/auth/sessions/oauth/google",
    client_id:
      "124943341739-dqiq38k57kmpou8hrq0fbf654cp3r800.apps.googleusercontent.com",
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
    state: from,
  };

  const qs = new URLSearchParams(options);

  return `${rootUrl}?${qs.toString()}`;
};

export default getGoogleUrl;
