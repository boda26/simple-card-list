const express = require('express');
require('dotenv').config();

const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

//implement the CORS config
app.use(cors())

//function to generate a url for getting a random image from picsum
const fetchImageUrl = () => {
    console.log("randomly generated image")
    return `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`;
};

//products array
let products = [
    { id: 1, name: 'Product 1', description: 'description 1', price: 100, imageUrl: "" },
    { id: 2, name: 'Product 2', description: 'description 2', price: 200, imageUrl: "" },
    { id: 3, name: 'Product 3', description: 'description 3', price: 300, imageUrl: "" },
    { id: 4, name: 'Product 4', description: 'description 4', price: 150, imageUrl: "" },
    { id: 5, name: 'Product 5', description: 'description 5', price: 500, imageUrl: "" },
    { id: 6, name: 'Product 6', description: 'description 6', price: 50, imageUrl: "" },
];

products = products.map(product => {
    return { ...product, imageUrl: fetchImageUrl() }; // Add imageUrl when initializing products
});

//implement the get api for getting products
app.get('/api/products', (req, res) => {
    res.json(products)
});

//implement the delete api for deleting a product by Id
app.delete('/api/products/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let itemFound = false;
    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        if (product.id === id) {
            itemFound = true;
            products.splice(i, 1);
            break;
        }
    }
    if (itemFound) {
        res.json({
            status: 200,
            "message": "Product deleted"
        })
    } else {
        res.json({
            statusCode: 404,
            message: "Product not found"
        })
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
