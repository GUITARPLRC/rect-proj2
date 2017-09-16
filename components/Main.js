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
			howManyRects: 0, // so app knows how many rects to render
			layoutList: null, // to render options list
			showing: true, // to clear rects
			loadingSave: false, // to check if loading
			savedArray: null
		};

		this.addRect = this.addRect.bind(this);
		this.handleHowManyRects = this.handleHowManyRects.bind(this);
		this.populateSavedLayouts = this.populateSavedLayouts.bind(this);
		this.deleteSavedLayout = this.deleteSavedLayout.bind(this);
		this.clearBoard = this.clearBoard.bind(this);
		this.handleSavedLayout = this.handleSavedLayout.bind(this);
	}

	componentWillMount() {
		this.populateSavedLayouts();
	}

	addRect() {
		let howMany = this.state.howManyRects + 1;

		this.setState({ howManyRects: howMany, showing: true });
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

		this.clearBoard();

		this.populateSavedLayouts();
	}

	clearBoard() {
		this.setState({ showing: false, loadingSave: false });
	}

	handleSavedLayout(array) {
		this.setState({
			howMany: array.length,
			showing: true,
			loadingSave: true,
			savedArray: array
		});
	}

	render() {
		return (
			<div style={{ display: 'flex', padding: '20px' }}>
				<Controls
					addRect={this.addRect}
					clearBoard={this.clearBoard}
					deleteSavedLayout={this.deleteSavedLayout}
					populateSavedLayouts={this.populateSavedLayouts}
					handleHowManyRects={this.handleHowManyRects}
					layoutList={this.state.layoutList}
					howManyRects={this.state.howManyRects}
					handleSavedLayout={this.handleSavedLayout}
				/>
				{this.state.loadingSave ? (
					<Board
						howManyRects={this.state.howManyRects}
						showing={this.state.showing}
						savedArray={this.state.savedArray}
					/>
				) : (
					<Board
						howManyRects={this.state.howManyRects}
						showing={this.state.showing}
					/>
				)}
			</div>
		);
	}
}
