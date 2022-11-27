const newFormHandler = async (event) => {
	event.preventDefault();

	const title = document.querySelector('#blog-title').value.trim();

	const picture = document.querySelector('#blog-image').value.trim();

	if (title && picture) {
		const response = await fetch(`/api/blogs`, {
			method: 'POST',
			body: JSON.stringify({ title, picture }),
			headers: {
				'Content-Type': 'application/json',
			},
		});

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