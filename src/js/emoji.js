const smileFace = document.querySelector('.closed');
const workFace = document.querySelector('.open');

smileFace.addEventListener('click', () => {
    if (workFace.classList.contains('open')) {
        workFace.classList.add('active');
        smileFace.classList.remove('active');
    }
});

workFace.addEventListener('click', () => {
    if (smileFace.classList.contains('closed')) {
        smileFace.classList.add('active');
        workFace.classList.remove('active');
}
})