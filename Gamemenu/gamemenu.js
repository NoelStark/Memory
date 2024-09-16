import name from "../Settingsmenu/settings.js"

// Get all elements with class="closebtn"
var close = document.getElementsByClassName("closebtn");

close[0].onclick = function() {
    // Change the text inside the <span> element
    this.textContent = name;
}

