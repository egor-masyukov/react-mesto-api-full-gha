const router = require('express').Router();
const {
  getUsers, getUserById, getUserInfo, updateUser, updateAvatar,
} = require('../controllers/users');
const { validateAvatarUpdate, validateUserUpdate, validateUserId } = require('../middlewares/validation');

router.get('/', getUsers);

router.get('/me', getUserInfo);

router.get('/:id', validateUserId, getUserById);

router.patch('/me', validateUserUpdate, updateUser);

router.patch('/me/avatar', validateAvatarUpdate, updateAvatar);

module.exports = router;
