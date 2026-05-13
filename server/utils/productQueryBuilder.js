const productWithoutLimit = (values,validLimit,limitValue) => {
    let query = `SELECT p.*,
                 i.url
                 FROM products p
                 JOIN images i ON p.image_id = i.id
                 WHERE p.shop_id=$1
                 
    `
    if(validLimit){
        values.push(limitValue);
        query += `LIMIT $${values.length}`;
    }
    return {query,values}
};

const productQueryMap = {
    productWithoutLimit : productWithoutLimit
};

module.exports = {productQueryMap};