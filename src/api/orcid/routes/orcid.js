module.exports = {
  routes: [
    {
      method: "GET",
      path: "/getAccessToken",
      handler: "orcid.getAccessToken",
      config: {
        policies: [],
      },
    },
    {
      method: "POST",
      path: "/orcid/user-info",
      handler: "orcid.getUserInfo",
      config: {
        policies: [],
      },
    },
    {
      method: "POST",
      path: "/orcid/project-info",
      handler: "orcid.getProjectInfo",
      config: {
        policies: [],
      },
    },
  ],
};
