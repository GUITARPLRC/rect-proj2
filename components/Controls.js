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
		this.props.clearBoard();
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

		let board = document.querySelector('#board');
		let elements = [];
		[...board.children].forEach(each => {
			let x1 = each.firstChild.style.transform.indexOf('('); // to get translateX
			let x2 = each.firstChild.style.transform.indexOf(',');
			let y1 = each.firstChild.style.transform.indexOf(','); // to get translateY
			let y2 = each.firstChild.style.transform.indexOf(')');

			elements.push({
				width: each.firstChild.style.width,
				height: each.firstChild.style.height,
				x: parseInt(each.firstChild.style.transform.slice(x1 + 1, x2 - 2)),
				y: parseInt(each.firstChild.style.transform.slice(y1 + 1, y2 - 1)),
				bgColor: each.firstChild.style.backgroundColor
			});
		});

		if (localStorage) {
			localStorage.setItem(
				`${this.state.saveName} layout`,
				JSON.stringify(elements)
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
		if (event.target.value === '-- Select Saved Layout --') {
			return;
		}

		let name = `${event.target.value} layout`;
		let array = JSON.parse(localStorage.getItem(name));

		// set controlled input saveName to help UX
		this.setState({
			saveName: event.target.value,
			selectedName: event.target.value
		});

		this.props.handleSavedLayout(array);
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
					onClick={() => {
						this.setState({ saveName: '' });
						this.props.deleteSavedLayout(this.state.selectedName);
					}}>
					Delete Selected Layout
				</button>
			</div>
		);
	}
}
