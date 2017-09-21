import React, { Component } from 'react';

import Rnd from 'react-rnd';

export default class Rect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bgColor: null,
			prevColor: null,
			width: 200,
			height: 100,
			x: 0,
			y: 0,
			z: 1
		};

		this.changeColor = this.changeColor.bind(this);
	}

	componentDidMount() {
		if (this.props.x) {
			this.setState({
				x: this.props.x,
				y: this.props.y,
				z: this.props.z,
				width: this.props.width,
				height: this.props.height,
				bgColor: this.props.bgColor
			});
		} else {
			this.changeColor();
		}
	}

	changeColor() {
		let colors = ['#ddd', '#555', '#999'];
		let index = Math.floor(Math.random() * 3);

		if (index == this.state.prevColor) {
			this.changeColor();
		}

		let color = colors[index];

		this.setState({
			bgColor: color,
			prevColor: index,
			z: this.state.z + 1
		});
	}

	render() {
		return (
			<div
				onClick={this.changeColor}
				onDoubleClick={() => this.props.deleteRect(this)}>
				<Rnd
					default={{
						x: this.state.x,
						y: this.state.y,
						width: this.state.width,
						height: this.state.height
					}}
					style={{
						backgroundColor: this.state.bgColor,
						border: '1px solid black',
						zIndex: this.state.z
					}}
				/>
			</div>
		);
	}
}
