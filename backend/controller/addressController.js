import address from '../models/address.js';

// save new address
export const addAddress = async (req, res) => {
  try {
    const newAddress = await address.create(req.body);
    res.json({ message: "Address added successfully", newAddress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get address by user id
export const getAddressByUserId = async (req, res) => {
  try {
    const addressData = await address.find({ userId: req.params.userId });
    res.json({ message: "Address retrieved successfully", addressData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};