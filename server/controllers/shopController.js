const {fetchAllShops} = require("../services/shop.service");

const getAllShops = async (req,res) => {
  try {
    const { latitude, longitude,limit } = req.body || {};
    // const { limit } = req.query;
    // const limit = 6;
    const shops = await fetchAllShops({
      latitude,
      longitude,
      limit
    });

    res.status(200).json({
      success: true,
      message: shops.length ? "shops fetch successfully" : "shops not found",
      shops
    });

  } catch (err) {
    console.log("something error in shopController", err);
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
};

module.exports = {getAllShops};
