import React, {Component} from "react";
import {Button, Grid2, Typography, TextField, FormHelperText, FormControl} from "@mui/material";
import {Radio, RadioGroup, FormControlLabel} from "@mui/material";
import {Link} from "react-router-dom";


export default class CreateRoomPage extends(Component) {
    defaultVotes = 2

    constructor(props) {
        super(props);
    }

    render() {
       return (
    <Grid2
        container
        direction="column"
        spacing={2}
        alignItems="center" // Horizontal centering
        justifyContent="center" // Vertical centering
        style={{ minHeight: "100vh", minWidth: "100vw" }} // Full height container
    >
        <Grid2 item xs={12}>
            <Typography component="h4" variant="h4" align="center">
                Create Room
            </Typography>
        </Grid2>
        <Grid2 item xs={12}>
            <FormControl component="fieldset">
                <FormHelperText>
                    <div style={{ textAlign: 'center' }}>
                        Guest Control of Playback State
                    </div>
                </FormHelperText>
                <RadioGroup row defaultValue="true">
                    <FormControlLabel value="true" control={<Radio color="primary"></Radio>} label="Play/Pause" labelPlacement="bottom">
                    </FormControlLabel>

                    <FormControlLabel value="false" control={<Radio color="secondary"></Radio>} label="No control" labelPlacement="bottom">
                    </FormControlLabel>
                </RadioGroup>
            </FormControl>
        </Grid2>
        <Grid2 item xs={12}>
            <FormControl>
                <TextField required={true}
                           type="number"
                           defaultValue={this.defaultVotes}
                           inputProps={{
                               min: 1,
                               style: {textAlign: "center"},
                           }}
                />
                <FormHelperText>
                    <div align="center">Votes to skip song</div>
                </FormHelperText>

            </FormControl>
        </Grid2>
        <Grid2 item xs={12}>
            <Button color="primary" variant="contained">
                Create A Music Room
            </Button>
        </Grid2>
        <Grid2 item xs={12}>
            <Button color="secondary" variant="contained" to="/" component={Link}>
                    Back
            </Button>
        </Grid2>
    </Grid2>
);
    }
}
