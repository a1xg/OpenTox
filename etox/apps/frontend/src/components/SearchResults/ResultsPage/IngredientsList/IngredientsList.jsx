import React from "react";
import { NavLink } from 'react-router-dom';
import { capitalize } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Link from '@material-ui/core/Link';
import IngredientRatingBar from '../../../Charts/IngredientRatingBar.jsx';
import BriefStatistics from '../../../Charts/BriefStatistics.jsx';
import { MobileOrDesctop } from '../../../tools.js';
import { display } from "@mui/system";

const IngredientsList = (props) => {
    const displayOption = MobileOrDesctop();
    const ingredients = props.data.product_ingredients;

    return (
            <TableContainer>
                <Table xs={12} >
                    <TableHead>
                        {displayOption == 'mobile' &&
                            <TableRow>
                                <TableCell align="left">Name / Hazard classes</TableCell>
                                <TableCell align="right">OpenTox rating</TableCell>
                            </TableRow>
                        }
                        {displayOption == 'desctop' &&
                            <TableRow>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Hazard classes</TableCell>
                                <TableCell align="left">OpenTox rating</TableCell>
                            </TableRow>
                        }

                    </TableHead>
                    <TableBody>
                        {ingredients.map((ingredient) => {
                            return (
                                <TableRow key={ingredient.id}>

                                    {displayOption == 'desctop' &&
                                        <TableCell align="left">
                                            <Typography variant='subtitle1'>
                                                <Link to={{ pathname: "ingredient/" + ingredient.id }} component={NavLink}>
                                                    {capitalize(ingredient.main_name.toLowerCase())}
                                                </Link>
                                            </Typography>
                                        </TableCell>
                                    }
                                    {displayOption == 'desctop' &&
                                        <TableCell align="left">
                                            <BriefStatistics
                                                data={ingredient.hazard.hazard_ghs_set}
                                                width={100}
                                                height={14}
                                                padding={3}
                                            />
                                        </TableCell>
                                    }
                                    {displayOption == 'mobile' &&
                                        <TableCell align="left">
                                            <Typography variant='subtitle1'>
                                                <Link to={{ pathname: "ingredient/" + ingredient.id }} component={NavLink}>
                                                    {capitalize(ingredient.main_name.toLowerCase())}
                                                </Link>
                                            </Typography>
                                            <BriefStatistics
                                                data={ingredient.hazard.hazard_ghs_set}
                                                width={100}
                                                height={14}
                                                padding={3}
                                            />
                                        </TableCell>
                                    }
                                    <TableCell align="right">
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
            </TableContainer>
    )
};

export default IngredientsList;

