import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";
import {Grid2, Button, ButtonGroup, Typography} from "@mui/material";

import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room"

export default class HomePage extends(Component) {
    constructor(props) {
        super(props);
        this.state = {
            roomCode: null,
        }
        this.componentDidMount = this.componentDidMount.bind(this)
    }


    async componentDidMount() {
        fetch('api/user-in-room/').then((response) =>
            response.json()
        ).then((data) => {
            this.setState({
                roomCode: data.code
            })
        });
    }

    renderHomePage() {
        return (
            <Grid2 container
                   direction="column"
                   spacing={3}
                   alignItems="center" // Horizontal centering
                   justifyContent="center" // Vertical centering
                   style={{ minHeight: "100vh", minWidth: "100vw" }}
            >

                <Grid2 item xd={12} align="center">
                    <Typography variant="h3" component="h3">
                        Pass the AUX
                    </Typography>
                </Grid2>
                <Grid2 item xd={12} align="center">
                    <ButtonGroup disableElevation variant={"contained"} color={"primary"}>
                        <Button color="primary" to="/join" component={Link}>
                            Join Room
                        </Button>
                        <Button color="secondary" to="/create" component={Link}>
                            Create Room
                        </Button>
                    </ButtonGroup>
                </Grid2>
            </Grid2>
        )
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' render={() => {
                        return this.state.roomCode ? (<Redirect to={`/room/${this.state.roomCode}`}/>) : this.renderHomePage()
                    }}/>
                    <Route path='/join' component={RoomJoinPage}></Route>
                    <Route path='/create' component={CreateRoomPage}></Route>
                    <Route path='/room/:roomCode' component={Room}></Route>
                </Switch>
            </Router>
        );
    }
}
