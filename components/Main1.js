import React, { Component } from 'react';

import Controls from './Controls1';
import Board from './Board1';
import Rect from './Rect1';

export default class Main extends Component {
	constructor() {
		super();
		this.state = {
			arrayOfRects: [],
			saveName: '',
			layoutList: [],
			selectedName: ''
		};

		this.addRect = this.addRect.bind(this);
		this.deleteRect = this.deleteRect.bind(this);
		this.loadLayout = this.loadLayout.bind(this);
		this.saveLayout = this.saveLayout.bind(this);
		this.clearBoard = this.clearBoard.bind(this);
		this.handleSaveName = this.handleSaveName.bind(this);
		this.populateSavedLayouts = this.populateSavedLayouts.bind(this);
		this.deleteSavedLayout = this.deleteSavedLayout.bind(this);
		this.handledSelectedLayout = this.handledSelectedLayout.bind(this);
	}

	componentDidMount() {
		this.populateSavedLayouts();
	}

	addRect() {
		let arrayOfRects = this.state.arrayOfRects;
		let id = new Date().getTime();

		arrayOfRects.push(
			<Rect key={id} id={id} x={0} y={0} z={0} width={200} height={100} deleteRect={this.deleteRect} />
		);

		this.setState({ arrayOfRects });
	}

	deleteRect(obj) {
		let arrayOfRects = [...this.state.arrayOfRects];

		for (let i = 0; i < arrayOfRects.length; i++) {
			if (arrayOfRects[i].key == obj.props.id) {
				arrayOfRects.splice(i, 1);
				break;
			}
		}

		this.setState({ arrayOfRects });
	}

	clearBoard() {
		this.setState({ arrayOfRects: [], saveName: '' });

		// reset select element to default
		let select = document.querySelector('#select');
		select.selectedIndex = 0;
	}

	saveLayout() {
		let board = document.querySelector('#board');
		let elements = []; // to store layout rect props for localStorage

		if (this.state.saveName == '-- Saved Layouts --' || this.state.saveName == '') {
			alert('Please enter an name to save the layout');
			return;
		}

		let saveName = `${this.state.saveName} layout`;

		if (board.children) {
			for (let i = 0; i < board.children.length; i++) {
				// to get translateX
				let x1 = board.children[i].firstChild.firstChild.style.transform.indexOf('(');
				let x2 = board.children[i].firstChild.firstChild.style.transform.indexOf(',');
				let x = parseInt(board.children[i].firstChild.firstChild.style.transform.slice(x1 + 1, x2 - 2));

				// to get translateY
				let y1 = board.children[i].firstChild.firstChild.style.transform.indexOf(',');
				let y2 = board.children[i].firstChild.firstChild.style.transform.indexOf(')');
				let y = parseInt(board.children[i].firstChild.firstChild.style.transform.slice(y1 + 1, y2 - 1));

				let z = Number(board.children[i].firstChild.firstChild.style.zIndex);

				let width = board.children[i].firstChild.firstChild.style.width;

				let height = board.children[i].firstChild.firstChild.style.height;

				let id = this.state.arrayOfRects[i].key;

				let bgColor = board.children[i].firstChild.firstChild.style.backgroundColor;

				elements.push({ id, width, height, x, y, z, bgColor });
			}
		}

		localStorage.setItem(saveName, JSON.stringify(elements));

		this.populateSavedLayouts();
	}

	loadLayout(layout) {
		let arrayOfRects = [];

		for (let i = 0; i < layout.length; i++) {
			arrayOfRects.push(
				<Rect
					key={layout[i].id}
					id={layout[i].id}
					x={layout[i].x}
					y={layout[i].y}
					z={layout[i].z}
					width={layout[i].width}
					height={layout[i].height}
					bgColor={layout[i].bgColor}
					deleteRect={this.deleteRect}
				/>
			);
		}

		this.setState({ arrayOfRects });
	}

	deleteSavedLayout() {
		let name = this.state.selectedName;
		if (name === '-- Saved Layouts --' || !name) {
			return;
		}

		// reset select element to default
		let select = document.querySelector('#select');
		select.selectedIndex = 0;

		// reset save name input
		this.setState({ saveName: '' });

		let layoutName = `${name} layout`;

		localStorage.removeItem(layoutName);

		this.clearBoard();

		this.populateSavedLayouts();
	}

	handleSaveName(event) {
		let value = event.target.value;
		this.setState({ saveName: value });
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

	handledSelectedLayout(event) {
		if (event.target.value === '-- Saved Layouts --') {
			this.setState({ saveName: '' });
			return;
		}

		let name = `${event.target.value} layout`;

		// get layout props from localStorage
		let array = JSON.parse(localStorage.getItem(name));

		// set controlled input saveName to help UX
		this.setState({
			saveName: event.target.value,
			selectedName: event.target.value
		});

		this.loadLayout(array);

		// reset select element to default
		let select = document.querySelector('#select');
		select.selectedIndex = 0;
	}

	render() {
		return (
			<div className="container-fluid">
				<nav style={{ padding: '0 0 0 15px' }} className="navbar navbar-inverse">
					<h1 style={{ color: '#ddd' }}>Create-A-Layout</h1>
				</nav>
				<Controls
					addRect={this.addRect}
					clearBoard={this.clearBoard}
					saveLayout={this.saveLayout}
					loadLayout={this.loadLayout}
					handleSaveName={this.handleSaveName}
					saveName={this.state.saveName}
					deleteSavedLayout={this.deleteSavedLayout}
					layoutList={this.state.layoutList}
					handledSelectedLayout={this.handledSelectedLayout}
				/>
				<Board deleteRect={this.deleteRect} arrayOfRects={this.state.arrayOfRects} />
			</div>
		);
	}
}
