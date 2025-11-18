let questions;

fetch("./assets/json/questions.json")
    .then((res) => res.json())
    .then((data) => (questions = data));
