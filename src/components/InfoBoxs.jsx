import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

export default function InfoBoxs({ title, cases, total }) {
  return (
    <Card>
      <CardContent>
        <Typography className="card_title" color="textSecondary">
          {title}
        </Typography>
        <Typography className="card_cases" color="textPrimary">
          {cases}
        </Typography>
        <Typography className="card_total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}
