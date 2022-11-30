// Masonry
window.onload = () => {
    const grid = document.querySelector('.grid');

    const msnry = new Masonry(grid, {
        itemSelector: '.grid-item',
        columnWidth: 10,
        gutter: 25,
        isFitWidth: true
    });
}
// Keep track of rating
const up = document.getElementsByClassName("upvote");
const down = document.getElementsByClassName("downvote");
const poll = document.getElementsByClassName("vote_count");

let count = poll.innerHTML;

voter();

up.addEventListener("click", ()=>{
    if (up.classList.contains("upvote-active")) {
        count--;
        up.classList.remove("upvote-active");
        voter();
    } if (down.classList.contains("downvote-active")) {
        count++;
        down.classList.remove("downvote-active");
        voter();
    } else {
        count++;
        up.classList.add("upvote-active");
        voter();
    }
})

down.addEventListener("click", ()=>{
    if (down.classList.contains("downvote-active")) {
        count++;
        down.classList.remove("downvote-active");
        voter();
    } if (up.classList.contains("upvote-active")) {
        count--;
        up.classList.remove("upvote-active");
        voter();
    } else {
        count--;
        down.classList.add("downvote-active");
        voter();
    }
})

function voter(){
    poll.innerHTML = count;
}

//
// const newFormHandler = async (event) => {
// 	event.preventDefault();

// 	const title = document.querySelector('#blog-title').value.trim();

// 	const description = document.querySelector('#blog-desc').value.trim();

// 	if (title && description) {
// 		const response = await fetch(`/api/blogs`, {
// 			method: 'POST',
// 			body: JSON.stringify({ title, description }),
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 		});

// 		if (response.ok) {
// 			document.location.replace('/dashboard');
// 		} else {
// 			alert('Failed to create blog');
// 		}
// 	}
// };

// const delButtonHandler = async (event) => {
// 	if (event.target.hasAttribute('data-id')) {
// 		const id = event.target.getAttribute('data-id');

// 		const response = await fetch(`/api/blogs/${id}`, {
// 			method: 'DELETE',
// 		});

// 		if (response.ok) {
// 			document.location.replace('/dashboard');
// 		} else {
// 			alert('Failed to delete blog');
// 		}
// 	}
// };

// document
// 	.querySelector('.new-blog-form')
// 	.addEventListener('submit', newFormHandler);

// document
// 	.querySelector('.blog-list')
// 	.addEventListener('click', delButtonHandler);