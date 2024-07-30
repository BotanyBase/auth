fetch('https://x8ki-letl-twmt.n7.xano.io/api:iGbUspz7/auth/me', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('authToken') // Use the stored JWT
  }
})
.then((response) => response.json())
.then((data) => {
  // Set the innerHTML of the created HTML elements
  document.getElementById('username-display').innerHTML = 'Your username is: ' + data.name;
  document.getElementById('password-display').innerHTML = 'Your user email is: ' + data.email;
  document.getElementById('timestamp').innerHTML = 'Your account was created at: ' + data.created_at; //'Account created at: ' + data.created_at;
  document.getElementById('role-display').innerHTML = 'Your role is' + data.massroom_role; //'Account created at: ' + data.created_at;
})
.catch((error) => {
  console.error(error);
});
