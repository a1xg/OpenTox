import React from 'react';
import { Typography, Link, List, ListItem, ListItemText } from "@material-ui/core";

const Details = (props) => {
    console.log('Details props', props);
    return (
        <List>
            <ListItem>
                <ListItemText variant='body1'>
                    CAS numbers: {
                        props.data.ingredient.cas_numbers != null ? props.data.ingredient.cas_numbers.join(', ') : 'not data'
                    }
                </ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText variant='body1'>
                    Colour Index number: {
                        props.data.ingredient.colour_index != null ? props.data.ingredient.colour_index : 'not data'
                    }
                </ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText variant='body1'>
                    EC numbers: {
                        props.data.ingredient.ec_numbers != null ? props.data.ingredient.ec_numbers.join(', ') : 'not data'
                    }
                </ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText variant='body1'>
                    Functions: {
                        props.data.ingredient.functions != null ? props.data.ingredient.functions.join(', ') : 'not data'
                    }
                </ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText variant='body1'>
                    PubChem ID: {
                        props.data.ingredient.pubchem_cid != null 
                        ? <Link href={'https://pubchem.ncbi.nlm.nih.gov/compound/'+props.data.ingredient.pubchem_cid} underline='hover'>
                            {props.data.ingredient.pubchem_cid}
                         </Link>
                        : 'not data'
                    }
                </ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText variant='body1'>
                    Request statistics: {props.data.ingredient.request_statistics}
                </ListItemText>
            </ListItem>


        </List>
    )

};

export default Details;