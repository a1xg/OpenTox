import React from 'react';
import { Link, List, ListItem, ListItemText } from "@material-ui/core";
import capitalizeJoinItems from '../../tools.js'

const Details = (props) => {

    return (
        <List>
            {props.data.cas_numbers != null &&
                <ListItem>
                    <ListItemText variant='body1'>
                        CAS numbers: {props.data.cas_numbers.join(', ')}
                    </ListItemText>
                </ListItem>
            }
            {props.data.colour_index != null &&
                <ListItem>
                    <ListItemText variant='body1'>
                        Colour Index number: {props.data.colour_index}
                    </ListItemText>
                </ListItem>
            }
            {props.data.ec_numbers != null &&
                <ListItem>
                    <ListItemText variant='body1'>
                        EC numbers: {props.data.ec_numbers.join(', ')}
                    </ListItemText>
                </ListItem>
            }
            {props.data.functions != null &&
                <ListItem>
                    <ListItemText variant='body1'>
                        Functions: {
                            capitalizeJoinItems(
                                {
                                    items: props.data.functions,
                                    separator: ','
                                }
                            )}
                    </ListItemText>
                </ListItem>
            }
            {props.data.pubchem_cid != null &&
                <ListItem>
                    <ListItemText variant='body1'>
                        PubChem ID: {
                            <Link href={'https://pubchem.ncbi.nlm.nih.gov/compound/' + props.data.pubchem_cid} underline='hover'>
                                {props.data.pubchem_cid}
                            </Link>
                        }
                    </ListItemText>
                </ListItem>
            }
            <ListItem>
                <ListItemText variant='body1'>
                    Request statistics: {props.data.request_statistics}
                </ListItemText>
            </ListItem>
        </List>
    )

};

export default Details;