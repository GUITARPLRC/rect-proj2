import React, { Component } from 'react';

import Rnd from 'react-rnd'; // resize and drag lib

/*------------------------
/
/	COMPONENT
/
/-------------------------
*/

export default class Rect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			color: null,
			x: 0,
			y: 0,
			width: 200,
			height: 100
		};

		this.handleSingleClick = this.handleSingleClick.bind(this);
		this.handleDoubleClick = this.handleDoubleClick.bind(this);
	}

	componentWillMount() {
		if (this.props.rect.x) {
			let saved = this.props.rect;
			this.setState({
				color: saved.color,
				x: saved.x,
				y: saved.y,
				width: saved.width,
				height: saved.height
			});
		}
	}

	componentDidMount() {
		if (this.props.rect.bgColor) {
			this.setState({ color: this.props.rect.bgColor });
		} else {
			this.handleSingleClick(); // set color of rects if not loading saved
		}
	}

	handleSingleClick() {
		let color = this.props.pickColor();

		this.setState({ color });
	}

	handleDoubleClick(obj) {
		this.props.handleDeleteRect(obj);
	}

	render() {
		return (
			<div
				onClick={this.handleSingleClick}
				onDoubleClick={() => this.handleDoubleClick(this)}>
				<Rnd
					default={{
						x: this.state.x,
						y: this.state.y,
						width: this.state.width,
						height: this.state.height
					}}
					style={{
						backgroundColor: this.state.color,
						border: '1px solid #000'
					}}
				/>
			</div>
		);
	}
}
