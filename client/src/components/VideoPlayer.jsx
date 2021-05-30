import React, { useContext } from 'react';
import { Grid, Typography, Paper, makeStyles , Button} from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic';
import { SocketContext } from '../Context';
import VideocamIcon from '@material-ui/icons/Videocam';
import { Videocam } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
  video: {
    width: '550px',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
  },
}));

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call, muteVideo, muteAudio } = useContext(SocketContext);
  const classes = useStyles();

  return (
    <Grid container className={classes.gridContainer}>
      {stream && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>
            <video playsInline muted ref={myVideo} autoPlay className={classes.video} />
          </Grid>
        </Paper>
      )}
      {callAccepted && !callEnded && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
            <video playsInline ref={userVideo} autoPlay className={classes.video} />
            <div style={{width:'fit-content'}}>
            <Button variant="contained" color="secondary" style={{width:'50%', marginRight:'2px'}} startIcon={<Videocam fontSize="large" />} fullWidth onClick={muteVideo} className={classes.margin}>
                       Mute
                     </Button>

                     <Button variant="contained" color="secondary" style={{width:'50%'}} startIcon={<MicIcon fontSize="large" />} fullWidth onClick={muteAudio} className={classes.margin}>
                       Mute
                     </Button>
                     </div>
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;