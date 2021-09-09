import React from 'react';
import classes from './InDevelopment.module.css';
import CircularProgress from '@material-ui/core/CircularProgress';

const InDevelopment = () => {

    const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 600);

    return () => {
      clearInterval(timer);
    };
  }, []);
    
    return (
        <div className={classes.root}>
            <div className={classes.label}>בפיתוח, אנחנו עובדים על זה..</div>
            <CircularProgress
                size='250px'
                variant="determinate"
                value={progress}
            />
            {/* <CircularProgress color="secondary" /> */}
        </div>
    );
}

export default InDevelopment;