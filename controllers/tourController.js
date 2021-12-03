const fs = require('fs');

const nanoId = require('nanoid');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const checkTourId = (req, res, next, val) => {
  const tour = tours.find((tour) => tour.id === val);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Tour ID',
    });
  }
  next();
};

const checkTourBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Tour obj missing required property',
    });
  }
  next();
};

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTourById = (req, res) => {
  const tour = tours.find((tour) => tour.id === req.params.tourId);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  const id = nanoId.nanoid();
  tours.push(Object.assign({ id: id }, req.body));
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).send('Added new tour!');
    }
  );
};

const updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<updated tour here>',
    },
  });
};

const deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

module.exports = {
  checkTourId,
  checkTourBody,
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
};
