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
			prevColor: null
		};

		this.addRect = this.addRect.bind(this);
		this.clearBoard = this.clearBoard.bind(this);
		this.pickColor = this.pickColor.bind(this);
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

	render() {
		return (
			<div style={{ display: 'flex', padding: '20px' }}>
				<Controls addRect={this.addRect} clearBoard={this.clearBoard} />
				<Board
					howManyRects={this.state.howManyRects}
					pickColor={this.pickColor}
					chooseNewColor={this.state.chooseNewColor}
				/>
			</div>
		);
	}
}
