import React, { Component } from 'react';

import Board from './Board1';
import Rect from './Rect1';

export default class Main extends Component {
	constructor() {
		super();
		this.state = {
			arrayOfRects: []
		};

		this.addRect = this.addRect.bind(this);
		this.deleteRect = this.deleteRect.bind(this);
		this.saveLayout = this.saveLayout.bind(this);
		this.loadLayout = this.loadLayout.bind(this);
	}

	addRect() {
		let arrayOfRects = [...this.state.arrayOfRects];
		let id = new Date().getTime();
		arrayOfRects.push(
			<Rect
				key={id}
				id={id}
				deleteRect={this.deleteRect}
				updateSize={this.updateSize}
				updateLocation={this.updateLocation}
				x={0}
				y={0}
				z={0}
				width={200}
				height={100}
			/>
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

	saveLayout() {
		let board = document.querySelector('#board');
		let elements = []; // to store layout rect props for localStorage

		if (board.children) {
			for (let i = 0; i < board.children.length; i++) {
				let x1 = board.children[i].firstChild.firstChild.style.transform.indexOf('(');
				let x2 = board.children[i].firstChild.firstChild.style.transform.indexOf(',');

				// to get translateY
				let y1 = board.children[i].firstChild.firstChild.style.transform.indexOf(',');
				let y2 = board.children[i].firstChild.firstChild.style.transform.indexOf(')');

				let z = Number(board.children[i].firstChild.firstChild.style.zIndex);

				let id = this.state.arrayOfRects[i].key;

				elements.push({
					id,
					width: board.children[i].firstChild.firstChild.style.width,
					height: board.children[i].firstChild.firstChild.style.height,
					x: parseInt(board.children[i].firstChild.firstChild.style.transform.slice(x1 + 1, x2 - 2)),
					y: parseInt(board.children[i].firstChild.firstChild.style.transform.slice(y1 + 1, y2 - 1)),
					bgColor: board.children[i].firstChild.firstChild.style.backgroundColor,
					z
				});
			}
		}
		localStorage.setItem('arrayOfRects', JSON.stringify(elements));
	}

	loadLayout() {
		let layout = JSON.parse(localStorage.getItem('arrayOfRects'));
		let arrayOfRects = [];
		for (let i = 0; i < layout.length; i++) {
			arrayOfRects.push(
				<Rect
					key={layout[i].id}
					id={layout[i].id}
					deleteRect={this.deleteRect}
					updateSize={this.updateSize}
					updateLocation={this.updateLocation}
					x={layout[i].x}
					y={layout[i].y}
					z={layout[i].z}
					width={layout[i].width}
					height={layout[i].height}
					bgColor={layout[i].bgColor}
				/>
			);
		}
		this.setState({ arrayOfRects });
	}

	render() {
		return (
			<div>
				<button onClick={this.addRect}>Add</button>
				<button onClick={this.saveLayout}>Save Layout</button>
				<button onClick={this.loadLayout}>Load Layout</button>
				<Board
					deleteRect={this.deleteRect}
					arrayOfRects={this.state.arrayOfRects}
					updateSize={this.updateSize}
					updateLocation={this.updateLocation}
				/>
			</div>
		);
	}
}
