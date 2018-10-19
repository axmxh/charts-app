import React from 'react';
import {render} from 'react-dom';
import './css/style.css';
import App from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';



window.React = React
render(
    <Router basename={process.env.PUBLIC_URL}>
        <App />
    </Router>,
    document.getElementById("react-container")
)
