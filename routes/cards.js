const router = require('express').Router();
const {
  createCard,
  findCard,
  deleteCard,
  updateCard
} = require('../controllers/card');
const {
  validateCreateCard,
  validateDeleteCard,
} = require('../middlewares/validator');

router.post('/', validateCreateCard, createCard);
router.get('/', findCard);
router.delete('/:cardId', validateDeleteCard, deleteCard);
router.patch('/:cardId', updateCard);
module.exports = router;
