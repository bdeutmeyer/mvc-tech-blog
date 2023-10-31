const newPostHandler = async (event) => {
    event.preventDefault();

    const title = document.getElementById('post-title').value.trim();
    const content = document.getElementById('post-content').value.trim();

    if (title && content) {
        const response = await fetch(`/api/post`, {
            method: 'POST',
            body: JSON.stringify({
                title,
                content
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            // document.location.replace('/');
            console.log('New post created')
        } else {
            alert('Failed to add post');
        }
    }
};

document.querySelector('.new-post-form').addEventListener('submit', newPostHandler);