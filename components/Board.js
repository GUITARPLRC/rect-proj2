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
			prevColor: null, // check for non duplicates
			savedArray: null
		};

		this.pickColor = this.pickColor.bind(this);
	}

	componentWillMount() {
		if (this.props.savedArray) {
			this.setState({ savedArray: this.props.savedArray });
		}
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
		let howMany = this.props.howManyRects;

		for (let i = 0; i < howMany; i++) {
			{
				this.state.savedArray
					? list.push(
							<Rect
								key={i}
								pickColor={this.pickColor}
								showing={this.props.showing}
								savedArray={savedArray[i]}
							/>
						)
					: list.push(
							<Rect
								key={i}
								pickColor={this.pickColor}
								showing={this.props.showing}
							/>
						);
			}
		}
		return <div id="board">{list}</div>;
	}
}
