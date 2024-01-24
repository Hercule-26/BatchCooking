"use strict";

const planning = document.getElementById("planning-container");
const recipeContainer = document.getElementById("recipe-container");
const shoppingList = document.getElementById("shopping-list-container");
const btnRetour = document.getElementsByClassName("button_retour");
const btnShopping = document.getElementById("button_shopping_list");

showPlanningAction();

for (let index = 0; index < btnRetour.length; index++) {
    btnRetour[index]?.addEventListener("click", function () {
        showPlanningAction();
    });
}

btnShopping?.addEventListener("click", function () {
    showShoppingListAction();
});

//------------------------------------------------------
/**
 * @param {object} recipes
 * @param {object} units
 * @param {Object} data
 * @returns Retourne une fonction
 */
function getshowRecipeAction(recipes, units, data) {
    return function () {
        recipeContainer?.classList.remove("hide_container");
        planning?.setAttribute("class", "hide_container");
        shoppingList?.setAttribute("class", "hide_container");
        fillRecipe(recipes, units, data);
    };
}

function showPlanningAction() {
    planning?.classList.remove("hide_container");
    recipeContainer?.setAttribute("class", "hide_container");
    shoppingList?.setAttribute("class", "hide_container");
}

function showShoppingListAction() {
    shoppingList?.classList.remove("hide_container");
    planning?.setAttribute("class", "hide_container");
    recipeContainer?.setAttribute("class", "hide_container");
}


// Pour chaque repas ajouter dans le calendrier.

let arrayCards = new Array();

const jours = Array.from(document.getElementsByClassName("jours"));
jours.forEach(jour => {
    jour.addEventListener("click", function () {
        const div = document.createElement("div");
        div.classList.add("repas_list");
        div.classList.add(idOfCard);
        div.addEventListener("click", function (e) {
            // Pour acceder à la deuxière classe qui est à l'indice 1
            arrayCards[parseInt(`${div.classList.item(1)}`)] -= 1;
            div.remove();
            removeClassSelected();
            e.stopPropagation();
        })

        if (selectedCard != undefined) {
            const cardName = selectedCard.querySelector(".title_cards");
            div.textContent = cardName.innerHTML;
            jour.append(div);
            arrayCards[parseInt(`${idOfCard}`)] += 1;
            selectedCard.classList.add("sceduled");
            removeClassSelected();
        }
    })
});

function removeClassSelected() {
    for (let i = 0; i < arrayCards.length; i++) {
        if (arrayCards[i] == 0) {
            document.getElementById(`${i}`)?.classList.remove("sceduled");
        }
    }
    console.log(arrayCards);
}

//  Ajouter des éléments à la liste de course de manière dynamique
let shoppingSet = new Set();
let shoppingCatSet = new Set();

function fillShoppingList(data) {
    //  Je vide le tableau avant de le remplir
    const removeDiv = document.querySelectorAll(".removeBeforeNew");
    removeDiv.forEach((element) => {
        element.remove();
    });
    //  Parcoure le tableau modifier avec le calendrier
    shoppingSet.clear();
    shoppingCatSet.clear();
    for (let i = 0; i < arrayCards.length; i++) {
        if (arrayCards[i] > 0) {
            data.recipes[i].ingredients.forEach(ingredients => {
                let nameIngredient = ingredients.ingredientName;
                let ingredientCat = data.ingredientsData[ingredients.ingredientName].category;
                shoppingSet.add(nameIngredient);
                if (ingredientCat == "") {
                    shoppingCatSet.add("other");
                } else {
                    shoppingCatSet.add(ingredientCat);
                }
            });
        }
    }
    //  Ce foreach est la pour créer le nombre de catégorie qu'il faut
    shoppingCatSet.forEach(cat => {
        const shoppingContainer = document.getElementById("list");

        const div = document.createElement("div");
        div.setAttribute("id", cat);
        div.classList.add("removeBeforeNew");
        div.classList.add("divList");

        const h2 = document.createElement("h2");
        h2.textContent = data.categories[cat];

        const ul = document.createElement("ul");
        ul.setAttribute("id", cat + "-list");

        div.append(h2);
        div.append(ul);
        shoppingContainer?.append(div);
    });
    //  Ajouter les ingrédient dans la bonne liste
    shoppingSet.forEach(ingredient => {
        let catName = data.ingredientsData[ingredient].category;
        if (catName == "") {
            catName = "other";
        }
        const catList = document.getElementById(catName);
        const li = document.createElement("li");
        li.textContent = data.ingredientsData[ingredient].fr;
        catList?.append(li);
    });
}