import React, { Component } from 'react';

export default class Controls extends Component {
	render() {
		return (
			<div>
				<button onClick={this.props.addRect}>Add</button>
				<button onClick={this.props.saveLayout}>Save Layout</button>
				<button onClick={this.props.loadLayout}>Load Layout</button>
			</div>
		);
	}
}
