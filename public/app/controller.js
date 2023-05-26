const sections = document.querySelectorAll('section');
const sectionButtons = document.querySelectorAll('.controller > div > p');
const welcomeBoard = document.querySelector('.welcome-board');

function toggleSection() {
  const id = this.dataset.id;
  sections.forEach((section) => section.classList.add('disabled'));
  document.querySelector(`#${id}`).classList.remove('disabled');
}

function toggleButton() {
  sectionButtons.forEach((btn) => btn.classList.remove('active'));
  this.classList.add('active');
}

function openBoard() {
  const pieces = this.querySelectorAll('.welcome-piece');
  pieces.forEach((piece) => piece.classList.add('opened'));
  this.querySelector('h1').style.setProperty('opacity', '0');
  setTimeout(() => {
    this.style.setProperty('display', 'none');
  }, 3500);
}

sectionButtons.forEach((btn) => btn.addEventListener('click', toggleSection));
sectionButtons.forEach((btn) => btn.addEventListener('click', toggleButton));
welcomeBoard.addEventListener('click', openBoard);
