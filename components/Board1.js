import React, { Component } from 'react';

import Rect from './Rect1';

export default class Board extends Component {
	render() {
		let array = this.props.arrayOfRects;
		let list = array.map(each => <div key={each.key}>{each}</div>);

		return (
			<div className="col-md-10" id="board">
				{list}
			</div>
		);
	}
}
