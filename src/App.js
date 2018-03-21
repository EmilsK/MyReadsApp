import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';

import Search from './Search';
import MyLibrary from './MyLibrary';

class BooksApp extends React.Component {
	state = {
		books: []
	};

	componentDidMount() {
		BooksAPI.getAll().then(books => {
			this.setState({ books });
		});
	}

	moveBook = (book, shelf) => {
		if (this.state.books) {
			BooksAPI.update(book, shelf).then(() => {
				book.shelf = shelf;
				this.setState(state => ({
					books: state.books.filter(b => b.id !== book.id).concat([book])
				}));
			});
		}
	};

	render() {
		return (
			<div className="app">
				<Route
					exact
					path="/search"
					render={({ history }) => <Search onMoveBook={this.moveBook} />}
				/>
				<Route
					exact
					path="/"
					render={() => (
						<MyLibrary onMoveBook={this.moveBook} booksInLibrary={this.state.books} />
					)}
				/>
			</div>
		);
	}
}

export default BooksApp;
