const Location = require('../models/Location');
const User = require('../models/User');

const addLocation = async (req, res) => {
  const { name } = req.body;

  try {
    const location = new Location({ name, user: req.user.id });
    await location.save();

    const user = await User.findById(req.user.id);
    user.locations.push(location);
    await user.save();

    res.json(location);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const deleteLocation = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ msg: 'Location not found' });
    }

    if (location.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await location.remove();

    res.json({ msg: 'Location removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { addLocation, deleteLocation };
