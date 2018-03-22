import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

class Search extends Component {
	state = {
		query: '',
		books: []
	};

	updateQuery = query => {
		if (!query) {
			this.setState({ query: '', books: [] });
		} else {
			this.setState({ query: query.trim() });
			BooksAPI.search(query).then(books => {
				if (books.error) {
					books = [];
				}
				// Add shelf status if the book is already on shelf
				books.map(book => {
					this.props.booksInLibrary.forEach(bookInLibrary => {
						if (bookInLibrary.id === book.id) {
							book.shelf = bookInLibrary.shelf;
						}
					});
					return book;
				});

				this.setState({ books });
			});
		}
	};

	render() {
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to="/">
						Close
					</Link>
					<div className="search-books-input-wrapper">
						<input
							type="text"
							placeholder="Search by title or author"
							onChange={e => this.updateQuery(e.target.value)}
						/>
					</div>
				</div>
				<div className="search-books-results">
					<ul className="books-grid">
						{this.state.books.map(book => (
							<Book
								onMoveBook={this.props.onMoveBook}
								key={book.id}
								bookInfo={book}
								remove={false}
							/>
						))}
					</ul>
				</div>
			</div>
		);
	}
}

Search.propTypes = {
	onMoveBook: propTypes.func.isRequired,
	booksInLibrary: propTypes.array.isRequired
};

export default Search;
