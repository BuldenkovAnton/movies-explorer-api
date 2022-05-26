const router = require('express').Router();

const { updateMyProfileSchema } = require('../middlewares/validator');
const { getMyProfile, updateMyProfile } = require('../controllers/userController');

router.get('/me', getMyProfile);
router.patch('/me', updateMyProfileSchema, updateMyProfile);

module.exports = router;
