const db = require("../config/db");
const { calculateDistance } = require("../utils/distance");

const addSchool = async (req, res, next) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    // Validation
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ error: "Valid 'name' is required and must be a non-empty string." });
    }
    if (!address || typeof address !== 'string' || address.trim() === '') {
      return res.status(400).json({ error: "Valid 'address' is required and must be a non-empty string." });
    }

    // Convert or validate numbers
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (isNaN(lat) || lat < -90 || lat > 90) {
      return res.status(400).json({ error: "Valid 'latitude' is required and must be between -90 and 90." });
    }
    if (isNaN(lng) || lng < -180 || lng > 180) {
      return res.status(400).json({ error: "Valid 'longitude' is required and must be between -180 and 180." });
    }

    const query = `
      INSERT INTO schools (name, address, latitude, longitude)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await db.execute(query, [name.trim(), address.trim(), lat, lng]);

    res.status(201).json({
      message: "School added successfully.",
      schoolId: result.insertId
    });
  } catch (err) {
    next(err); // pass to global error handler
  }
};

const listSchools = async (req, res, next) => {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({ error: "Latitude and longitude query parameters are required." });
    }

    const userLat = parseFloat(latitude);
    const userLng = parseFloat(longitude);

    if (isNaN(userLat) || userLat < -90 || userLat > 90) {
      return res.status(400).json({ error: "Valid 'latitude' is required and must be between -90 and 90." });
    }
    if (isNaN(userLng) || userLng < -180 || userLng > 180) {
      return res.status(400).json({ error: "Valid 'longitude' is required and must be between -180 and 180." });
    }

    const query = `SELECT id, name, address, latitude, longitude FROM schools`;
    const [schools] = await db.execute(query);

    // calculate distance and sort (closest first)
    const sortedSchools = schools.map(school => {
      const distance = calculateDistance(userLat, userLng, school.latitude, school.longitude);
      return {
        ...school,
        distanceKm: parseFloat(distance.toFixed(2)) // store distance in km, rounded to 2 decimals
      };
    }).sort((a, b) => a.distanceKm - b.distanceKm);

    res.status(200).json({
      message: "Schools retrieved successfully.",
      count: sortedSchools.length,
      schools: sortedSchools
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { addSchool, listSchools };