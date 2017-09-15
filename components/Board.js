import React, { Component } from 'react';

import Rect from './Rect';

export default class Board extends Component {
	constructor(props) {
		super(props);

		this.deleteRect = this.deleteRect.bind(this);
	}

	deleteRect() {
		if (this.props.selectedOption === 'delete') {
			return false;
		}
	}

	render() {
		let list = [];
		for (let i = 0; i < this.props.howManyRects; i++) {
			list.push(
				<Rect
					number={i}
					key={i}
					pickColor={this.props.pickColor}
					deleteRect={this.deleteRect}
				/>
			);
		}
		return <div>{list}</div>;
	}
}
