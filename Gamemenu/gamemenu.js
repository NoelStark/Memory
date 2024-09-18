function openSettings(){
    window.location.href = "../Settingsmenu/settings.html"
    arr.push(score);
}

document.addEventListener(
    'DOMContentLoaded', () => {
    document.getElementById('settingsBtn').addEventListener('click', openSettings);

});