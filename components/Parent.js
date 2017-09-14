import React, { Component } from 'react';

import Controls from './Controls';
import Board from './Board';
import Rect from './Rect';

export default class Parent extends Component {
	addRect() {
		console.log('add');
	}
	clearBoard() {
		console.log('clear');
	}
	render() {
		return (
			<div>
				<Controls addRect={this.addRect} clearBoard={this.clearBoard} />
				<Board />
			</div>
		);
	}
}
