"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/orcid",
      handler: "orcid.getOrcidProjects",
      config: {
        auth: false,
      },
    },
  ],
};
