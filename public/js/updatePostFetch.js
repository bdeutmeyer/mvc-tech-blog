// Fetch on update form
async function editFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
  
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    const response = await fetch(`/api/post/update/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: title,
        content: content
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  
    if (response.ok) {
      document.location.replace(`/dashboard`);
      console.log('edited post')
    } else {
      alert('Failed to edit post');
    }
  };

document.querySelector('#edit-post-form').addEventListener('submit', editFormHandler);