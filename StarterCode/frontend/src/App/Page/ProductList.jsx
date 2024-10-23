import React, {useEffect} from 'react';
import axios from "axios";
import {Box, Card, Container, Grid, IconButton} from "@mui/material";
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductList = () => {
    const [products, setProducts] = React.useState([]);

    //implement the get products function
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    //implement the delete function
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/api/products/${id}`); // Update with your DELETE endpoint
            const response = await axios.get('http://localhost:5001/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Container>
            <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '40px'}}>Simple Card List</h1>
            <Box sx={{ width: '80%', margin: '0 auto' }}> {/* Centers the container and sets width to 60% */}
                <Grid container spacing={3} alignItems="flex-start">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <Grid item xs={12} sm={6} md={4} key={product.id}>
                                <Box sx={{ position: 'relative' }}>
                                    {/* Red Trash Bin Button in the Top Left Corner */}
                                    <IconButton
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            zIndex: 1,
                                            color: 'red',
                                        }}
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>

                                    {/* Card Content */}
                                    <Card style={{ width: '100%' }}>
                                        <CardMedia component="img" height="180" image={product.imageUrl} alt={product.name} />
                                        <CardContent>
                                            <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 'bold' }}>
                                                {product.name}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                ${product.price}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                {product.description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Box>
                            </Grid>
                        ))
                    ) : (
                        <p>No products available.</p>
                    )}
                </Grid>
            </Box>
        </Container>
    );
};

export default ProductList;