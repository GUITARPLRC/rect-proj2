import React, { Component } from 'react';

import Rect from './Rect';

export default class Board extends Component {
	render() {
		let list = [];
		for (let i = 0; i < this.props.howManyRects; i++) {
			list.push(<Rect number={i} key={i} />);
		}
		return <div>{list}</div>;
	}
}
