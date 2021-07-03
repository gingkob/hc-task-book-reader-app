import { API } from '../constants';
import axios from 'axios';

// const getBooks = (title) => {
// 	return new Promise(async (resolve, reject) => {
// 		// if there were any waiting response and new respone came
// 		if (waitingResponse) {
// 			waitingResponse = false;
// 			controller.abort();
// 			signal.onabort = () => {
// 				controller = null;
// 				signal = null;
// 			};
// 		}

// 		controller = new AbortController();
// 		signal = controller.signal;

// 		waitingResponse = true;
// 		try {
// 			let result = await fetch(`${API.urlTitle}${title}&limit=${API.limit}&offset=${API.offset}`, {
// 				signal,
// 				mode: 'cors',
// 			});
// 			let parsedResult = await result.json();
// 			let desiredData = [];
// 			parsedResult.docs.forEach((doc) => {
// 				const {
// 					key,
// 					title,
// 					first_publish_year: year,
// 					author_key: authorKey,
// 					author_name: authorName,
// 					author_alternative_name: authorAlternativeName,
// 					person,
// 					place,
// 					subject,
// 				} = doc;
// 				desiredData.push({
// 					key,
// 					title,
// 					year,
// 					authorKey,
// 					authorName,
// 					authorAlternativeName,
// 					person,
// 					place,
// 					subject,
// 				});
// 			});
// 			if (!desiredData.length) {
// 				desiredData.push({ key: 'no-book-search-result', title: '' });
// 			}
// 			waitingResponse = false;
// 			resolve(desiredData);
// 		} catch (error) {
// 			waitingResponse = false;
// 			reject(error);
// 		}
// 	});
// };
let cancelToken;

const getBooks = (title) => {
	// if there were any waiting response and new respone came
	if (typeof cancelToken != typeof undefined) {
		cancelToken.cancel('Cancelled');
	}

	//Save the cancel token for the current request
	cancelToken = axios.CancelToken.source();

	return new Promise(async (resolve, reject) => {
		try {
			let result = await axios(`${API.urlTitle}${title}&limit=${API.limit}&offset=${API.offset}`, {
				cancelToken: cancelToken.token,
			});
			let desiredData = [];
			result.data.docs.forEach((doc) => {
				const {
					key,
					title,
					first_publish_year: year,
					author_key: authorKey,
					author_name: authorName,
					author_alternative_name: authorAlternativeName,
					person,
					place,
					subject,
				} = doc;
				desiredData.push({
					key,
					title,
					year,
					authorKey,
					authorName,
					authorAlternativeName,
					person,
					place,
					subject,
				});
			});
			if (!desiredData.length) {
				desiredData.push({ key: 'no-book-search-result', title: '' });
			}
			resolve(desiredData);
		} catch (error) {
			reject(error);
		}
	});
};

const getBookDetails = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			// let result = await fetch(`${API.urlDetail}${id}.json`);
			// let parsedResult = await result.json();
			let result = await axios(`${API.urlDetail}${id}.json`);
			let desiredData = null;
			const {
				key: bookId,
				title,
				links,
				description,
				covers,
				subject_places: subjectPlaces,
				subject_people: subjectPeople,
				authors,
				excerpts,
				subjects,
			} = result.data;
			desiredData = {
				bookId,
				title,
				links,
				description,
				covers,
				subjectPlaces,
				subjectPeople,
				authors,
				excerpts,
				subjects,
			};
			resolve(desiredData);
		} catch (error) {
			reject(error);
		}
	});
};

const getAuthorDetails = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			// let result = await fetch(`${API.urlDetail}${id}.json`);
			// let parsedResult = await result.json();
			let result = await axios(`${API.urlDetail}${id}.json`);

			let desiredData = null;
			const {
				key: authorId,
				bio,
				birth_date: birthDate,
				death_date: deathDate,
				fuller_name: fullName,
				links,
				name,
			} = result.data;
			desiredData = { authorId, bio, birthDate, deathDate, fullName, links, name };
			resolve(desiredData);
		} catch (error) {
			reject(error);
		}
	});
};

export { getBooks, getBookDetails, getAuthorDetails };
