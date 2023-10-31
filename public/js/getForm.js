const getPostForm = (id) => {
  const newPostPartial = document.getElementById(`${id}`);

 if (newPostPartial.dataset.state = "hidden") {
  newPostPartial.setAttribute('data-state', 'visible');
 }
};