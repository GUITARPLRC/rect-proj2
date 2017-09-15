import React, { Component } from 'react';

import Controls from './Controls';
import Board from './Board';
import Rect from './Rect';

export default class Parent extends Component {
	constructor() {
		super();
		this.state = {
			howManyRects: 0,
			colors: ['#ccc', '#333', '#777'],
			prevColor: null,
			canChangeColor: true,
			canDeleteRect: false
		};
		this.addRect = this.addRect.bind(this);
		this.clearBoard = this.clearBoard.bind(this);
		this.pickColor = this.pickColor.bind(this);
		this.chooseColor = this.chooseColor.bind(this);
		this.deleteRect = this.deleteRect.bind(this);
	}

	addRect() {
		let howMany = this.state.howManyRects + 1;
		this.setState({ howManyRects: howMany });
	}

	clearBoard() {
		this.setState({ howManyRects: 0 });
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

	chooseColor() {
		if (canChangeColor) {
		}
	}

	deleteRect() {
		if (canDeleteRect) {
		}
	}

	changeOptions() {
		this.setState({
			canDeleteRect: !canDeleteRect,
			canChangeColor: !canChangeColor
		});
	}

	render() {
		return (
			<div>
				<Controls
					addRect={this.addRect}
					clearBoard={this.clearBoard}
					chooseColor={this.chooseColor}
					canChangeColor={this.state.canChangeColor}
					canDeleteRect={this.state.canDeleteRect}
				/>
				<Board
					howManyRects={this.state.howManyRects}
					pickColor={this.pickColor}
					deleteRect={this.deleteRect}
				/>
			</div>
		);
	}
}
