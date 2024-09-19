import scores from '../temp.js';
let score = {score:20, name:"Jöns",time:"1m 32s",date:"2024-10-20"}
let arr = [];
arr.push(...scores);
arr.push(score);
/*
var close = document.getElementsByClassName("closebtn");

close[0].onclick = function(){
    arr.push(score[0]);
    this.textContent = arr[0].score + " " + arr[0].name + " " + arr[0].time + " " + arr[0].date;
    }
   
let scores = [
    {name: 'Jöns',date: '2024-03-10', score:'25', time:'3m 31s' },
    {name: 'Jöns',date: '2024-03-10', score:'25', time:'3m 31s'},
    {name: 'Jöns',date: '2024-03-10', score:'25', time:'3m 31s'}
];*/

let table = document.querySelector("table tbody");

//Creates the rows and fills with data
function fill_leaderboard(){
    arr.forEach((score, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
        <td>${index + 1}</td>
        <td>${score.name}</td>
        <td>${score.date}</td>
        <td>${score.time}</td>
        <td>${score.score}</td>`;

        table.appendChild(row);
    });
}
//Function to take time and convert it into seconds
function convert_toSeconds(time){
    let [minutes, seconds] = time.split(' ');
    let min = parseInt(minutes.replace('m', ''), 10);
    let sec = parseInt(seconds.replace('s', ''), 10);
    return (min*60) + sec;
}

arr.sort((a,b) => {
    //Check if the scores are the same or not
    if(b.score !== a.score) 
        return b.score - a.score;
    //If the scores are the same, compare the times
    let timeA = convert_toSeconds(a.time);
    let timeB = convert_toSeconds(b.time);
    return timeA -timeB;
});


document.addEventListener("DOMContentLoaded", fill_leaderboard);