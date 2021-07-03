import React, { useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Store from '../../store/Store';
import './NewComment.css';

function CommentComponent() {
	const textArea = useRef(null);
	const { bookId } = useParams();
	let book = Store.getBook(bookId);
	let history = useHistory();

	const handleClick = () => {
		const comment = textArea.current.value;
		Store.saveComment(bookId, comment);
		textArea.current.value = '';
		history.replace('/my-readings');
	};
	return (
		<div className="new-comment-container">
			<div className="new-comment__heading">
				<h1>{book.title}</h1>
				<p>{book.authorName}</p>
			</div>
			<textarea ref={textArea} rows={8} cols={55} />
			<button onClick={handleClick}>Save Comment</button>
		</div>
	);
}

export default CommentComponent;
