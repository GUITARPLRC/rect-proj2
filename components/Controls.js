import React, { Component } from 'react';

/*------------------------
/
/	COMPONENT STYLES
/
/--------------------------
*/
let controlStyles = {
	backgroundColor: '#ddd'
};

let buttonStyle = {
	margin: '20px auto',
	width: '100%'
};

let fieldStyle = {
	padding: 5,
	width: '100%'
};
let listStyle = {
	margin: '10px 0 0 0'
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
		this.handleDelete = this.handleDelete.bind(this);
		this.handleDropdown = this.handleDropdown.bind(this);
	}

	clearBoard() {
		let select = document.querySelector('#select');
		select.selectedIndex = 0;
		this.props.clearBoard();
		this.setState({ saveName: '' });
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
			document.querySelector('#layoutName').focus();
			alert('Please enter a name for the layout before saving. Thanks.');
			return;
		}

		let board = document.querySelector('#board');
		let elements = []; // to store layout rect props for localStorage

		if (board.children) {
			[...board.children].forEach(each => {
				// to get translateX
				let x1 = each.firstChild.style.transform.indexOf('(');
				let x2 = each.firstChild.style.transform.indexOf(',');

				// to get translateY
				let y1 = each.firstChild.style.transform.indexOf(',');
				let y2 = each.firstChild.style.transform.indexOf(')');

				elements.push({
					width: each.firstChild.style.width,
					height: each.firstChild.style.height,
					x: parseInt(each.firstChild.style.transform.slice(x1 + 1, x2 - 2)),
					y: parseInt(each.firstChild.style.transform.slice(y1 + 1, y2 - 1)),
					bgColor: each.firstChild.style.backgroundColor
				});
			});
		}

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

		this.props.handleSavedLayout(array);
	}

	handleDelete() {
		// reset select element to default
		let select = document.querySelector('#select');
		select.selectedIndex = 0;

		// reset save name input
		this.setState({ saveName: '' });

		this.props.deleteSavedLayout(this.state.selectedName);
	}

	handleDropdown() {
		let dropdown = document.querySelector('#dropdown');
		if (dropdown.style.display == 'none') {
			dropdown.style.display = 'block';
		} else {
			dropdown.style.display = 'none';
		}
	}

	render() {
		return (
			<div className="col-md-2" id="controls" style={controlStyles}>
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
					className="form-control"
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

				<select
					className="form-control"
					id="select"
					style={fieldStyle}
					onChange={this.handleLayoutChange}>
					<option default>-- Select Saved Layout --</option>
					{this.props.layoutList &&
						this.props.layoutList.map((each, key) => {
							return <option key={key}>{each}</option>;
						})}
				</select>

				<button
					id="deleteLayout"
					className="btn btn-danger"
					style={buttonStyle}
					onClick={this.handleDelete}>
					Delete Layout
				</button>

				<button
					className="btn btn-default"
					style={buttonStyle}
					onClick={this.handleDropdown}>
					Directions <span className="caret" />
				</button>
				<div id="dropdown" style={{ display: 'none' }}>
					<ul>
						<li style={listStyle}>
							To add Rectangle:
							<ul>
								<li>Click 'Add Rectangle'</li>
								<li>Then drag and resize as desired</li>
							</ul>
						</li>
						<li style={listStyle}>Click rectangle once to change the color</li>
						<li style={listStyle}>Click twice to delete rectangle</li>
						<li style={listStyle}>
							To clear all rectangles:
							<ul>
								<li>click 'Clear Board'</li>
							</ul>
						</li>
						<li style={listStyle}>
							To save:
							<ul>
								<li>Enter a name</li>
								<li>Click 'Save Layout'</li>
							</ul>
						</li>
						<li style={listStyle}>
							To load saved layout:
							<ul>
								<li>Select a layout name from the list</li>
							</ul>
						</li>
						<li style={listStyle}>
							To delete a layout:
							<ul>
								<li>Select a layout from the list</li>
								<li>Click 'Delete Layout'</li>
							</ul>
						</li>
					</ul>
				</div>

				<div style={{ margin: '0 0 10px 0', textAlign: 'center' }}>
					<a href="https://github.com/guitarplrc/rect-proj2" target="_blank">
						Take a look at the code here!
					</a>
				</div>
			</div>
		);
	}
}
