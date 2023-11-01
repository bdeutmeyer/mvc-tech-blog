const deletePost = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/post/delete/${id}`, {
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

const renderUpdateForm = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

document.location.replace(`/dashboard/update/${id}`)
}};
