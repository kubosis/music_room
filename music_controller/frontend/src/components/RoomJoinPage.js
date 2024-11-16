import React, {Component} from "react";
import { TextField, Button, Grid2, Typography } from "@mui/material";
import {Link} from "react-router-dom";

export default class RoomJoinPage extends(Component) {
    constructor(props) {
        super(props);
        this.state = {
            roomCode: "",
            error: ""
        }
        this._handleTextFieldChange = this._handleTextFieldChange.bind(this)
        this._roomButtonPressed = this._roomButtonPressed.bind(this)
    }

    render() {
        return (
            <Grid2 container
                   spacing={1}
                   direction="column"
            alignItems="center" // Horizontal centering
        justifyContent="center" // Vertical centering
        style={{ minHeight: "100vh", minWidth: "100vw" }}
            >
                <Grid2 item xs={12} align="center">
                    <Typography variant="h4" component="h4">
                        Join Room
                    </Typography>
                </Grid2>

                <Grid2 item xs={12} align="center">
                    <TextField
                        error={this.state.error}
                        label="Code"
                        placeholder="Enter a room code"
                        value={this.state.roomCode}
                        helperText={this.state.error}
                        variant="outlined"
                        onChange={this._handleTextFieldChange}
                    />
                </Grid2>

                 <Grid2 item xs={12} align="center">
                    <Button variant="contained" color="primary" onClick={this._roomButtonPressed}>
                        Enter Room
                    </Button>
                </Grid2>

                <Grid2 item xs={12} align="center">
                    <Button variant="contained" color="secondary" to="/" component={Link}>
                        Back
                    </Button>
                </Grid2>
            </Grid2>
        )
    }

    _handleTextFieldChange(e) {
        this.setState({
                roomCode: e.target.value,
            }
        )
    }

    _roomButtonPressed() {
        const requestOps = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                code:   this.state.roomCode
            })
        };
        fetch('/api/join-room/', requestOps).then((response) => {
            if (response.ok) {
                this.props.history.push(`/room/${this.state.roomCode}`)
            } else {
                this.setState({error: "Room not found"})
            }
        }).catch((error) => console.log(error));
    }
}
