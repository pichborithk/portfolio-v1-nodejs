const switchBtn = document.querySelector('.controller > .switch-button');
console.log(switchBtn);

switchBtn.addEventListener('click', function () {
  document.body.classList.toggle('dark-mode');
  switchBtn.classList.toggle('dark');
});
