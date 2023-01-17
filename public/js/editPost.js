if (window.location.pathname.includes('/dashboard/edit-blog-post')) {
  const title = document.querySelector('#edit-blog-title')
  const text = document.querySelector('#edit-blog-text')
  const editBtn = document.querySelector('#edit-btn')
  const postId = parseInt(document.querySelector('form').dataset.postId)
  const userId = parseInt(document.querySelector('#logout').dataset.userId)

  title.value = title.placeholder
  text.value = text.innerHTML

  editBtn.addEventListener('click', () => {
    const newEdit = {
      title: title.value,
      text: text.value,
    }

    editBlogToDB(postId, newEdit).then(() => {
      window.location.replace(`/dashboard/${userId}`)
    })
  })
}

const editBlogToDB = (id, editedBlog) => {
  return fetch(`/api/posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(editedBlog),
  })
}
