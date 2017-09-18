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
			showing: true,
			x: 0,
			y: 0,
			width: 200,
			height: 100
		};

		this.handleSingleClick = this.handleSingleClick.bind(this);
		this.handleDoubleClick = this.handleDoubleClick.bind(this);
	}

	componentWillMount() {
		if (this.props.rect) {
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
		if (this.props.rect) {
			this.setState({ color: this.props.rect.bgColor });
			return;
		}

		this.handleSingleClick(); // set color of rects if not loading saved
	}

	handleSingleClick() {
		let color = this.props.pickColor();

		this.setState({ color });
	}

	handleDoubleClick(id) {
		this.setState({ showing: false });
		this.props.handleDeleteRect(id);
	}

	render() {
		return (
			<div
				onClick={this.handleSingleClick}
				onDoubleClick={() => this.handleDoubleClick(this.props.id)}>
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
