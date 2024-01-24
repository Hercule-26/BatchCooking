"use strict";

/**
 * Génère un entier aléatoirement équiprobablement réparti dans
 * l'intervalle fermé [min, max] (ou [max, min]).
 * @param {number} max - valeur maximale (ou minimale) possible.
 * @param {number} min - valeur minimale (ou maximale) possible.
 * @returns {number} - un entier dans [min, max] (ou [max, min]).
 */
function random_int(min, max) {
    const min_local = Math.ceil(Math.min(min, max));
    const max_local = Math.floor(Math.max(min, max));
    return Math.floor(Math.random() * (max_local - min_local + 1) + min_local);
}

/**
* @typedef data
* @type {object}
* @property {problem[]} arithmetic - Liste des problèmes.
*/

/**
 * @typedef problem
 * @type {object}
 * @property {number} left_operand - Opérande de gauche.
 * @property {number} right_operand - Opérande de droite.
 * @property {string} operator - Opérateur.
*/

/**
 * Retourne la valeur numérique réponse au `problem` reçu en paramètre.
 * @param {problem} problem - `problem` à calculer.
 * @returns {number} réponse numérique du `problem`.
 */
function answer(problem) {
    let result = 0;
    switch (problem.operator) {
    case "+": result = problem.left_operand + problem.right_operand;
        break;
    case "-": result = problem.left_operand - problem.right_operand;
        break;
    case "*": result = problem.left_operand * problem.right_operand;
        break;
    case "/": result = problem.left_operand / problem.right_operand;
        break;
    }
    return result;
}

fetch("https://git.esi-bru.be/api/v4/projects/43706/repository/files/webg2%2Farithmetic.json/raw")
    .then((response) => response.json())
    .then(loadProblems)
    .catch(alert);

/**
 * Fonction pour garnir la page html avec les problèmes présents dans
 * l'objet `data` et gérer leurs affichages.
 * @param {data} data - Un objet de type data.
 */
function loadProblems(data) {
    console.log(`data : ${data}`);
    console.log(data);
    const problem_count = data.arithmetic.length;
    const shown_problem_index = random_int(0, problem_count - 1);

    // ---------------------------------------

    //operationTitle?.textContent = `Opération n° ${shown_problem_index + 1}`;
    let cpt = 1;
    data.arithmetic.forEach((element) => {
        const div = document.createElement("div");
        div.setAttribute("id", `Opération n°${cpt}`);
        div.classList.add("hide");
        div.textContent = `${element.left_operand} ${element.operator} ${element.right_operand}`;
        document.querySelector(".operation")?.append(div);

        const btnSolution = document.querySelector(".solution-btn");
        btnSolution?.addEventListener("click", function() {
            const answerDiv = document.createElement("div");
            answerDiv.classList.add(`solution${cpt}`);
            answerDiv.textContent = `${answer(element)}`;
            document.querySelector(".solution")?.append(answerDiv);
            showSolution();
        });
        cpt++;
    });
    cpt = 1;
    let cptAnwser = shown_problem_index;
    console.log(`Opération n° ${cpt}`);
    document.getElementById(`Opération n°${shown_problem_index}`)?.classList.remove("hide");
    document.querySelector(".next-btn")?.addEventListener("click", function() {
        if (cpt === 12) {
            cpt = 0;
        }
        if (cptAnwser === 13) {
            cptAnwser = 0;
        }
        showNextAnswer(cptAnwser);
        cpt++;
        cptAnwser++;
        console.log(`Opération n° ${cpt}`);
    });
}

// -------------------------------------------
document.getElementById("p")?.classList.remove("hide");
function showNextAnswer(int) {
    console.log(int);
    if (int === 12) {
        document.getElementById(`Opération n°${12}`)?.classList.add("hide");
        document.getElementById(`Opération n°${1}`)?.classList.remove("hide");
    } else {
        document.getElementById(`Opération n°${int}`)?.classList.add("hide");
        document.getElementById(`Opération n°${int + 1}`)?.classList.remove("hide");
    }
}
function showSolution() {
    const solution = document.querySelector(".solution");
    solution?.classList.remove("hide");
}