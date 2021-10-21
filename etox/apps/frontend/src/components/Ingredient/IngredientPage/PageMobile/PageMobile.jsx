import React from "react";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import PercentNotifications from "../PercentNotifications/PercentNotifications.jsx";
import IngredientRatingBar from '../../../Charts/IngredientRatingBar.jsx';
import Description from "../Description/Description.jsx";
import HazardLevel from "../HazardLevel/HazardLevel.jsx";
import Details from "../Details/Details.jsx";
import Title from "../Title/Title.jsx";
import ChartDescription from "../ChartDescription/ChartDescription.jsx";
import Synonyms from "../Synonyms/Synonyms.jsx";
import ItemCard from "../../../ItemCard/ItemCard.jsx";
import Breadcrumb from "../Breadcrumb/Breadcrumbs.jsx";
import useStyles from "./styles.js";

const PageMobile = (props) => {
    const classes = useStyles();
    return (
        <Container maxWidth={'lg'}>
        </Container >
    )
};

export default PageMobile;