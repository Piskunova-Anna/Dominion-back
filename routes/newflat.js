const router = require('express').Router();
const {
  createCard,
  findCard,
  deleteCard,
  findIdCard,
  updateCard
} = require('../controllers/newflat');
const {
    validateCreateNewFlat,
    validateDeleteNewFlat,
} = require('../middlewares/validator');

router.post('/', validateCreateNewFlat, createCard);
router.get('/', findCard);
router.delete('/:cardId', validateDeleteNewFlat, deleteCard);
router.patch('/:cardId', updateCard);
module.exports = router;
