import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { capitalize } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Link from '@material-ui/core/Link';
import IngredientRatingBar from '../../../Charts/IngredientRatingBar.jsx';
import BriefStatistics from '../../../Charts/BriefStatistics.jsx';
import TablePaginationActions from "./TablePaginationActions/TablePaginationActions.jsx";

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const IngredientsList = (props) => {
    console.log('IngredientsList props', props)
    const ingredients = props.data.product_ingredients;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ingredients.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    console.log('IngredientsList props:', props);

    return (
        <TableContainer>
            <Table xs={12}>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Hazard classes</TableCell>
                        <TableCell>Rating</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? ingredients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : ingredients
                    ).map((ingredient) => {
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
                    {emptyRows > 0 && (
                        <TableRow >
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow >
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={ingredients.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )
};

export default IngredientsList;

