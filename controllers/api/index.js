const express = require('express');
const routeDefs = [
  { path: '/users', route: require('./userRoutes') },
  { path: '/blogs', route: require('./blogRoutes') },
  { path: '/comments', route: require('./commentRoute') },
];

const router = express.Router();

routeDefs.forEach(routeDef => router.use(routeDef.path, routeDef.route));

module.exports = router;
