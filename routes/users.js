const router = require('express').Router();
const { celebrate } = require('celebrate');

const { updateMyProfileSchema } = require('../middlewares/validator');
const { getMyProfile, updateMyProfile } = require('../controllers/userController');

router.get('/me', getMyProfile);
router.patch('/me', celebrate({ body: updateMyProfileSchema }), updateMyProfile);

module.exports = router;
