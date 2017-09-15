import React, { Component } from 'react';

import Rnd from 'react-rnd';

export default class Rect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			color: null,
			showing: true
		};

		this.handleSingleClick = this.handleSingleClick.bind(this);
		this.handleDoubleClick = this.handleDoubleClick.bind(this);
	}

	componentWillMount() {
		let color = this.props.pickColor();
		this.setState({ color });
	}

	handleSingleClick() {
		let color = this.props.pickColor();
		this.setState({ color });
	}

	handleDoubleClick() {
		let showing = this.props.deleteRect();
		this.setState({ showing });
	}

	render() {
		return (
			<div
				onClick={this.handleSingleClick}
				onDoubleClick={this.handleDoubleClick}>
				{this.state.showing && (
					<Rnd
						className="rect"
						default={{
							x: 0,
							y: 0,
							width: 200,
							height: 100
						}}
						style={{
							backgroundColor: this.state.color,
							border: '1px solid #000'
						}}
					/>
				)}
			</div>
		);
	}
}
