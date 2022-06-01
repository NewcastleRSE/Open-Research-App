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
    async update(ctx) {
      let submission = JSON.parse(ctx.request.body.data);

      // get previously saved data from Strapi
      let sub = await strapi.db.query("api::submission.submission").findOne({
        where: { uuid: submission.uuid },
        populate: true,
      });

      if (submission.Article) {
        // delete old data
        if (sub.articles.length > 0) {
          sub.articles.map(async (article) => {
            await strapi.db.query("api::article.article").delete({
              where: { id: article.id },
            });
          });
        }

        // save new data
        submission.Article.map(async (article) => {
          article.submission = sub.id;
          await strapi
            .service("api::article.article")
            .create({ data: article });
        });
      }

      // save incoming data

      // console.log(submission.Article);
      // console.log(sub.articles);
      // console.log(
      //   "===============================DEBUG=========================="
      // );
      // // compare new data with old and decide what needs update
      // if (submission.Article) {
      //   submission.Article.map(async (article) => {
      //     console.log("ARTICLE LOOP FOR >>>>>>>>>>>>>>>>>>");
      //     console.log(article);
      //     if (sub.articles.length > 0) {
      //       sub.articles.map(async (existingArticle) => {
      //         console.log("SAVED LOOP FOR >>>>>>>>>>>>>>>>>>>>>");
      //         console.log(existingArticle);
      //         if (!article.new) {
      //           // exisiting article
      //           console.log("got id");
      //           if (
      //             article.articleURL !== existingArticle.articleURL ||
      //             article.articleDOI !== existingArticle.articleDOI ||
      //             article.articleEmbargo !== existingArticle.articleEmbargo ||
      //             article.articleLicense !== existingArticle.articleLicense ||
      //             article.articleTitle !== existingArticle.articleTitle
      //           ) {
      //             console.log("editied save block");
      //             // delete old
      //             await strapi.db.query("api::article.article").delete({
      //               where: { id: existingArticle.id },
      //             });

      //             article.submission = sub.id;
      //             await strapi
      //               .service("api::article.article")
      //               .create({ data: article });
      //           }
      //         }
      //       });
      //     } else {
      //       console.log("new save block");
      //       article.submission = sub.id;
      //       await strapi
      //         .service("api::article.article")
      //         .create({ data: article });
      //     }
      //   });
      // }

      if (submission.Monograph) {
        if (sub.monographs.length > 0) {
          sub.monographs.map(async (monograph) => {
            await strapi.db.query("api::monograph.monograph").delete({
              where: { id: monograph.id },
            });
          });
        }
        submission.Monograph.map(async (monograph) => {
          monograph.submission = sub.id;
          await strapi
            .service("api::monograph.monograph")
            .create({ data: monograph });
        });
      }

      if (submission.Dataset) {
        if (sub.datasets.length > 0) {
          sub.datasets.map(async (dataset) => {
            await strapi.db.query("api::dataset.dataset").delete({
              where: { id: dataset.id },
            });
          });
        }

        submission.Dataset.map(async (dataset) => {
          dataset.submission = sub.id;
          await strapi
            .service("api::dataset.dataset")
            .create({ data: dataset });
        });
      }

      if (submission.Code) {
        if (sub.codes.length > 0) {
          sub.codes.map(async (code) => {
            await strapi.db.query("api::code.code").delete({
              where: { id: code.id },
            });
          });
        }

        submission.Code.map(async (code) => {
          code.submission = sub.id;
          await strapi.service("api::code.code").create({ data: code });
        });
      }

      if (submission.Material) {
        if (sub.materials.length > 0) {
          sub.datasets.map(async (dataset) => {
            await strapi.db.query("api::dataset.dataset").delete({
              where: { id: dataset.id },
            });
          });
        }

        submission.Material.map(async (material) => {
          material.submission = sub.id;
          await strapi
            .service("api::material.material")
            .create({ data: material });
        });
      }

      if (submission.Protocol) {
        if (sub.protocols.length > 0) {
          sub.protocols.map(async (protocol) => {
            await strapi.db.query("api::protocol.protocol").delete({
              where: { id: protocol.id },
            });
          });
        }

        submission.Protocol.map(async (protocol) => {
          protocol.submission = sub.id;
          await strapi
            .service("api::protocol.protocol")
            .create({ data: protocol });
        });
      }

      if (submission.DigitalScholarship) {
        if (sub.digital - scholarships.length > 0) {
          sub.digital -
            scholarships.map(async (ds) => {
              await strapi.db
                .query("api::digital-scholarship.digital-scholarship")
                .delete({
                  where: { id: ds.id },
                });
            });
        }

        submission.DigitalScholarship.map(async (digitalScholarship) => {
          digitalScholarship.submission = sub.id;
          await strapi
            .service("api::digital-scholarship.digital-scholarship")
            .create({ data: digitalScholarship });
        });
      }

      if (submission.Preprint) {
        if (sub.preprints.length > 0) {
          sub.preprints.map(async (preprint) => {
            await strapi.db.query("api::preprint.preprint").delete({
              where: { id: preprint.id },
            });
          });
        }

        submission.Preprint.map(async (preprint) => {
          preprint.submission = sub.id;
          await strapi
            .service("api::preprint.preprint")
            .create({ data: preprint });
        });
      }

      if (submission.PeerRev) {
        if (sub.peer - revs.length > 0) {
          sub.peer -
            revs.map(async (peerrev) => {
              await strapi.db.query("api::peer-rev.peer-rev").delete({
                where: { id: peerrev.id },
              });
            });
        }

        submission.PeerRev.map(async (peerRev) => {
          peerRev.submission = sub.id;
          await strapi
            .service("api::peer-rev.peer-rev")
            .create({ data: peerRev });
        });
      }

      if (submission.PreRegAnalysis) {
        if (sub.pre - reg - analyses.length > 0) {
          sub.pre -
            reg -
            analyses.map(async (prereg) => {
              await strapi.db
                .query("api::pre-reg-analyse.pre-reg-analyse")
                .delete({
                  where: { id: prereg.id },
                });
            });
        }

        submission.PreRegAnalysis.map(async (preRegAnalysis) => {
          preRegAnalysis.submission = sub.id;
          await strapi
            .service("api::pre-reg-analysis.pre-reg-analysis")
            .create({ data: preRegAnalysis });
        });
      }

      if (submission.RegReport) {
        if (sub.reg - reports.length > 0) {
          sub.reg -
            reports.map(async (regreport) => {
              await strapi.db.query("api::reg-report.reg-report").delete({
                where: { id: regreport.id },
              });
            });
        }

        submission.RegReport.map(async (RegReport) => {
          RegReport.submission = sub.id;
          await strapi
            .service("api::reg-report.reg-report")
            .create({ data: RegReport });
        });
      }

      if (submission.Thesis) {
        if (sub.theses.length > 0) {
          sub.theses.map(async (thesis) => {
            await strapi.db.query("api::thesis.thesis").delete({
              where: { id: thesis.id },
            });
          });
        }

        submission.Thesis.map(async (thesis) => {
          thesis.submission = sub.id;
          await strapi.service("api::thesis.thesis").create({ data: thesis });
        });
      }

      return sub;
    },
  })
);
