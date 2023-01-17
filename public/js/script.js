if (window.location.pathname === '/') {
  const posts = document.querySelectorAll('.post')

  // toggle the accordion panels
  posts.forEach((post) => {
    const btn = post.querySelector('.post-btn')
    btn.addEventListener('click', () => {
      // Close unselected panels if they're open
      posts.forEach((article) => {
        if (article !== post) {
          article.classList.remove('show-text')
        }
      })

      // Toggle the currently selected button
      post.classList.toggle('show-text')
    })
  })
}
