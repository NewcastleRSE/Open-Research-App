'use strict';

/**
 * peer-rev router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::peer-rev.peer-rev');
