import React, { Component } from 'react';

export default class Rect extends Component {
	constructor() {
		super();
		this.state = {
			colors: ['#ccc', '#333', '#777'],
			color: null
		};
		this.pickColor = this.pickColor.bind(this);
	}

	componentWillMount() {
		let color = this.pickColor();
		this.setState({ color });
	}

	pickColor() {
		let pickColor = Math.floor(Math.random() * this.state.colors.length);
		if (pickColor == this.state.prevColor) {
			return this.pickColor();
		} else {
			this.setState({ prevColor: pickColor });
			return this.state.colors[pickColor];
		}
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
