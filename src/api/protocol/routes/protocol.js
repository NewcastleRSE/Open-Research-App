'use strict';

/**
 * protocol router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::protocol.protocol');
