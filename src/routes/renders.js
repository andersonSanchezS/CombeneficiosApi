const { Router } = require('express');

const router = Router();

router.get('/', (request, response) => {
  response.send('prueba');
});

module.exports = router;
