// Fetch le fichier JSON et le place dans questions
let questions;
fetch("./assets/json/questions.json")
    .then((res) => res.json())
    .then((data) => (questions = data));

let numeroQuestion = 1;
let reponsesTab = [];
let listeReponses = [];

// Boutton start pour démarrer le quizz
$("#bouttonStart").on("click", function (e) {
    $("#divStart").hide();
    $("#divQuestion").removeClass("customHidden");
    afficherQuestion();
});

function afficherQuestion() {
    $("#numeroQuestion").text("Question " + numeroQuestion);
    $("#textQuestion").text(questions[numeroQuestion - 1].question);

    // Masque les bouttons précédent et suivant en fonction de la question
    numeroQuestion == 1
        ? $("#bouttonPrecedent").addClass("customHidden")
        : $("#bouttonPrecedent").removeClass("customHidden");
    numeroQuestion == 10
        ? $("#bouttonSuivant").addClass("customHidden")
        : $("#bouttonSuivant").removeClass("customHidden");

    // retire le contenu de la div proposition et append les propositions en fonction du numéro de la question en cours
    $("#divPropositions").empty();
    for (const [index, question] of questions[numeroQuestion - 1].propositions.entries()) {
        $("#divPropositions").append(
            `<div class="my-6">
                <input type="radio" id="reponse${numeroQuestion}-${index + 1}" name="question1" value="${question}" />
                <label class="text-xl" for="reponse${numeroQuestion}-${index + 1}">${question}</label>
            </div>`
        );
    }
    listeReponses = $("#divPropositions > div > input").toArray();
    for (const proposition of listeReponses) {
        if (proposition.value == reponsesTab[numeroQuestion - 1]) {
            proposition.checked = true;
        }
    }
}

// actualise le tableau des valeurs utilisateur et ajoute la réponse courante à l'indice de la question
function updateChecked() {
    console.log(listeReponses);

    for (const proposition of listeReponses) {
        if (proposition.checked == true) {
            reponsesTab[numeroQuestion - 1] = proposition.value;
        }
    }
}

// return le nombre de bonnes réponses
function calculScore() {
    let bonneReponses = 0;
    for (const [index, reponse] of reponsesTab.entries()) {
        if (reponse == questions[index].reponse) {
            bonneReponses++;
        }
    }
    return bonneReponses;
}

$("#bouttonPrecedent").on("click", function () {
    $("#divValider").addClass("customHidden");
    if (numeroQuestion == 1) {
        return;
    }

    updateChecked();
    numeroQuestion--;
    afficherQuestion();
});

$("#bouttonSuivant").on("click", function () {
    if (numeroQuestion == 9) {
        $("#divValider").removeClass("customHidden");
    }
    if (numeroQuestion == 10) {
        return;
    }

    updateChecked();
    numeroQuestion++;
    afficherQuestion();
});

$("#divValider").on("click", function () {
    updateChecked();

    $("#divQuestion").addClass("hidden");
    $("#divScore").removeClass("hidden");
    $("#score").text(`${calculScore()} / 10`);
});
