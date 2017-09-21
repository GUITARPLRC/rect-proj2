import React, { Component } from 'react';

import Rect from './Rect';

/*------------------------
/
/	COMPONENT
/
/-------------------------
*/

export default class Board extends Component {
	constructor() {
		super();
		this.state = {
			colors: ['#ddd', '#000', '#777'],
			prevColor: null // check for non duplicates
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
		let list = [];
		let length = this.props.arrayOfRects.length || 0;

		for (let i = 0; i < length; i++) {
			list.push(
				<Rect
					key={i}
					pickColor={this.pickColor}
					rect={this.props.arrayOfRects[i]}
					handleDeleteRect={this.props.handleDeleteRect}
				/>
			);
		}
		return (
			<div className="col-md-10" id="board">
				{list}
			</div>
		);
	}
}
