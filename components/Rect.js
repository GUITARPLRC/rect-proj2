import React, { Component } from 'react';

export default class Rect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			color: null
		};
	}
	componentWillMount() {
		let color = this.props.pickColor();
		this.setState({ color });
	}

	render() {
		return (
			<div
				className="rect"
				style={{
					backgroundColor: this.state.color,
					border: '1px solid #000',
					height: 100,
					width: 200
				}}
			/>
		);
	}
}
