const burgerMenu = document.querySelector('.burger-menu');
const burgerNavbar = document.querySelector('.burger-navbar');

document.addEventListener('click', e => {

    if (e.target.parentElement.classList.contains('burger-menu') || e.target.classList.contains('burger-menu')) {

        burgerMenu.classList.toggle('active');
        burgerNavbar.classList.toggle('active');

    } else {

        burgerNavbar.classList.remove('active');
        burgerMenu.classList.remove('active');
    }
});