import React, {Component} from "react";
import {Button, Grid2, Typography, TextField, FormHelperText, FormControl} from "@mui/material";
import {Radio, RadioGroup, FormControlLabel} from "@mui/material";
import {Link} from "react-router-dom";


export default class CreateRoomPage extends(Component) {
    defaultVotes = 2

    constructor(props) {
        super(props);

        this.state = {
            guestCanPause: true,
            votesToSkip: this.defaultVotes,
        };

        this.handleCreateRoomButtonPressed = this.handleCreateRoomButtonPressed.bind(this);
        this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
        this.handleVotesChange = this.handleVotesChange.bind(this);
    }

    handleVotesChange(e) {
        this.setState({
            votesToSkip: e.target.value
        })
    }

    handleGuestCanPauseChange(e) {
        this.setState({
            guestCanPause: e.target.value,
        })
    }

    handleCreateRoomButtonPressed() {
        const requestOps = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause
            })
        };
        fetch("/api/create-room/", requestOps).then((response) =>
            response.json()
        ).then((data) =>
            this.props.history.push('/room/' + data.code)
        );
    }

    render() {
       return (
    <Grid2
        container
        direction="column"
        spacing={1}
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
                <FormHelperText style={{ textAlign: 'center' }}> Guest Control of Playback State </FormHelperText>
                <RadioGroup row defaultValue="true" onChange={this.handleGuestCanPauseChange}>
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
                           onChange={this.handleVotesChange}
                           defaultValue={this.defaultVotes}
                           inputProps={{
                               min: 1,
                               style: {textAlign: "center"},
                           }}
                />
                <FormHelperText style={{ textAlign: 'center' }}>
                    Votes to skip song
                </FormHelperText>

            </FormControl>
        </Grid2>
        <Grid2 item xs={12}>
            <Button color="primary" variant="contained" onClick={this.handleCreateRoomButtonPressed}>
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
