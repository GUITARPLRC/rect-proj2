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
	render() {
		return (
			<div className="col-md-2" style={controlStyles}>
				<button className="btn btn-primary" style={buttonStyle} onClick={this.props.addRect}>
					Add Rectangle
				</button>
				<button className="btn btn-warning" style={buttonStyle} onClick={this.props.clearBoard}>
					Clear Board
				</button>
				<input
					className="form-control"
					style={fieldStyle}
					type="text"
					placeholder="Enter layout name (max:20)"
					maxLength="20"
					value={this.props.saveName}
					onChange={this.props.handleSaveName}
				/>
				<button className="btn btn-success" style={buttonStyle} onClick={this.props.saveLayout}>
					Save Layout
				</button>
				<select id="select" className="form-control" onChange={this.props.handledSelectedLayout}>
					<option>-- Saved Layouts --</option>
					{this.props.layoutList &&
						this.props.layoutList.map((each, key) => {
							return <option key={key}>{each}</option>;
						})}
				</select>
				<button className="btn btn-danger" style={buttonStyle} onClick={this.props.deleteSavedLayout}>
					Delete Layout
				</button>
			</div>
		);
	}
}
