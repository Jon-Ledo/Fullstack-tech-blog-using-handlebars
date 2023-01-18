if (window.location.pathname.includes('/dashboard')) {
  const deleteBtns = document.querySelectorAll('.delete-btn')

  deleteBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const postId = parseInt(btn.closest('.blog-post').dataset.postId)

      deletePostFromDB(postId).then(() => {
        window.location.reload()
      })
    })
  })
}

const deletePostFromDB = (id) => {
  return fetch(`/api/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
