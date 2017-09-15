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
	constructor() {
		super();
		this.state = {
			saveName: ''
		};

		this.handleSaveName = this.handleSaveName.bind(this);
		this.handleSave = this.handleSave.bind(this);
	}

	handleSaveName(event) {
		this.setState({ saveName: `${event.target.value} layout` });
	}

	handleSave() {
		if (localStorage) {
			localStorage.setItem(
				this.state.saveName,
				document.querySelector('#board').innerHTML
			);
		}
	}

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
					onChange={this.handleSaveName}
				/>

				<button
					id="save"
					className="btn btn-success"
					style={buttonStyle}
					onClick={this.handleSave}>
					Save Layout
				</button>

				<select style={fieldStyle} onChange={this.props.handleLayoutChange}>
					<option>-- Select Saved Layout --</option>
					{this.props.layoutList &&
						this.props.layoutList.map((each, key) => {
							return <option key={key}>{each}</option>;
						})}
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
