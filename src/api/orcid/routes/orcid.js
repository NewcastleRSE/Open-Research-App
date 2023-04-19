module.exports = {
  routes: [
    // ... your other routes ...
    {
      method: "GET",
      path: "/getAccessToken",
      handler: "orcid.getAccessToken",
      config: {
        policies: [],
      },
    },
  ],
};
