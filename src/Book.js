import React, { Component } from 'react';
import propTypes from 'prop-types';

class Book extends Component {
	updateBook(shelf) {
		this.props.onMoveBook(this.props.bookInfo, shelf);
	}

	render() {
		let bookOptions = [
			{
				title: 'Move to...',
				key: 'disabled',
				disabled: 'disabled'
			},
			{
				title: 'Currently Reading',
				key: 'currentlyReading',
				disabled: ''
			},
			{
				title: 'Want To Read',
				key: 'wantToRead',
				disabled: ''
			},
			{
				title: 'Read',
				key: 'read',
				disabled: ''
			},
			{
				title: 'None',
				key: 'none',
				disabled: ''
			}
		];
		return (
			<li>
				<div className="book">
					<div className="book-top">
						<div
							className="book-cover"
							style={{
								width: 128,
								height: 193,
								backgroundImage: `url(${this.props.bookInfo.imageLinks !==
									undefined && this.props.bookInfo.imageLinks.thumbnail})`
							}}
						/>
						<div className="book-shelf-changer">
							<select
								value={
									this.props.bookInfo.shelf !== undefined
										? this.props.bookInfo.shelf
										: 'none'
								}
								onChange={event => this.updateBook(event.target.value)}
							>
								{bookOptions.map(option => (
									<option
										value={option.key}
										key={option.key}
										disabled={option.disabled}
									>
										{option.title}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className="book-title">{this.props.bookInfo.title}</div>
					<div className="book-authors">{this.props.bookInfo.authors}</div>
				</div>
			</li>
		);
	}
}

Book.propTypes = {
	onMoveBook: propTypes.func.isRequired,
	bookInfo: propTypes.object.isRequired
};

export default Book;
