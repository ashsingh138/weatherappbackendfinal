const express = require('express');
const { addLocation, deleteLocation } = require('../controllers/locationController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/add', auth, addLocation);
router.delete('/delete/:id', auth, deleteLocation);

module.exports = router;
