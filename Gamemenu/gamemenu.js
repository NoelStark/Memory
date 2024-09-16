function openSettings(){
    window.location.href = "../Settingsmenu/settings.html"
}

document.addEventListener(
    'DOMContentLoaded', () => {
    document.getElementById('settingsBtn').addEventListener('click', openSettings);

});