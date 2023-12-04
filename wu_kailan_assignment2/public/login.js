
    let params = (new URL(document.location)).searchParams;
    // When the window loads, perfom the following function:
    window.onload = function () {
      // If there is key 'loginErr': there were no inputs or an invalid email/password
      if (params.has('loginErr')) {
        // Get the value from key 'loginErr' and display it in errorMsg
        document.getElementById('errorMsg').innerHTML = params.get('loginErr')
      }
      document.getElementById('email').value = params.get('email');
    }
