import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FcPlus } from 'react-icons/fc';
import { COVER } from '../../constants';
import Store from '../../store/Store';
import './BookPreview.css';

function BookPreview({ book, author }) {
	const [error, setError] = useState('');
	const history = useHistory();

	const addNewBook = () => {
		if (Store.bookExists(book.bookId)) {
			setError('Book already in collection.');
			return;
		} else {
			Store.saveBook(
				book.bookId,
				book.title,
				author.authorId,
				author.name,
				book.description,
				book.covers,
				book.excerpts,
				book.links,
				book.subjectPeople,
				book.subjectPlaces,
				book.subjects,
				book.authors
			);
		}

		if (!Store.authorExists(author.authorId)) {
			Store.saveAuthor(
				author.authorId,
				author.name,
				author.bio,
				author.birthDate,
				author.deathDate,
				author.fullName,
				author.links
			);
		}

		history.replace('/my-readings');
	};
	return (
		<section>
			<h1>{book?.title}</h1>
			<p>{author?.name}</p>
			<div className="book-preview">
				<div className="book-preview__p">
					<p>{book.description?.value || book?.description || 'no description'}</p>
					<button className="add-btn" title="Add book" onClick={addNewBook}>
						<FcPlus />
					</button>
				</div>
				{book.covers &&
					!!book.covers.length &&
					((book.covers[0] !== -1 && (
						<img
							src={`${COVER.urlImg}${book.covers[0]}-${COVER.mediumSize}.${COVER.extension}`}
							alt="book cover"
						/>
					)) ||
						(book.covers[1] !== -1 && (
							<img
								src={`${COVER.urlImg}${book.covers[1]}-${COVER.mediumSize}.${COVER.extension}`}
								alt="book cover"
							/>
						)))}
			</div>
			{!!book.links && !!book.links.length && (
				<div className="book-preview__links">
					<h3>More to read about:</h3>
					<ul>
						{book?.links.map((link, i) => (
							<li key={i}>
								<a href={link.url}>{link.title}</a>
							</li>
						))}
					</ul>
				</div>
			)}
			{!!error && <div className="error">{error}</div>}
		</section>
	);
}

export default BookPreview;
