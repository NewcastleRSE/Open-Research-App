module.exports = {
  routes: [
    {
      method: "GET",
      path: "/test-orcid",
      handler: "orcid.testOrcid",
      config: {
        policies: [],
      },
    },
  ],
};
