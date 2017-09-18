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
			layoutList: null, // to render options list
			showing: true, // to clear rects
			loadingSave: false, // loading check
			arrayOfRects: []
		};

		this.addRect = this.addRect.bind(this);
		this.populateSavedLayouts = this.populateSavedLayouts.bind(this);
		this.deleteSavedLayout = this.deleteSavedLayout.bind(this);
		this.clearBoard = this.clearBoard.bind(this);
		this.handleSavedLayout = this.handleSavedLayout.bind(this);
		this.handleDeleteRect = this.handleDeleteRect.bind(this);
	}

	componentWillMount() {
		this.populateSavedLayouts();
	}

	addRect() {
		let array = this.state.arrayOfRects;
		array.push({
			id: array.length++,
			x: 0,
			y: 0,
			width: 200,
			height: 100
		});
		this.setState({ arrayOfRects: array, showing: true });
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
		this.setState({ arrayOfRects: [], showing: false, loadingSave: false });
	}

	handleSavedLayout(array) {
		this.clearBoard();

		setTimeout(() => {
			this.setState({
				arrayOfRects: array,
				showing: true,
				loadingSave: true
			});
		}, 50);
	}

	handleDeleteRect(id) {
		let array = [...this.state.arrayOfRects];
		let newArray = array.splice(id, 1);
		console.log(newArray);
		this.setState({ arrayOfRects: newArray });
	}

	render() {
		return (
			<div className="container-fluid">
				<nav className="navbar navbar-default">
					<h1>Create-A-Layout</h1>
				</nav>
				<Controls
					addRect={this.addRect}
					clearBoard={this.clearBoard}
					deleteSavedLayout={this.deleteSavedLayout}
					populateSavedLayouts={this.populateSavedLayouts}
					layoutList={this.state.layoutList}
					handleSavedLayout={this.handleSavedLayout}
				/>
				<Board
					showing={this.state.showing}
					arrayOfRects={this.state.arrayOfRects}
					handleDeleteRect={this.handleDeleteRect}
				/>
			</div>
		);
	}
}
