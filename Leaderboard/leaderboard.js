import scores from '../temp.js';
let arr = [];

var close = document.getElementsByClassName("closebtn");

close[0].onclick = function(){
    arr.push(score[0]);
    this.textContent = arr[0].score + " " + arr[0].name + " " + arr[0].time + " " + arr[0].date;
}


let table = document.querySelector("table tbody");

function fill_leaderboard(){
    scores.forEach((score, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
        <td>${index + 1}</td>
        <td>${score.score}</td>
        <td>${score.name}</td>
        <td>${score.time}</td>
        <td>${score.date}</td>`;

        table.appendChild(row);
    });
}

document.addEventListener("DOMContentLoaded", fill_leaderboard);