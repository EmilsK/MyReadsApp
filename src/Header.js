import React, { Component } from 'react';
import propTypes from 'prop-types';

class Header extends Component {
	render() {
		return (
			<div className="list-books-title">
				<h1>{this.props.title}</h1>
			</div>
		);
	}
}

Header.propTypes = {
	title: propTypes.string.isRequired
};

export default Header;
