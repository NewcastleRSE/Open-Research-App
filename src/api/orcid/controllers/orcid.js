const axios = require("axios");

module.exports = {
  async getAccessToken(ctx) {
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
  getUserInfo: async (ctx) => {
    const orcid = ctx.request.body.orcidID;
    const accessToken = ctx.request.body.orcidToken;

    try {
      console.log("trying to get user info");
      const response = await axios.get(
        `https://pub.orcid.org/v3.0/${orcid}/record`,
        {
          headers: {
            "Content-Type": "application/vnd.orcid+json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const userInfo = response.data;
      ctx.send(userInfo);
    } catch (error) {
      console.error("Error getting user info:", error);
      ctx.throw(
        500,
        "An error occurred while fetching data from the Orcid API."
      );
    }
  },
  async getProjectInfo(ctx) {
    const { orcidID, orcidToken, putCode } = ctx.request.body;

    try {
      const response = await axios.get(
        `https://pub.orcid.org/v3.0/${orcidID}/work/${putCode}`,
        {
          headers: {
            "Content-Type": "application/vnd.orcid+json",
            Authorization: `Bearer ${orcidToken}`,
          },
        }
      );

      const projectInfo = response.data;
      ctx.send(projectInfo);
    } catch (error) {
      console.error("Error getting project info:", error);
      ctx.throw(
        500,
        "An error occurred while fetching project data from the Orcid API."
      );
    }
  },
};
