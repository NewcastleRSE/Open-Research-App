'use strict';

/**
 * protocol service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::protocol.protocol');
