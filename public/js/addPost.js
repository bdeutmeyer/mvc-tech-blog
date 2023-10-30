async function newPostHandler(event) {
    event.preventDefault();
    
    // const user_id = event.user.id;

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
    

    const response = await fetch(`/api/post`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            content,
            user_id
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to add post');
    }
}

document
    .querySelector('.new-post-form')
    .addEventListener('submit', newPostHandler);