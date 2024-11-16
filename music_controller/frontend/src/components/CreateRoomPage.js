import React, {Component} from "react";
import {Button, Grid2, Typography, TextField, FormHelperText, FormControl} from "@mui/material";
import {Radio, RadioGroup, FormControlLabel} from "@mui/material";
import {Link} from "react-router-dom";
import {Collapse} from "@mui/material";


export default class CreateRoomPage extends(Component) {
    static defaultProps = {
        votesToSkip: 2,
        guestCanPause: true,
        update: false,
        roomCode: null,
        updateCallback: () => {},
    };

    constructor(props) {
        super(props);

        this.state = {
            guestCanPause: this.props.guestCanPause,
            votesToSkip: this.props.votesToSkip,
            errorMsg: "",
            successMsg: "",
        };

        this.handleCreateRoomButtonPressed = this.handleCreateRoomButtonPressed.bind(this);
        this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
        this.handleVotesChange = this.handleVotesChange.bind(this);
        this.renderUpdateButtons = this.renderUpdateButtons.bind(this);
        this.renderCreateButtons = this.renderCreateButtons.bind(this);
        this.handleUpdateButtonPressed = this.handleUpdateButtonPressed.bind(this);
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

    handleUpdateButtonPressed() {
        const requestOps = {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause,
                code: this.props.roomCode
            })
        };
        fetch("/api/update-room/", requestOps).then((response) => {
            if (response.ok) {
                this.setState({
                    successMsg: "Room updated successfully"
                })
            } else {
                this.setState({
                    errorMsg: "Error updating room..."
                })
            }
            this.props.updateCallback()
        })

    }

    renderCreateButtons() {
        return (
            <Grid2 container spacing={1} direction="column" justifyContent="center" alignItems="center" >
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
            </Grid2>)
    }

    renderUpdateButtons() {
        {
        return (
            <Grid2 container spacing={1} direction="column">
            <Grid2 item xs={12}>
            <Button color="primary" variant="contained" onClick={this.handleUpdateButtonPressed}>
                Update Room
            </Button>
        </Grid2>
            </Grid2>)
    }
    }

    render() {
        const title = this.props.update ? "Update Room" : "Create Room";

       return (
    <Grid2
        container
        direction="column"
        spacing={1}
        alignItems="center" // Horizontal centering
        justifyContent="center" // Vertical centering
       // style={{ minHeight: "90vh", minWidth: "100vw" }} // Full height container
    >
        <Grid2 item xs={12}>
            <Collapse in={this.state.errorMsg !== "" || this.state.successMsg !== ""}>
                {this.state.successMsg}
            </Collapse>
        </Grid2>
        <Grid2 item xs={12}>
            <Typography component="h4" variant="h4" align="center">
                {title}
            </Typography>
        </Grid2>
        <Grid2 item xs={12}>
            <FormControl component="fieldset">
                <FormHelperText style={{ textAlign: 'center' }}> Guest Control of Playback State </FormHelperText>
                <RadioGroup row defaultValue={this.props.guestCanPause.toString()} onChange={this.handleGuestCanPauseChange}>
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
                           defaultValue={this.state.votesToSkip}
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
        {this.props.update ? this.renderUpdateButtons() : this.renderCreateButtons()}
    </Grid2>
);
    }
}
