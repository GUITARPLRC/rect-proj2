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
		this.updateSize = this.updateSize.bind(this);
		this.updateLocation = this.updateLocation.bind(this);
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
		localStorage.setItem(
			'arrayOfRects',
			JSON.stringify(this.state.arrayOfRects)
		);
	}

	loadLayout() {
		let layout = JSON.parse(localStorage.getItem('arrayOfRects'));
		let arrayOfRects = [];
		for (let i = 0; i < layout.length; i++) {
			arrayOfRects.push(
				<Rect
					key={Number(layout[i].key)}
					id={Number(layout[i].key)}
					deleteRect={this.deleteRect}
				/>
			);
		}
		this.setState({ arrayOfRects });
	}

	updateSize(w, h, obj) {
		let arrayOfRects = [...this.state.arrayOfRects];
		for (let i = 0; i < arrayOfRects.length; i++) {
			if (arrayOfRects[i].key == obj.props.id) {
				arrayOfRects[i].props.width = w;
				arrayOfRects[i].props.height = h;
				break;
			}
		}
		this.setState({ arrayOfRects });
	}

	updateLocation(w, h, obj) {
		let arrayOfRects = [...this.state.arrayOfRects];
		for (let i = 0; i < arrayOfRects.length; i++) {
			if (arrayOfRects[i].key == obj.props.id) {
				arrayOfRects[i].props.width = w;
				arrayOfRects[i].props.height = h;
				break;
			}
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
