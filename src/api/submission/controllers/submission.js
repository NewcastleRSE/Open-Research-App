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

      if (submission.Article) {
        submission.Article.map(async (article) => {
          article.submission = response.id;
          await strapi
            .service("api::article.article")
            .create({ data: article });
        });
      }

      if (submission.Monograph) {
        submission.Monograph.map(async (monograph) => {
          monograph.submission = response.id;
          await strapi
            .service("api::monograph.monograph")
            .create({ data: monograph });
        });
      }

      if (submission.Dataset) {
        submission.Dataset.map(async (dataset) => {
          dataset.submission = response.id;
          await strapi
            .service("api::dataset.dataset")
            .create({ data: dataset });
        });
      }

      if (submission.Code) {
        submission.Code.map(async (code) => {
          code.submission = response.id;
          await strapi.service("api::code.code").create({ data: code });
        });
      }

      if (submission.Material) {
        submission.Material.map(async (material) => {
          material.submission = response.id;
          await strapi
            .service("api::material.material")
            .create({ data: material });
        });
      }

      if (submission.Protocol) {
        submission.Protocol.map(async (protocol) => {
          protocol.submission = response.id;
          await strapi
            .service("api::protocol.protocol")
            .create({ data: protocol });
        });
      }

      if (submission.DigitalScholarship) {
        submission.DigitalScholarship.map(async (digitalScholarship) => {
          digitalScholarship.submission = response.id;
          await strapi
            .service("api::digital-scholarship.digital-scholarship")
            .create({ data: digitalScholarship });
        });
      }

      if (submission.Preprint) {
        submission.Preprint.map(async (preprint) => {
          preprint.submission = response.id;
          await strapi
            .service("api::preprint.preprint")
            .create({ data: preprint });
        });
      }

      if (submission.PeerRev) {
        submission.PeerRev.map(async (peerRev) => {
          peerRev.submission = response.id;
          await strapi
            .service("api::peer-rev.peer-rev")
            .create({ data: peerRev });
        });
      }

      if (submission.PreRegAnalysis) {
        submission.PreRegAnalysis.map(async (preRegAnalysis) => {
          preRegAnalysis.submission = response.id;
          await strapi
            .service("api::pre-reg-analysis.pre-reg-analysis")
            .create({ data: preRegAnalysis });
        });
      }

      if (submission.RegReport) {
        submission.RegReport.map(async (RegReport) => {
          RegReport.submission = response.id;
          await strapi
            .service("api::reg-report.reg-report")
            .create({ data: RegReport });
        });
      }

      if (submission.Thesis) {
        submission.Thesis.map(async (thesis) => {
          thesis.submission = response.id;
          await strapi.service("api::thesis.thesis").create({ data: thesis });
        });
      }

      return response;
    },
  })
);
