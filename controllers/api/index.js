const express = require('express');
const routeDefs = [
  { path: '/users', route: require('./userRoute') },
  { path: '/blogs', route: require('./blogRoute') },
  { path: '/comments', route: require('./commentRoute') },
];

const router = express.Router();

routeDefs.forEach(routeDef => router.use(routeDef.path, routeDef.route));

module.exports = router;
