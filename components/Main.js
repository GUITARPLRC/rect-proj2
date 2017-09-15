import React, { Component } from 'react';

import Controls from './Controls';
import Board from './Board';
import Rect from './Rect';

/*------------------------
/
/	COMPONENT
/
/-------------------------
*/
export default class Main extends Component {
	constructor() {
		super();
		this.state = {
			howManyRects: 0 /* so app knows how many rects to render */,
			layoutList: null /* to render options list */
		};

		this.addRect = this.addRect.bind(this);
		this.handleHowManyRects = this.handleHowManyRects.bind(this);
		this.populateSavedLayouts = this.populateSavedLayouts.bind(this);
		this.deleteSavedLayout = this.deleteSavedLayout.bind(this);
	}

	componentWillMount() {
		this.populateSavedLayouts();
	}

	addRect() {
		let howMany = this.state.howManyRects + 1;

		this.setState({ howManyRects: howMany });
	}

	// used to clear board in Control Component
	handleHowManyRects(number) {
		this.setState({ howManyRects: number });
	}

	populateSavedLayouts() {
		let saveNameList = [];

		if (localStorage && localStorage.length > 0) {
			for (let key in localStorage) {
				if (key.match(/\layout$/)) {
					let name = key.slice(0, -7);
					saveNameList.push(name);
				}
			}
		}

		this.setState({ layoutList: saveNameList });
	}

	deleteSavedLayout(name) {
		if (name === '-- Select Saved Layout --' || !name) {
			return;
		}

		let layoutName = `${name} layout`;

		localStorage.removeItem(layoutName);

		while (document.querySelector('#board').hasChildNodes()) {
			document
				.querySelector('#board')
				.removeChild(document.querySelector('#board').firstChild);
		}

		this.populateSavedLayouts();
	}

	render() {
		return (
			<div style={{ display: 'flex', padding: '20px' }}>
				<Controls
					addRect={this.addRect}
					clearBoard={this.clearBoard}
					layoutList={this.state.layoutList}
					handleLayoutChange={this.handleLayoutChange}
					deleteSavedLayout={this.deleteSavedLayout}
					populateSavedLayouts={this.populateSavedLayouts}
					howManyRects={this.props.howManyRects}
					handleHowManyRects={this.handleHowManyRects}
				/>
				<Board howManyRects={this.state.howManyRects} />
			</div>
		);
	}
}
