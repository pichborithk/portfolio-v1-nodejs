const buttons = document.querySelectorAll('[data-carousel-btn]');
const slide = document.querySelector('.home-section > .carousel > ul');
let autoIndex = 1;

function toggleImage() {
  autoIndex = Number(this.dataset.carouselBtn);
  const activeBtn = document.querySelector(
    '.home-section > .carousel > .carousel-btn > [data-active]'
  );
  const activeImage = slide.querySelector('[data-active]');
  delete activeImage.dataset.active;
  delete activeBtn.dataset.active;
  slide.children[autoIndex].dataset.active = true;
  this.dataset.active = true;
}

function autoToggleImage() {
  if (autoIndex > 2) autoIndex = 0;
  const activeBtn = document.querySelector(
    '.home-section > .carousel > .carousel-btn >[data-active]'
  );
  const activeImage = slide.querySelector('[data-active]');
  delete activeImage.dataset.active;
  delete activeBtn.dataset.active;
  slide.children[autoIndex].dataset.active = true;
  buttons.forEach((btn) => {
    if (Number(btn.dataset.carouselBtn) === autoIndex)
      btn.dataset.active = true;
  });
  autoIndex++;
  // console.log(autoIndex);
}

buttons.forEach((btn) => btn.addEventListener('click', toggleImage));
setInterval(autoToggleImage, 5000);
