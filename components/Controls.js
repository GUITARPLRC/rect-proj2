import React, { Component } from 'react';

export default class Controls extends Component {
	render() {
		return (
			<div id="controls">
				<button onClick={this.props.addRect} className="btn btn-primary">
					Add Rectangle
				</button>
				<button onClick={this.props.clearBoard} className="btn btn-warning">
					Clear Board
				</button>
				<label>
					<input id="changeColor" type="radio" />Change Color
				</label>
				<label>
					<input id="deleteRect" type="radio" />Delete Rectangle
				</label>
				<input
					id="layoutName"
					type="text"
					maxLength="20"
					placeholder="Enter layout name (max: 20)"
				/>
				<button id="save" className="btn btn-success">
					Save Layout
				</button>
				<select>
					<option>-- Select Saved Layout --</option>
				</select>
				<button id="deleteLayout" className="btn btn-danger">
					Delete Selected Layout
				</button>
			</div>
		);
	}
}
