import React, {Component} from "react";
import {createRoot } from "react-dom";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<h1>"Hi mum!"</h1>)
    }
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App tab="home" />);
