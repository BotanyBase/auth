class Login {
  constructor(form, fields) {
    this.form = form;
    this.fields = fields;
    this.validateonSubmit();
  }

  validateonSubmit() {
    let self = this;

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      var error = 0;

      self.fields.forEach((field) => {
        const input = document.querySelector(`#${field}`);
        if (self.validateFields(input) == false) {
          error++;
        }
      });

      if (error == 0) {
        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;
        const email = document.querySelector('#email').value;

        // Use Xano's auth API to login
        fetch('https://x8ki-letl-twmt.n7.xano.io/api:iGbUspz7/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username,
            password: password,
            email: email
          })
        })
        .then((response) => {
          if (!response.ok) { // Check if the response status is not ok (200-299)
            throw new Error('Login failed: ' + response.status);
          }
          return response.json();
        })
          .then((data) => {
            // Login successful, set local storage and submit form
            localStorage.setItem("authToken", data.authToken);
            localStorage.setItem("auth", '1');
            console.log(data.authToken);
            self.setStatus(document.querySelector('#username'), 'Success, redirecting to dashboard...', 'success');
            setTimeout(() => {
              window.location.href = '/authuser/dashboard';
            }, 2000);
          })
          .catch((error) => {
            // Handle login error
            self.setStatus(document.querySelector('#username'), 'User exists', 'error');
            self.setStatus(document.querySelector('#password'), 'User exists', 'error');
          });
      }
    });
  }

  validateFields(field) {
    // ...
    if (field.value.trim() === "") {
      this.setStatus(
        field,
        `${field.previousElementSibling.innerText} cannot be blank`,
        "error"
      );
      return false;
    } else {
      if (field.type == "password") {
        if (field.value.length < 8) {
          this.setStatus(
            field,
            `${field.previousElementSibling.innerText} must be at least 8 characters`,
            "error"
          );
          return false;
        } else {
          this.setStatus(field, null, "success");
          return true;
        }
      } else {
        this.setStatus(field, null, "success");
        return true;
      }
    }
  }

  setStatus(field, message, status) {
    // ...
    const errorMessage = field.parentElement.querySelector(".error-message");

    if (status == "success") {
      if (errorMessage) {
        errorMessage.innerText = "";
      }
      field.classList.remove("input-error");
    }
    if (status == "error") {
      errorMessage.innerText = message;
      field.classList.add("input-error");
    }
  }
}

const form = document.querySelector(".loginForm");
if (form) {
  const fields = ["username", "password"];
  const validator = new Login(form, fields);
}
