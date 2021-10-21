import React from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import Container from "@material-ui/core/Container";
//TODO длина прогрессбара ломает верстку
const ProgressBar = () => {
    return (
        <Container style={{
            maxWidth: '600px'
        }}>
        <LinearProgress />
        </Container>
    )
};

export default ProgressBar;