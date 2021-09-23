import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from '@material-ui/core';
import { ratingBarColorMap } from './ChartsConfig';

// версия с которой норм работает Doughnut 0.62.0, с весиями выше - вместо label отображается id
//!TODO предусмотреть кроссбраузерность текста внутри ResponsivePie

const margin = { top: 40, right: 40, bottom: 40, left: 40 };

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "consolas, sans-serif",
    textAlign: "center",
    position: "relative",
    width: 400,
    height: 400
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: margin.right,
    bottom: 0,
    left: margin.left,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 48,
    //color: green,
    textAlign: "center",
    pointerEvents: "none"
  }
}));

const getColors = (data) => {
  let colors = []
  data.map(d => {
    colors.push(d.color)
  });
  return colors
};

const Doughnut = (props) => {
  console.log('Doughnut props', props);
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <ResponsivePie
        data={props.data}
        margin={margin}
        innerRadius={0.8}
        padAngle={0.7}
        cornerRadius={3}
        colors={getColors(props.data)}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]]
        }}
        animate={true}
        enableRadialLabels={false}
      />
      <div className={classes.overlay}>
        <Typography variant='h6'>General danger</Typography>
        <Typography
          variant='h3'
          style={{
            color: ratingBarColorMap[Math.round(props.total_rating)]
          }}
        >
          {props.total_rating}/10
        </Typography>
      </div>
    </Container>


  )

};

export default Doughnut;