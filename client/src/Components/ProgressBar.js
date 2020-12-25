import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from '@material-ui/core/LinearProgress';


export default function LinearIndeterminate() {
const StyledLinearProgress = withStyles({
    colorPrimary: {
        backgroundColor: "#1F1F1F"
    },
    barColorPrimary: {
        backgroundColor: "red"
    }
})(LinearProgress);
  return (
    <div>
      <StyledLinearProgress style={{ height : '2px' }}/>
    </div>
  );
}
