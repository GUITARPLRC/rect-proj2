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
		let arrayOfRects = [...this.state.arrayOfRects];

		let id = new Date().getTime();

		let newRect = {
			id,
			x: 0,
			y: 0,
			width: 200,
			height: 100
		};
		arrayOfRects.push(newRect);
		this.setState({ arrayOfRects });
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
		this.setState({ arrayOfRects: [] });
	}

	handleSavedLayout(array) {
		this.clearBoard();

		setTimeout(() => {
			this.setState({
				arrayOfRects: array
			});
		}, 50);
	}

	handleDeleteRect(obj) {
		let arrayOfRects = [...this.state.arrayOfRects];
		for (let i = 0; i < arrayOfRects.length; i++) {
			if (arrayOfRects[i].id == obj.props.rect.id) {
				arrayOfRects.splice(i, 1);
			}
		}
		this.setState({ arrayOfRects });
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
					arrayOfRects={this.state.arrayOfRects}
					handleDeleteRect={this.handleDeleteRect}
				/>
			</div>
		);
	}
}
