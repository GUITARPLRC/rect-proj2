import React, { Component } from 'react';

export default class Rect extends Component {
	constructor() {
		super();
		this.state = {
			colors: ['#ccc', '#333', '#777']
		};
		this.pickColor = this.pickColor.bind(this);
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
					border: '1px solid #000',
					height: 100,
					width: 200
				}}
			/>
		);
	}
}
