//const { JSON } = require("sequelize");

const newFormHandler = async (event) => {
	event.preventDefault();

	const title = document.querySelector('#blog-title').value.trim();

	const picture = document.querySelector('#blog-image').value.trim();
    
	const rating = document.querySelector('#blog-rating').value.trim();


	if (title && picture && rating) {
		const response = await fetch(`/api/blogs`, {
			method: 'POST',
			body: JSON.stringify({ title, picture, rating }),
			headers: {
				'Content-Type': 'application/json',
			},
		});
        console.log(JSON.stringify({ title, picture, rating }));

		if (response.ok) {
			document.location.replace('/blog');
		} else {
			alert('Failed to create blog');
		}
	}
};

document
	.querySelector('.new-blog-form')
	.addEventListener('submit', newFormHandler);