const getNewPostForm = () => {
 document.location.replace('/create');
};

const getUpdateForm = () => {
document.location.replace('/update');
};

const deletePost = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/post/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  }
};

document.getElementById('create-post').addEventListener('click', getNewPostForm);

document.getElementById('update-post').addEventListener('click', getUpdateForm);

document.getElementById('delete-post').addEventListener('click', deletePost);