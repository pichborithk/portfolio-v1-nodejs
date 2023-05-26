const form = document.querySelector('.message-form');
const sendResult = document.querySelector('#send-result');

async function sendMessage(event) {
  event.preventDefault();
  const name = form.name.value;
  const email = form.email.value;
  const subject = form.subject.value;
  const content = form.content.value;

  const response = await fetch('http://localhost:1337/api/mails', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ name, email, subject, content }),
  });

  const result = await response.json();
  sendResult.textContent = result.message;
  form.reset();
}

form.addEventListener('submit', sendMessage);
