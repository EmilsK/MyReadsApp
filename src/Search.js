import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
import { Link } from 'react-router-dom';

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

export default Search;
