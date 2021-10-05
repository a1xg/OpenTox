import React from 'react';
import { Container, Box, Typography } from '@material-ui/core';
import ItemCard from '../../ItemCard/ItemCard.jsx';

//TODO стилизовать errormessage
const ErrorMessage = (props) => {
    return (
        <Container style={{alignItems:'center'}}>
        <ItemCard title='Error'>
        <Box sx={{
            width:'600px',
            textAlign:'center',
        }}>
            <Typography variant='h6'>Sorry, ingredients not found...</Typography>
            </Box> 
        </ItemCard>

        </Container>
        )
};

export default ErrorMessage