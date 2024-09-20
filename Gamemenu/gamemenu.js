function openSettings(){
    window.location.href = "../Settingsmenu/settings.html"
    arr.push(score);
}

document.addEventListener(
    'DOMContentLoaded', () => {
    document.getElementById('settingsBtn').addEventListener('click', openSettings);

});

document.addEventListener('DOMContentLoaded', () => {
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const hamburgerMenu = document.getElementById('hamburger-menu');

    hamburgerIcon.addEventListener("click", () =>{
        if(hamburgerMenu.classList.contains('open')){
            hamburgerMenu.classList.add('closing');
            hamburgerMenu.classList.remove('open');
        }
        else{
            hamburgerMenu.classList.remove('closing');
            hamburgerMenu.classList.add('open');

        }
        
    });
});