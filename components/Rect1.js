import React, { Component } from 'react';

import Rnd from 'react-rnd';

export default class Rect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bgColor: null,
			prevColor: null,
			zIndex: 1
		};

		this.changeColor = this.changeColor.bind(this);
		this.updateSize = this.updateSize.bind(this);
		this.updateLocation = this.updateLocation.bind(this);
	}

	componentDidMount() {
		if (this.props.x) {
			this.setState({
				x: this.props.x,
				y: this.props.y,
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
			zIndex: this.state.zIndex + 1
		});
	}

	updateSize(w, h, obj) {
		this.props.updateSize(w, h, obj);
	}

	updateLocation(x, y, obj) {
		this.props.updateLocation(x, y, obj);
	}

	render() {
		return (
			<div
				onClick={this.changeColor}
				onDoubleClick={() => this.props.deleteRect(this)}>
				<Rnd
					default={{
						x: 0,
						y: 0,
						width: 200,
						height: 100
					}}
					onDragStop={(e, direction) => {
						this.updateLocation(direction.x, direction.y, this);
					}}
					onResize={(e, direction, ref) => {
						this.updateSize(ref.offsetWidth, ref.offsetHeight, this);
					}}
					style={{
						backgroundColor: this.state.bgColor,
						border: '1px solid black',
						zIndex: this.state.zIndex
					}}
				/>
			</div>
		);
	}
}
