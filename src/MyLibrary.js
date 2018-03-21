import React, { Component } from 'react';
import Header from './Header';
import Book from './Book';
import sortBy from 'sort-by';
import { Link } from 'react-router-dom';

class MyLibrary extends Component {
	render() {
		const bookShelves = [
			{
				title: 'Currently Reading',
				key: 'currentlyReading'
			},
			{
				title: 'Want To Read',
				key: 'wantToRead'
			},
			{
				title: 'Read',
				key: 'read'
			}
		];

		return (
			<div className="list-books">
				<Header title="MyReads" />
				<div className="list-books-content">
					<div>
						{bookShelves.map(shelf => (
							<div className="bookshelf" key={shelf.key}>
								<h2 className="bookshelf-title">{shelf.title}</h2>
								<div className="bookshelf-books">
									<ol className="books-grid">
										{this.props.booksInLibrary
											.sort(sortBy('title'))
											.filter(book => book.shelf === shelf.key)
											.map(book => (
												<Book
													onMoveBook={this.props.onMoveBook}
													key={book.id}
													bookInfo={book}
												/>
											))}
									</ol>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="open-search">
					<Link to="/search" />
				</div>
			</div>
		);
	}
}

export default MyLibrary;
