import React, { Component }  from 'react'
import { connect } from "react-redux";
import {
	updateValues,
	handleFocus,
	handleBlur
} from "../store/actions";
import { bindActionCreators } from "redux";

class Field extends Component  {
	
	// state = {
	// 	isActive: false,
	// }
		
	// handleFocus = () => {
	// 	this.setState({
	// 		isActive: true
	// 	})
	// }

	handleBlur = () => {
		this.props.handleBlur
		if (this.props.value.length > 0) {
			this.props.handleFocus
		}
	}

	render() {
		const { id,
			labelText,
			type,
			name,
			value,
			error, onChangeValues, handleFocus, isActive} = this.props; 
		return (
			<div className="form-group">
				<label htmlFor={id} className={isActive ? "active" : null}>{labelText}</label>
				<input
					type={type}
					id={id}
					className={error ? "form-control danger" : "form-control" }
					name={name}
					value={value}
					onChange={onChangeValues}
					onBlur={this.handleBlur}
					onFocus={handleFocus}
				/>
				{error ? <div className="invalid-feedback">{error}</div> : null}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		values: state.values,
		errors: state.errors,
		isActive: state.isActive
	}
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			onChangeValues: updateValues,
			handleFocus,
			handleBlur
		},
		dispatch
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Field);