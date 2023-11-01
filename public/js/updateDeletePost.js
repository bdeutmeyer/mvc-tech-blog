const deletePost = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/dashboard/delete/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
      console.log('post deleted')
    } else {
      alert('Failed to delete post');
    }
  }
};
// const deleteBtn = document.querySelectorAll('.delete-post')
// deleteBtn.addEventListener('click', deletePost);

// document.getElementById('update-post').addEventListener('click', renderUpdateForm)

