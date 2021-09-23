import React from 'react';
import GridItem from '../../../GridItem/GridItem.jsx';
import { Typography, Link, List, ListItem, ListItemText } from "@material-ui/core";

//TODO отрефакторить код: переписать на компонентах Material UI, возможно на компоненте Table

const Details = (props) => {
    console.log('Details props', props);

    return (
        <List>
            <ListItem>
                <Typography variant='body1'>
                    CAS numbers {
                        props.data.ingredient.cas_numbers != null ? props.data.ingredient.cas_numbers.join(', ') : 'not data'
                    }
                </Typography>


            </ListItem>
            <ListItem>
                <Typography variant='body1'>
                    Colour Index number (CI) {
                        props.data.ingredient.colour_index != null ? props.data.ingredient.colour_index : 'not data'
                    }
                </Typography>
            </ListItem>
            <ListItem>
                <Typography variant='body1'>
                    EC numbers {
                        props.data.ingredient.ec_numbers != null ? props.data.ingredient.ec_numbers.join(', ') : 'not data'
                    }
                </Typography>
            </ListItem>
            <ListItem>
                <Typography variant='body1'>
                    Functions {
                        props.data.ingredient.functions != null ? props.data.ingredient.functions.join(', ') : 'not data'
                    }
                </Typography>
            </ListItem>
            <ListItem>
                <Typography variant='body1'>
                    PubChem page {
                        props.data.ingredient.pubchem_cid != null ? props.data.ingredient.pubchem_cid : 'not data'
                    }
                </Typography>
            </ListItem>
            <ListItem>
                <Typography variant='body1'>
                    Request statistics {props.data.ingredient.request_statistics}
                </Typography>
            </ListItem>


        </List>
    )

};

export default Details;