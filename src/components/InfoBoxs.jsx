import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import "./InfoBoxs.css";
export default function InfoBoxs({
  isRed,
  active,
  title,
  cases,
  total,
  ...props
}) {
  return (
    <Card
      className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      }`}
      onClick={props.onClick}
    >
      <CardContent>
        <Typography className="card_title" color="textSecondary">
          {title}
        </Typography>
        <Typography
          className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}
        >
          {cases}
        </Typography>
        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}
