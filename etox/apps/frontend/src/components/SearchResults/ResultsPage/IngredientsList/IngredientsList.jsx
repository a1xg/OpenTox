import React from "react";
import { NavLink } from 'react-router-dom';
import { capitalize } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Container from '@material-ui/core/Container';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Link from '@material-ui/core/Link';
import IngredientRatingBar from '../../../Charts/IngredientRatingBar.jsx';
import BriefStatistics from '../../../Charts/BriefStatistics.jsx';
 // TODO таблица уплывает за пределы контейнера в мобильной версии
const IngredientsList = (props) => {
    const ingredients = props.data.product_ingredients;

    return (
        <Container>
            <Table xs={12} >
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Hazard classes</TableCell>
                        <TableCell>OpenTox rating</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ingredients.map((ingredient) => {
                        return (
                            <TableRow key={ingredient.id}>
                                <TableCell align="left">
                                <Typography variant='subtitle1'>
                                    <Link to={{ pathname: "ingredient/" + ingredient.id }} component={NavLink}>
                                        {capitalize(ingredient.main_name.toLowerCase())}                                       
                                    </Link>
                                    </Typography>
                                </TableCell>
                                <TableCell align="left">
                                    <BriefStatistics 
                                    data={ingredient.hazard.hazard_ghs_set} 
                                    width={100} 
                                    height={14} 
                                    padding={3}
                                    />
                                </TableCell>
                                <TableCell align="left">
                                    <IngredientRatingBar
                                        rating={ingredient.hazard.ingredient_hazard_avg}
                                        width={100}
                                        height={14}
                                        padding={3}
                                    />
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </Container>
    )
};

export default IngredientsList;

