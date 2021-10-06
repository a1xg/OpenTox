import React from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import { Container } from "@material-ui/core";

const ProgressBar = () => {
    return (
        <Container style={{
            width: '600px'
        }}>
        <LinearProgress />
        </Container>
    )
};

export default ProgressBar;