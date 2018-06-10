// CONSTANTS

const API_URL = 'https://api.bitcraft.io'

// EVENT LISTENERS

document.getElementById('contact-us-form').addEventListener('submit', function(event) {
  event.preventDefault()

  var name_el = document.getElementById('contact-us-name');
  var email_el = document.getElementById('contact-us-email');
  var subject_el = document.getElementById('contact-us-subject');
  var message_el = document.getElementById('contact-us-message');

  // We perform this check in case some browser does not support
  // the "required" attribute we put in the HTML form
  var required_fields = [name_el, email_el, subject_el, message_el];
  var is_form_ready = true;
  required_fields.forEach((field) => {
    if (field.value === '') is_form_ready = false;
  });

  var submit_el = document.getElementById('contact-us-submit');
  var loader_el = document.getElementById('contact-us-loader');
  var response_el = document.getElementById('contact-us-response');

  // Disable submit button so we don't get duplicates
  submit_el.disabled = true;

  // Show the loader so that the user knows we're processing the request
  loader_el.classList.remove('hidden');

  // Preparing response div
  response_el.classList.remove('success');
  response_el.classList.remove('failure');
  response_el.classList.add('hidden');

  success_msg = 'We have received your message and will get back to you as soon as we can.'
  error_msg = 'Something went wrong and we could not send your message. \
    Please make sure you filled out all the fields. If this problem persists, please email us to \
    <a href="mailto:help@bitcraft.io">help@bitcraft.io</a>.';

  if (is_form_ready) {
    axios.post(API_URL + '/send', {
        name: name_el.value,
        email: email_el.value,
        subject: subject_el.value,
        message: message_el.value
      })
      .then((response) => {
        response_el.innerHTML = success_msg;
        
        // Make the response green
        response_el.classList.add('success');
        // Show the response
        response_el.classList.remove('hidden');
      })
      .catch((error) => {
        response_el.innerHTML = error_msg;
        
        // Make the response red
        response_el.classList.add('failure');
        // Show the response
        response_el.classList.remove('hidden');

        // Enable the button again only when sending the email fails
        submit_el.disabled = false;
      })
      .finally(() => {
        // No matter the response, hide the loader again
        loader_el.classList.add('hidden');
      });
  }
});
