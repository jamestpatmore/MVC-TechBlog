const delButtonHandler = async (event) => {
	if (event.target.hasAttribute('data-id')) {
		const id = event.target.getAttribute('data-id');

		const response = await fetch(`/api/blogs/${id}`, {
			method: 'DELETE',
		});

		if (response.ok) {
			document.location.replace('/user/profile');
		} else {
			alert('Failed to delete blog');
		}
	}
};

document.querySelector('.fa-trash').addEventListener('click', delButtonHandler);

let delButtons = document.querySelectorAll('.fa-delete-left')

const delCommentHandler = async (event) => {
	if (event.target.hasAttribute('data-id')) {
		const id = event.target.getAttribute('data-id');

		const response = await fetch(`/api/comments/${id}`, {
			method: 'DELETE',
		});

		if (response.ok) {
			document.location.reload();
		} else {
			alert('Failed to delete comment');
		}
	}
};
for(i = 0; i < delButtons.length; i++) {
    delButtons[i].addEventListener('click', delCommentHandler)
}
