module.exports = {
  async getAccessToken(ctx) {
    const axios = require("axios");
    const code = ctx.request.query.code;
    const CLIENT_ID = process.env.ORCID_CLIENT_ID;
    const CLIENT_SECRET = process.env.ORCID_CLIENT_SECRET;
    const REDIRECT_URI = process.env.ORCID_REDIRECT_URI;

    try {
      const response = await axios.post("https://orcid.org/oauth/token", null, {
        params: {
          grant_type: "authorization_code",
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code: code,
          redirect_uri: REDIRECT_URI,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const data = response.data;
      ctx.send({ accessToken: data.access_token, orcid: data.orcid });
    } catch (error) {
      ctx.status = error.response.status;
      ctx.send({ message: error.message });
    }
  },
};
