import React, { Component } from 'react';

let controlStyles = {
	backgroundColor: '#ddd',
	display: 'flex',
	height: 500,
	maxHeight: 500,
	flexDirection: 'column',
	margin: '0 10px 0 0',
	padding: '0 20px',
	width: 350
};

let buttonStyle = {
	margin: '20px auto',
	width: '60%'
};

let fieldStyle = {
	padding: 5
};

export default class Controls extends Component {
	render() {
		return (
			<div id="controls" style={controlStyles}>
				<button
					onClick={this.props.addRect}
					className="btn btn-primary"
					style={buttonStyle}>
					Add Rectangle
				</button>

				<button
					onClick={this.props.clearBoard}
					className="btn btn-warning"
					style={buttonStyle}>
					Clear Board
				</button>

				<input
					id="layoutName"
					type="text"
					maxLength="20"
					placeholder="Enter layout name (max: 20)"
					style={fieldStyle}
				/>

				<button id="save" className="btn btn-success" style={buttonStyle}>
					Save Layout
				</button>

				<select style={fieldStyle}>
					<option>-- Select Saved Layout --</option>
				</select>

				<button
					id="deleteLayout"
					className="btn btn-danger"
					style={buttonStyle}>
					Delete Selected Layout
				</button>
			</div>
		);
	}
}
