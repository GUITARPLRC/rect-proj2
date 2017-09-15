import React, { Component } from 'react';

/*------------------------
/
/	COMPONENT STYLES
/
/--------------------------
*/
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

/*------------------------
/
/	COMPONENT
/
/-------------------------
*/

export default class Controls extends Component {
	constructor(props) {
		super(props);
		this.state = {
			saveName: '',
			selectedName: ''
		};

		this.clearBoard = this.clearBoard.bind(this);
		this.handleLayoutChange = this.handleLayoutChange.bind(this);
		this.handleSaveName = this.handleSaveName.bind(this);
		this.handleSave = this.handleSave.bind(this);
	}

	clearBoard() {
		this.props.handleHowManyRects(0);

		// remove all div#board child Nodes
		while (document.querySelector('#board').hasChildNodes()) {
			document
				.querySelector('#board')
				.removeChild(document.querySelector('#board').firstChild);
		}
	}

	// to keep input as controlled component
	handleSaveName(event) {
		this.setState({ saveName: event.target.value });
	}

	// save to localStorage (if possible)
	handleSave() {
		// check if input is empty
		if (this.state.saveName == '') {
			// TODO need better UI/UX
			alert('Please enter a name for the layout before saving. Thanks.');
			return;
		}

		if (localStorage) {
			localStorage.setItem(
				`${this.state.saveName} layout`,
				document.querySelector('#board').innerHTML
			);
		} else {
			// TODO need better UI/UX
			alert(
				'Sorry you can not save a layout at this time. (ERR: localStorage)'
			);
		}

		this.props.populateSavedLayouts();
	}

	// load saved layout
	handleLayoutChange(event) {
		let name = `${event.target.value} layout`;

		// set controlled input saveName to help UX
		this.setState({
			saveName: event.target.value,
			selectedName: event.target.value
		});

		// TODO find alt for innerHTML = BAD
		document.querySelector('#board').innerHTML = localStorage.getItem(name);
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
					onClick={this.clearBoard}
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
					value={this.state.saveName}
				/>

				<button
					id="save"
					className="btn btn-success"
					style={buttonStyle}
					onClick={this.handleSave}>
					Save Layout
				</button>

				<select style={fieldStyle} onChange={this.handleLayoutChange}>
					<option>-- Select Saved Layout --</option>
					{this.props.layoutList &&
						this.props.layoutList.map((each, key) => {
							return <option key={key}>{each}</option>;
						})}
				</select>

				<button
					id="deleteLayout"
					className="btn btn-danger"
					style={buttonStyle}
					onClick={() => this.props.deleteSavedLayout(this.state.selectedName)}>
					Delete Selected Layout
				</button>
			</div>
		);
	}
}
