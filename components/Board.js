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
		let howMany = this.props.howManyRects;

		for (let i = 0; i < howMany; i++) {
			{
				this.props.savedArray
					? list.push(
							<Rect
								key={i}
								pickColor={this.pickColor}
								showing={this.props.showing}
								howManyRects={this.props.howManyRects}
								handleHowManyRects={this.props.handleHowManyRects}
								savedArray={this.props.savedArray[i]}
							/>
						)
					: list.push(
							<Rect
								key={i}
								pickColor={this.pickColor}
								showing={this.props.showing}
								howManyRects={this.props.howManyRects}
								handleHowManyRects={this.props.handleHowManyRects}
							/>
						);
			}
		}
		return (
			<div className="col-md-10" id="board">
				{list}
			</div>
		);
	}
}
