import React, {Component} from "react";
import {Grid2, Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import CreateRoomPage from "./CreateRoomPage";

export default class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false,
            showSettings: false,
        }
        this.roomCode = this.props.match.params.roomCode
        this.getRoomDetails()
        this.leaveButtonPressed = this.leaveButtonPressed.bind(this)
        this.updateShowSettings = this.updateShowSettings.bind(this)
        this.renderSettings = this.renderSettings.bind(this)
        this.getRoomDetails = this.getRoomDetails.bind(this)
    }

    getRoomDetails() {
        fetch('/api/get-room/' + '?code=' + this.roomCode).then((response) => {
            if (!response.ok) {
                this.props.leaveRoomCallback()
                this.props.history.push("/")
            }
            return response.json()
        }).then((data) => {
            this.setState({
                votesToSkip: data.votes_to_skip,
                guestCanPause: data.guest_can_pause,
                isHost: data.is_host,
            });
        })
    }

    leaveButtonPressed() {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        };
        fetch("/api/leave-room/", requestOptions).then((_response) => {
          this.props.leaveRoomCallback();
          this.props.history.push("/");
        });
    }

    updateShowSettings(value) {
        this.setState({
            showSettings: value
        })
    }

    renderSettingsButton() {
        return (
            <Grid2 item xs={12} align="center">
                <Button variant="contained" color="primary" onClick={() => this.updateShowSettings(true)}>
                    Settings
                </Button>
            </Grid2>
        )
    }

    renderSettings() {
        return (<Grid2 container spacing={1} direction="column">
            <Grid2 item xs={12} align="center">
                <CreateRoomPage update={true}
                                votesToSkip={this.state.votesToSkip}
                                guestCanPause={this.state.guestCanPause}
                                roomCode={this.roomCode}>
                                updateCallback={this.getRoomDetails}
                </CreateRoomPage>

            </Grid2>
            <Grid2 item xs={12} align="center">
                <Button variant="contained" color="secondary" onClick={() => this.updateShowSettings(false)}>
                    Close
                </Button>
            </Grid2>

        </Grid2>)
    }

    render() {
        if (this.state.showSettings) {
            return this.renderSettings()
        }

        return (
            <Grid2 container spacing={1} direction="column">
                <Grid2 item xs={12} align="center">
                    <Typography variant="h4" component="h4">
                        Code: {this.roomCode}
                    </Typography>
                </Grid2>
                <Grid2 item xs={12} align="center">
                    <Typography variant="h6" component="h6">
                        Votes to skip: {this.state.votesToSkip.toString()}
                    </Typography>
                </Grid2>
                <Grid2 item xs={12} align="center">
                    <Typography variant="h6" component="h6">
                        Guests can pause: {this.state.guestCanPause.toString()}
                    </Typography>
                </Grid2>
                <Grid2 item xs={12} align="center">
                    <Typography variant="h6" component="h6">
                        Host: {this.state.isHost.toString()}
                    </Typography>
                </Grid2>

                {this.state.isHost ? this.renderSettingsButton() : null}

                <Grid2 item xs={12} align="center">
                    <Button color="secondary" variant="contained" onClick={this.leaveButtonPressed}>
                            Leave Room
                    </Button>
                </Grid2>
            </Grid2>

);
    }
}
