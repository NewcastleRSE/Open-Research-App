"use strict";

/**
 *  submission controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::submission.submission",
  ({ strapi }) => ({
    async create(ctx) {
      let submission = JSON.parse(ctx.request.body.data);

      let researcher = submission.Researcher;
      let project = submission.Project;

      let response = await strapi
        .service("api::submission.submission")
        .create({ data: submission });

      researcher.submission = response.id;
      await strapi
        .service("api::researcher.researcher")
        .create({ data: researcher });

      project.submission = response.id;
      await strapi.service("api::project.project").create({ data: project });

      if (submission.Code) {
        let code = submission.Code;
        code.submission = response.id;
        await strapi.service("api::code.code").create({ data: code });
      }

      if (submission.Dataset) {
        let dataset = submission.Dataset;
        dataset.submission = response.id;
        await strapi.service("api::dataset.dataset").create({ data: dataset });
      }

      return response;
    },
  })
);
