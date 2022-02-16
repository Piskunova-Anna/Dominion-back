const router = require('express').Router();
const {
  findUser,
  findCurrent,
  updateUser,
  updateAccessUser,
  addAdminUser
} = require('../controllers/user');

const { validateUpDateUser } = require('../middlewares/validator');

router.get('/', findUser);
router.get('/me', findCurrent);
router.patch('/me', validateUpDateUser, updateUser);
router.patch('/:userId', updateAccessUser);
router.patch('/me/admin/:userId', addAdminUser);
module.exports = router;
