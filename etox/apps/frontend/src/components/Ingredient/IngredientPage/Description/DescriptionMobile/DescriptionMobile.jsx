import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Title from '../../Title/Title.jsx';
import IngredientRatingBar from '../../../../Charts/IngredientRatingBar.jsx';
import DescriptionDesctop from '../DescriptionDesctop.jsx';
import Details from '../../Details/Details.jsx';
import useStyles from './styles.js';

const DescriptionMobile = (props) => {
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            {props.searchResults.data.ingredient != null &&
            
                <Box className={classes.detailsWrapper}>
                    <Typography variant="h6">Details</Typography>
                    <Box className={classes.details}>
                        <Details data={props.searchResults.data.ingredient} />
                    </Box>
                </Box>
            }
            <Box className={classes.title}>
                <Title mainName={props.searchResults.data.ingredient.main_name} />
                {props.searchResults.data.ingredient.hazard.ingredient_hazard_avg != null &&
                    <IngredientRatingBar
                        rating={props.searchResults.data.ingredient.hazard.ingredient_hazard_avg}
                        width={150}
                        height={15}
                    />
                }
            </Box>
            <Typography variant="h6">Description</Typography>
            {props.searchResults.data.ingredient.description != null &&
                <Box className={classes.description}>
                    <DescriptionDesctop data={props.searchResults.data.ingredient.description} />
                </Box>
            }
        </Container>
    )
};

export default DescriptionMobile;
