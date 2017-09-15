import React, { Component } from 'react';

import Controls from './Controls';
import Board from './Board';
import Rect from './Rect';

export default class Parent extends Component {
	constructor() {
		super();
		this.state = {
			howManyRects: 0
		};
		this.addRect = this.addRect.bind(this);
		this.clearBoard = this.clearBoard.bind(this);
	}
	addRect() {
		let howMany = this.state.howManyRects + 1;
		this.setState({ howManyRects: howMany });
	}
	clearBoard() {
		this.setState({ howManyRects: 0 });
	}
	render() {
		return (
			<div>
				<Controls addRect={this.addRect} clearBoard={this.clearBoard} />
				<Board howManyRects={this.state.howManyRects} />
			</div>
		);
	}
}
