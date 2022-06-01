const axios = require("axios");

module.exports = {
  async getOrcidProjects(ctx, next) {
    try {
      let orcidID = ctx.request.query.id;

      let res_token = await axios.request({
        url: "https://sandbox.orcid.org/oauth/token",
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          client_id: process.env.ORCID_SB_CLIENT_ID,
          client_secret: process.env.ORCID_SB_SECRET,
          grant_type: "client_credentials",
          scope: "/read-public",
        },
      });

      let token = "Bearer " + res_token.data.access_token;

      let url = "https://pub.sandbox.orcid.org/v2.1/" + orcidID + "/works";

      let config = {
        headers: {
          Accept: "application/orcid+json",
          Authorization: token,
        },
      };

      let res_data = await axios.get(url, config);

      ctx.body = res_data.data;
    } catch (err) {
      ctx.body = "fail";
      console.log(err);
    }
  },
};
