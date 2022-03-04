const router = require('express').Router();
const {
  createCommercialCard,
  findCommercialCard,
  deleteCommercialCard,
  updateCommercialCard
} = require('../controllers/commercial');
const {
  validateCreateCommercialCard,
  validateDeleteCommercialCard,
} = require('../middlewares/validator');

router.post('/', validateCreateCommercialCard, createCommercialCard);
router.get('/', findCommercialCard);
router.delete('/:cardId', validateDeleteCommercialCard, deleteCommercialCard);
router.patch('/:cardId', updateCommercialCard);
module.exports = router;
