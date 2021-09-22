import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import {
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableFooter,
    TablePagination,
    Paper
} from '@material-ui/core';
import IngredientRatingBar from './IngredientRatingBar/IngredientRatingBar.jsx';
import BriefStatistics from './BriefStatistics/BriefStatistics.jsx';
import TablePaginationActions from "./TablePaginationActions/TablePaginationActions.jsx";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(1)
    },
}));

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const IngredientsList = (props) => {
    const ingredients = props.data.product_ingredients;
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ingredients.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    console.log('IngredientsList props:', props);

    return (
        <TableContainer component={Paper}  >
            <Table xs={12} >
                <TableHead>
                    <TableRow xs={12}>
                        <TableCell xs={6}>Name</TableCell>
                        <TableCell xs={3}>Hazard classes</TableCell>
                        <TableCell xs={3}>Rating</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? ingredients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : ingredients
                    ).map((ingredient) => {
                        return (
                            <TableRow key={ingredient.id} xs={12}>
                                <TableCell xs={6}>
                                    <NavLink to={{ pathname: "ingredient/" + ingredient.id }}>
                                        <Typography variant='subtitle1'>
                                            {ingredient.main_name[0]+ingredient.main_name
                                            .substring(1)
                                            .toLowerCase() }
                                        </Typography>
                                    </NavLink>
                                </TableCell>
                                
                                <TableCell xs={3}>
                                    <BriefStatistics data={ingredient.hazard.hazard_ghs_set} />
                                </TableCell>
                                <TableCell xs={3}>
                                    <IngredientRatingBar rating={ingredient.hazard.ingredient_hazard_avg} />
                                </TableCell>
                            </TableRow>
                        )
                    })}
                    {emptyRows > 0 && (
                        <TableRow xs={12}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow xs={12}>
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

