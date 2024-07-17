fetch('https://x8ki-letl-twmt.n7.xano.io/api:iGbUspz7/auth/me', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('auth') // Use the stored JWT
  }
})
.then((response) => response.json())
.then((data) => {
  console.log(data); // User data from Xano
})
.catch((error) => {
  console.error(error);
});
