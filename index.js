import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Main from './components/Main1';

class App extends Component {
	render() {
		return <Main />;
	}
}

ReactDOM.render(<App />, document.querySelector('.app'));
