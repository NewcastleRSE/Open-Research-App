'use strict';

/**
 * preprint service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::preprint.preprint');
