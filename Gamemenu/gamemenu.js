import data from "../temp.js"

// Get all elements with class="closebtn"
var close = document.getElementsByClassName("closebtn");

// When someone clicks on a close button
close[0].onclick = function(){


this.textContent = data[0] + " " + data[1];
}

