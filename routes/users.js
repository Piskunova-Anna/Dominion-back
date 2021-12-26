const router = require('express').Router();
const {
  findUser,
  findCurrent,
  updateUser,
  updateAccessUser
} = require('../controllers/user');

const { validateUpDateUser } = require('../middlewares/validator');

router.get('/', findUser);
router.get('/me', findCurrent);
router.patch('/me', validateUpDateUser, updateUser);
router.patch('/:userId', updateAccessUser);

module.exports = router;
