const orcidProvider = require("../../../../orcid/index");

module.exports = {
  // ...

  async testOrcid(ctx) {
    try {
      const accessToken = "APP-7JXBEAISI721IHOW";
      const user = await orcidProvider({ accessToken });

      ctx.send({ message: "Successfully fetched ORCID user data", user });
    } catch (error) {
      console.error("Error fetching ORCID user data:", error);
      ctx.send({ message: "Error fetching ORCID user data", error });
    }
  },
};
