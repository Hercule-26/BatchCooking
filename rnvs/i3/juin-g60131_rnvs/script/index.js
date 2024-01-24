"use strict";

fetch("https://git.esi-bru.be/api/v4/projects/40922/repository/files/recipes-it3.json/raw")
    .then((response) => response.json())
    .then(loadCards)
    .catch(alert);

    let selectedCard; // la carte qui à été séléctionner seras mise dans cette variable
    let idOfCard;
/**
  * @param {object} data
  */
function loadCards(data) {
    const supplyName = new Map([["starches", "Féculent"],
                            ["proteins", "Protéines"],
                            ["vegetables", "Légumes"],
                        ]);
    const cardContainer = document.getElementById("container_by_card");
    let cptCard = 0; // pour mettre un id qui seras le numéro de la carte.
    data.recipes.forEach(recipe => {
        const cards = document.createElement("div");
        cards.classList.add("cards");
        cards.setAttribute("id", cptCard);

        const imageCard = document.createElement("img");
        imageCard.classList.add("img_card");
        imageCard.src = recipe.imageLink;

        const btnRecipe = document.createElement("button");
        btnRecipe.classList.add("show_recipes");
        btnRecipe.addEventListener("click", getshowRecipeAction(recipe, data.units, data)); // Modifie la recette
        const imgBtnRecipe = document.createElement("img");
        imgBtnRecipe.classList.add("logos_buttons");
        imgBtnRecipe.src = "img/cards/Logo-info.jfif";
        imgBtnRecipe.title = "Information";
        imgBtnRecipe.alt = "Information";
        btnRecipe?.append(imgBtnRecipe);

        const btnPlanning = document.createElement("button");
        btnPlanning.classList.add("ajout_planning");

        const imgBtnPlanning = document.createElement("img");
        imgBtnPlanning.classList.add("logos_buttons");
        imgBtnPlanning.src = "img/cards/Logo-planning.jfif";
        imgBtnPlanning.title = "Planning";
        imgBtnPlanning.alt = "Planning";
        btnPlanning?.append(imgBtnPlanning);

        const btnSection = document.createElement("section");
        btnSection.classList.add("buttons_position");
        btnSection?.append(btnRecipe);
        btnSection?.append(btnPlanning);

        const titreCard = recipe.recipeName;
        const titre = document.createElement("p");
        titre.classList.add("title_cards");
        titre.textContent = titreCard;

        const informations = document.createElement("section");
        informations.classList.add("informations");
        
        const divSet = new Set();
        recipe.ingredients.forEach(ingredient => {
            const name = ingredient.ingredientName;
            const intakes = data.ingredientsData[name].intakes;
            intakes.forEach(intakeElement => {
            divSet.add(intakeElement);
           });
        });
        divSet.forEach(supply => {
            const ingredients = document.createElement("div");
            ingredients.classList.add(supply);
            ingredients.textContent = supplyName.get(supply);
            informations.append(ingredients);
        });
        cards?.append(imageCard);
        cards?.append(btnSection);
        cards?.append(titre);
        cards?.append(informations);
        cardContainer?.append(cards);
        btnPlanning.addEventListener("click", function() {
            selected(cards);
        });
        cptCard += 1; // pour donner un id qui est l'indice de la carte.
        arrayCards.push(0);
    });

    btnShopping?.addEventListener("click", function() {
        fillShoppingList(data);
    });
}


/**
 * @param {Object} recipes
 * @param {Object} units
 * @param {Object} data
 */
function fillRecipe(recipes, units, data) {
    const recipeTitle = document.getElementById("recipe_title");
    recipeTitle.textContent = recipes.recipeName;
    const imageRecipe = document.getElementById("image_recipe");
    imageRecipe.src = recipes.imageLink;
    const ingredients = document.getElementById("ingredients");
    const step = document.getElementById("etapes");

    // Cette boucle permet de vider la liste des ingrédients et des étapes
    // avant de le remplis avec la recette appelé
    const removeLi = document.querySelectorAll(".remove-before-new");
    removeLi.forEach((element) => {
        element.remove();
    });

    // Boucle pour tout les ingrédients
    recipes.ingredients.forEach((element) => {
        const li = document.createElement("li");
        li.classList.add("remove-before-new");
        if (element.quantity === undefined && element.unit === undefined) {
            li.textContent = data.ingredientsData[element.ingredientName].fr;
        } else {
            li.textContent = `${data.ingredientsData[element.ingredientName].fr} : ${element.quantity} ${units[element.unit]}`;
        }
        ingredients?.append(li);
    });
    // Boucle pour chacune des étapes
    recipes.steps.forEach(element => {
        const li = document.createElement("li");
        li.classList.add("remove-before-new");
        li.textContent = element;
        step?.append(li);
    });
}

// Pour mettre le conture de la carte en rouge pour la carte 
function selected(card) {
    if(selectedCard === undefined) {
        selectedCard = card;
        idOfCard = card.id;
        selectedCard.classList.add("selected");
        console.log(selectedCard);
    } else {
        selectedCard.classList.remove("selected");
        selectedCard = card;
        idOfCard = card.id;
        selectedCard.classList.add("selected");
        console.log(selectedCard);
    }
}
  