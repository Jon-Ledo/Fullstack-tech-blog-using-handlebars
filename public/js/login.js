const loginFormHandler = async (event) => {
  event.preventDefault()

  const user_name = document.querySelector('#username').value.trim()
  const password = document.querySelector('#password').value.trim()

  if (user_name && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ user_name, password }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
      document.location.replace('/')
    } else {
      alert('Failed to log in.')
    }
  }
}

const signupFormHandler = async (event) => {
  event.preventDefault()

  const user_name = document.querySelector('#username').value.trim()
  const password = document.querySelector('#password').value.trim()

  if (user_name && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ user_name, password }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
      // login after succesful creation
      loginFormHandler(event)
    } else {
      alert('Failed to sign up.')
    }
  }
}

if (window.location.pathname.includes('/login')) {
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler)
}

if (window.location.pathname.includes('/sign-up')) {
  document
    .querySelector('.sign-up-form')
    .addEventListener('submit', signupFormHandler)
}

// logout
const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })

  if (response.ok) {
    document.location.replace('/')
  } else {
    alert('Failed to log out.')
  }
}

document.querySelector('#logout').addEventListener('click', logout)
