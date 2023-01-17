if (window.location.pathname === '/dashboard') {
  const formSubmitBtn = document.querySelector('#form-submit-btn')
  const user = document.querySelector('#user')
  const userID = parseInt(user.dataset.userId)
  const blogPosts = document.querySelectorAll('.blog-post')

  formSubmitBtn.addEventListener('click', (event) => {
    event.preventDefault()

    let blogTitle = document.querySelector('#blog-title').value.trim()
    let blogText = document.querySelector('#blog-text').value.trim()

    const newBlogPostObj = {
      title: blogTitle,
      text: blogText,
      user_id: userID,
    }

    postBlogToDB(newBlogPostObj).then(() => {
      blogTitle = ''
      blogText = ''
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
