const commentContainer = document.querySelectorAll('.comment-container')

commentContainer.forEach((box) => {
  box.addEventListener('submit', addComment)
})

function addComment(event) {
  event.preventDefault()

  // user's written comment
  const commentText = event.target[0].value

  // user id found on the logout btn
  const id = document.querySelector('#logout')
  const userId = parseInt(id.dataset.userId)

  // post id found on the article
  const postId = parseInt(event.target.closest('article').dataset.postId)

  // build the object for POST request
  const newComment = {
    text: commentText,
    user_id: userId,
    post_id: postId,
  }

  postCommentDB(newComment)
}

const postCommentDB = (newComment) => {
  return fetch('/api/comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newComment),
  })
}
