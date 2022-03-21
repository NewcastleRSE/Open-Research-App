'use strict';

/**
 * code service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::code.code');
