'use strict';

/**
 * peer-rev service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::peer-rev.peer-rev');
