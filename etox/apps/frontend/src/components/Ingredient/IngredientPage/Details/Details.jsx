import React from 'react';
import {
    Link,
    Table,
    TableCell,
    TableRow,
    TableBody,
    TableContainer
} from "@material-ui/core";
import capitalizeJoinItems from '../../tools.js'

const pubchemURL = 'https://pubchem.ncbi.nlm.nih.gov/compound/'

const Details = (props) => {
    return (
        <TableContainer>
            <Table size="small" >
                <TableBody>
                    {props.data.cas_numbers != null &&
                        <TableRow>
                            <TableCell component="th" scope="row">
                                CAS numbers:
                            </TableCell>
                            <TableCell align="left">
                                {props.data.cas_numbers.join(', ')}
                            </TableCell>
                        </TableRow>
                    }
                    {props.data.colour_index != null &&
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Colour Index number:
                            </TableCell>
                            <TableCell align="left">
                                {props.data.colour_index.join(', ')}
                            </TableCell>
                        </TableRow>
                    }
                    {props.data.ec_numbers != null &&
                        <TableRow>
                            <TableCell component="th" scope="row">
                                EC numbers:
                            </TableCell>
                            <TableCell align="left">
                                {props.data.ec_numbers.join(', ')}
                            </TableCell>
                        </TableRow>
                    }
                    {props.data.functions != null &&
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Functions:
                            </TableCell>
                            <TableCell align="left">
                                {
                                    capitalizeJoinItems(
                                        {
                                            items: props.data.functions,
                                            separator: ','
                                        }
                                    )}
                            </TableCell>
                        </TableRow>
                    }
                    {props.data.pubchem_cid != null &&
                        <TableRow>
                            <TableCell component="th" scope="row">
                                PubChem ID:
                            </TableCell>
                            <TableCell align="left">
                                <Link href={`${pubchemURL}${props.data.pubchem_cid}`}>
                                    {props.data.pubchem_cid}
                                </Link>
                            </TableCell>
                        </TableRow>
                    }
                    <TableRow>
                        <TableCell component="th" scope="row">
                            Request statistics:
                        </TableCell>
                        <TableCell align="left">
                            {props.data.request_statistics}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )

};

export default Details;