const section1 = document.querySelector('.hero');
const header = document.querySelector('header');
const options = {
    threshold: 0,
    rootMargin: '-150px 0px -300px 0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) { header.classList.add('header-scroll'); }
        else { header.classList.remove('header-scroll'); }
    });
}, options);
observer.observe(section1);

const animation = new IntersectionObserver((entries, animation) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) { return; }
        entry.target.querySelectorAll('.left').forEach(el => el.classList.add('v'));
        entry.target.querySelectorAll('.right').forEach(el => el.classList.add('v'));
        entry.target.querySelectorAll('.middle').forEach(el => el.classList.add('v'));
        animation.unobserve(entry.target);
    });
}, options);

if (window.innerWidth >= 1067) {
    document.querySelectorAll('.container').forEach(c => animation.observe(c));
}

window.onload = load;
window.onresize = load;

function load() {
    if (window.innerWidth <= 500) { document.getElementById('navigation').className = 'nav2'; }
    else { document.getElementById('navigation').className = 'nav1'; }
}

const menu = document.querySelector('.menu');
menu.onclick = function () {
    if (window.innerWidth <= 500) {
        const hdr = document.querySelectorAll('header')[0];
        hdr.getElementsByClassName('nav2')[0].classList.toggle('nav-active');
        hdr.getElementsByClassName('menu')[0].classList.toggle('svg-active');
    } else {
        document.querySelector('.slider-container').classList.add('sc-visible');
    }
};

window.addEventListener('mouseup', e => { e.target.classList.remove('sc-visible'); });
document.querySelector('.icon').onclick = () => { document.querySelector('.slider-container').classList.remove('sc-visible'); };
