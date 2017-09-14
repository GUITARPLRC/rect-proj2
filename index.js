import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Parent from './components/Parent';

class App extends Component {
	render() {
		return <Parent />;
	}
}

ReactDOM.render(<App />, document.querySelector('.app'));
