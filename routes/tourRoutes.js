const express = require('express');

const {
  checkTourId,
  checkTourBody,
  getAllTours,
  createTour,
  getTourById,
  updateTour,
  deleteTour,
} = require('./../controllers/tourController');

const router = express.Router();
router.param('tourId', checkTourId);

router.route('/').get(getAllTours).post(checkTourBody, createTour);
router.route('/:tourId').get(getTourById).patch(updateTour).delete(deleteTour);

module.exports = router;
