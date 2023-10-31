async function editFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('#updated-post-title').value.trim();
    const content = document.querySelector('#updated-post-content').value.trim();
  
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    const response = await fetch(`/api/post/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        content
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      // document.location.replace(`/`);
      console.log('edited post')
    } else {
      alert('Failed to edit post');
    }
  }
  
  const deletePost = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/post/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // document.location.replace('/dashboard');
        console.log('post deleted')
      } else {
        alert('Failed to delete post');
      }
    }
  };
  
  document.getElementById('delete-post').addEventListener('click', deletePost);
  
  document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);