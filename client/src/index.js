import React from 'react';
import ReactDOM from 'react-dom';

import { registerSW } from './service-worker';

import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

registerSW();
