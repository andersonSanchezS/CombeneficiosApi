const { Router } = require('express');
const { registerController } = require('./auth.controller');
const upload = require('../../middlewares/multer');
const router = Router();

router.post('/register', upload.single('image'), registerController);

module.exports = router;
