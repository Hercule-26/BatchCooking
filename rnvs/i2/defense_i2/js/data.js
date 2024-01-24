"use strict";

//import { data } from "jquery";

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
}

// todo : ajouter éventuellement ici
// rnvs : ce qui suit n'a pas vraiment de lien avec ce qui est demandé... ou en est très loin
let int = random_int(0, 11);

const collection = document.getElementsByClassName("title");
const tableau = Array.from(collection);
//tableau[0].textContent += (int + 1);

const operation = document.getElementsByClassName("operation");

const elementOriginal = document.querySelector(".problem");
//const elementClone = elementOriginal.cloneNode(true);
//elementOriginal?.classList.remove("hide");

const collectionHide = document.getElementsByClassName("hide");
console.log('collectionHide');
console.log(collectionHide);

const tableauHide = [...collectionHide];// Array.from(collectionHide);
console.log('tableauHide');
console.log(tableauHide);
//tableauHide[0].classList.remove("hide");