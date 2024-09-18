class Score{
    constructor(score, name, time = "-", date = new Date().toLocaleDateString()){
        this.score = score;
        this.name = name;
        this.time = time;
        this.date = date;
    }
}

const scores = [new Score(10, "Jöns", "2m 3s")];

export default scores;