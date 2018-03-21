import React, { Component } from 'react';

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
				title: 'Remove',
				key: 'none',
				disabled: ''
			}
		];
		if (this.props.remove === false) {
			bookOptions = bookOptions.filter(options => options.key !== 'none');
		}
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
									this.props.bookInfo.shelf !== undefined &&
									this.props.bookInfo.shelf
								}
								onChange={e => this.updateBook(e.target.value)}
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

export default Book;
