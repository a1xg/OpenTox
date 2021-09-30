import React from 'react';
import { Link, List, ListItem, ListItemText } from "@material-ui/core";

const Details = (props) => {
    console.log('Details props', props);
    return (
        <List>
            <ListItem>
                <ListItemText variant='body1'>
                    CAS numbers: {
                        props.data.cas_numbers != null ? props.data.cas_numbers.join(', ') : 'not data'
                    }
                </ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText variant='body1'>
                    Colour Index number: {
                        props.data.colour_index != null ? props.data.colour_index : 'not data'
                    }
                </ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText variant='body1'>
                    EC numbers: {
                        props.data.ec_numbers != null ? props.data.ec_numbers.join(', ') : 'not data'
                    }
                </ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText variant='body1'>
                    Functions: {
                        props.data.functions != null ? props.data.functions.join(', ') : 'not data'
                    }
                </ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText variant='body1'>
                    PubChem ID: {
                        props.data.pubchem_cid != null 
                        ? <Link href={'https://pubchem.ncbi.nlm.nih.gov/compound/'+props.data.pubchem_cid} underline='hover'>
                            {props.data.pubchem_cid}
                         </Link>
                        : 'not data'
                    }
                </ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText variant='body1'>
                    Request statistics: {props.data.request_statistics}
                </ListItemText>
            </ListItem>
        </List>
    )

};

export default Details;