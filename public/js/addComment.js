const addComment = async (event) => {
    event.preventDefault();

    const commentContent = document.getElementById('add-comment').value.trim();

    console.log(commentContent)


    if (commentContent) {
        const id = window.location.toString().split('/')[
            window.location.toString().split('/').length - 1
        ];
        const response = await fetch(`/api/post/addcomment/${id}`, {
            method: 'POST',
            body: JSON.stringify({content: commentContent}),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            location.replace(location.href);
            console.log(id)
        }
    }
};

document.getElementById('add-comment-form').addEventListener('submit', addComment);