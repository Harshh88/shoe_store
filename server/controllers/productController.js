const { fetchAllProducts,addProduct,deleteProduct,editProduct } = require("../services/product.service");
const {fetchShopUser,fetchUserShop} = require("../services/shop.service");
const uploadOnCloudinary = require("../utils/uploadOnCloudinary");
const pool = require("../config/db");


const getAllProducts = async (req, res) => {
  try {
    const {shop_id} = req.params;
    const {limit} = req.query;
    const shopRows = await fetchShopUser({shop_id});
    // if(!shopRows){
    //   return res.status(404).json({
    //     message: "you don't have shop"
    //   })
    // }
    const productRows = await fetchAllProducts({ shop_id,limit });
    console.log(productRows)
    res.status(200).json({
      success: true,
      message: "shop fetch successfully",
      shop: shopRows,
      products : productRows
    });
  } catch (err) {
    console.log("something is error in product Controller", err);
    res.status(500).json({
        success: false,
        message: "Internal error"
    })
  }
};


const getGlobalProducts = async (req, res) => {
  try {
    const { limit } = req.query;
    
    // 1. DISTINCT ON (p.id) lagaya taaki image join ki wajah se product duplicate na ho
    // 2. ORDER BY RANDOM() kiya taaki har refresh par random mix ho kar aaye data
    let query = `
      SELECT DISTINCT ON (p.id) p.*, i.url AS image_url 
      FROM products p
      LEFT JOIN images i ON p.id = i.product_id
      ORDER BY p.id, RANDOM()
    `;
    
    // Agar pagination/limit set karni hai toh subquery standard shuffle use karenge
    // taaki limit lagne se pehle poori table random ho sake
    if (limit && !isNaN(parseInt(limit))) {
      query = `
        SELECT * FROM (
          SELECT DISTINCT ON (p.id) p.*, i.url AS image_url 
          FROM products p
          LEFT JOIN images i ON p.id = i.product_id
          ORDER BY p.id, RANDOM()
        ) AS shuffled_products
        ORDER BY RANDOM()
        LIMIT $1
      `;
    }
    
    let values = [];
    if (limit && !isNaN(parseInt(limit))) {
      values.push(parseInt(limit));
    }

    const result = await pool.query(query, values);

    res.status(200).json({
      success: true,
      message: "All marketplace products shuffled and fetched successfully",
      products: result.rows
    });
  } catch (err) {
    console.log("Error in getGlobalProducts controller", err);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};


const getProductsWithAuth = async(req,res) => {
  try{
    const user_id = req.user.id;
    // console.log("user id is:" ,user_id);
    const shop = await fetchUserShop({user_id});
    // console.log(shop);
    if(!shop){
      return res.status(404).json({
        message: "you don't have shop"
      })
    }
    const shop_id = shop.id;
    // console.log(shop_id);
    const productRows = await fetchAllProducts({shop_id});
    // console.log(productRows);
    res.status(200).json({
      success: true,
      message:"product fetch successfully",
      product: productRows
    })
  }
  catch(err){
    console.log(err);
    return res.status(err.status || 500).json({
      message: err.message
    })
  }
}

const createNewProduct = async(req,res) => {
  try{
    const user_id = req.user.id;
    const shop = await fetchUserShop({user_id});
    if(!shop){
      return res.status(404).json({
        success: false,
        message: "You don't have shop"
      })
    }
    const shop_id = shop.id;
    const {name,description,price,stock,size} = req.body;
    if(!name || !description || !price || !stock || !size || !req.file){
      return res.status(400).json({
        success: false,
        message: "all filled required"
      })
    }
    
    
     const cloudinaryRes = await uploadOnCloudinary(req.file.path,"products");
     const productImage = cloudinaryRes?.secure_url || cloudinaryRes?.url || cloudinaryRes;
    
    const newProduct = await addProduct({user_id,shop_id,
      data: [name,description,price,stock,size,productImage]
    })
    if(!newProduct){
      return res.status(500).json({
        success: false,
        message: "failed to add product"
      })
    }
    res.status(200).json({
      success: true,
      message: "product added successfully"
    })
  }catch(err){
    console.log(err);
    return res.status(err.status || 500).json({
      success: false,
      message: err.message
    })
  }
}

const deleteOneProduct = async(req,res) => {
  try{
    const {id: product_id} = req.params
    if(!product_id || isNaN(product_id)){
      return res.status(400).json({
        success: false,
        message: "product id required"
      })
    }
    
    const deletedProduct = await deleteProduct(product_id);
    if(!deletedProduct){
      return res.status(404).json({
        success: false,
        message: "product not found"
      })
    }
    res.status(200).json({
      success: true,
      message: "product deleted successfully",
      deletedProduct
    })
  }catch(err){
    console.log(err);
    return res.status(err.status || 500).json({
      success: false,
      message: err.message
    })
  }
}


const editOneProduct = async (req, res) => {
  try {
    const { id: product_id } = req.params;
    if (!product_id || isNaN(product_id)) {
      return res.status(400).json({
        success: false,
        message: "product id required"
      });
    }

    const data = req.body;

    if (req.file) {
      const cloudinaryRes = await uploadOnCloudinary(req.file.path, "products");
      const urlImg = cloudinaryRes?.secure_url || cloudinaryRes?.url || cloudinaryRes;

      const existingImgCheck = await pool.query(
        `SELECT id FROM images WHERE product_id = $1 LIMIT 1`,
        [product_id]
      );

      let imageId;

      if (existingImgCheck.rows.length > 0) {
        imageId = existingImgCheck.rows[0].id;
        await pool.query(
          `UPDATE images SET url = $1 WHERE id = $2`,
          [urlImg, imageId]
        );
      } else {
        const newImg = await pool.query(
          `INSERT INTO images (url, product_id, is_primary) VALUES ($1, $2, TRUE) RETURNING id`,
          [urlImg, product_id]
        );
        imageId = newImg.rows[0].id;
      }

      data.image_id = imageId;
    }

    if (Object.keys(data).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No updates found"
      });
    }

    const editedProduct = await editProduct(product_id, data);
    if (!editedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "product updated successfully",
      product: editedProduct
    });

  } catch (err) {
    console.log(err);
    return res.status(err.status || 500).json({
      success: false,
      message: err.message
    });
  }
};

module.exports = {getAllProducts,getProductsWithAuth,createNewProduct,deleteOneProduct,editOneProduct,getGlobalProducts};
