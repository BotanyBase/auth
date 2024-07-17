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
      console.log(form init)

      self.fields.forEach((field) => {
        const input = document.querySelector(`#${field}`);
        if (self.validateFields(input) == false) {
          error++;
          console.log(field error);
        }
      });

      if (error == 0) {
        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;

        console.log(going to make request);
        // Use Xano's auth API to login
        fetch('https://x8ki-letl-twmt.n7.xano.io/api:iGbUspz7/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username,
            password: password
          })
        })
        .then((response) => response.json())
        .then((data) => {
          console.log(request made);
          // Login successful, set local storage and submit form
          localStorage.setItem("auth", data.token);
          console.log(data.token);
          //this.form.submit();
          console.log(test: form submitted);
        })
        .catch((error) => {
          // Handle login error
          console.error(error);
          console.log(error);
        });
      }
    });
  }

  validateFields(field) {
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
