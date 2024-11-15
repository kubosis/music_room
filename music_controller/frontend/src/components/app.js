import React, {Component} from "react";
import {createRoot } from "react-dom";
import HomePage from "./HomePage";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <HomePage />
            </div>
                );
    }
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
