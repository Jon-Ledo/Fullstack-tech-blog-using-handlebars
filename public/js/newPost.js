if (window.location.pathname.includes('/dashboard')) {
  const formSubmitBtn = document.querySelector('#form-submit-btn')
  const user = document.querySelector('#user')
  const userID = parseInt(user.dataset.userId)
  const blogPosts = document.querySelectorAll('.blog-post')

  formSubmitBtn.addEventListener('click', (event) => {
    event.preventDefault()

    const blogTitle = document.querySelector('#blog-title')
    const blogText = document.querySelector('#blog-text')

    const newBlogPostObj = {
      title: blogTitle.value.trim(),
      text: blogText.value.trim(),
      user_id: userID,
    }

    postBlogToDB(newBlogPostObj).then(() => {
      blogTitle.value = ''
      blogText.value = ''
      window.location.reload()
    })
  })
}

const postBlogToDB = (newBlogPost) => {
  return fetch('/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newBlogPost),
  })
}
