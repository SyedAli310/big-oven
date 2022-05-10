const recipeViewWrapper = document.getElementById("recipe-view-wrapper");

demoMeal = [
  {
    idMeal: "52955",
    strMeal: "Egg Drop Soup",
    strDrinkAlternate: null,
    strCategory: "Vegetarian",
    strArea: "Chinese",
    strInstructions:
      "In a wok add chicken broth and wait for it to boil.\r\nNext add salt, sugar, white pepper, sesame seed oil.\r\nWhen the chicken broth is boiling add the vegetables to the wok.\r\nTo thicken the sauce, whisk together 1 Tablespoon of cornstarch and 2 Tablespoon of water in a bowl and slowly add to your soup until it's the right thickness.\r\nNext add 1 egg slightly beaten with a knife or fork and add it to the soup slowly and stir for 8 seconds\r\nServe the soup in a bowl and add the green onions on top.",
    strMealThumb: "https://www.themealdb.com/images/media/meals/1529446137.jpg",
    strTags: "Soup,Baking,Calorific",
    strYoutube: "https://www.youtube.com/watch?v=9XpzHm9QpZg",
    strIngredient1: "Chicken Stock",
    strIngredient2: "Salt",
    strIngredient3: "Sugar",
    strIngredient4: "Pepper",
    strIngredient5: "Sesame Seed Oil",
    strIngredient6: "Peas",
    strIngredient7: "Mushrooms",
    strIngredient8: "Cornstarch",
    strIngredient9: "Water",
    strIngredient10: "Spring Onions",
    strIngredient11: "",
    strIngredient12: "",
    strIngredient13: "",
    strIngredient14: "",
    strIngredient15: "",
    strIngredient16: "",
    strIngredient17: "",
    strIngredient18: "",
    strIngredient19: "",
    strIngredient20: "",
    strMeasure1: "3 cups ",
    strMeasure2: "1/4 tsp",
    strMeasure3: "1/4 tsp",
    strMeasure4: "pinch",
    strMeasure5: "1 tsp ",
    strMeasure6: "1/3 cup",
    strMeasure7: "1/3 cup",
    strMeasure8: "1 tbs",
    strMeasure9: "2 tbs",
    strMeasure10: "1/4 cup",
    strMeasure11: "",
    strMeasure12: "",
    strMeasure13: "",
    strMeasure14: "",
    strMeasure15: "",
    strMeasure16: "",
    strMeasure17: "",
    strMeasure18: "",
    strMeasure19: "",
    strMeasure20: "",
    strSource: "https://sueandgambo.com/pages/egg-drop-soup",
    strImageSource: null,
    strCreativeCommonsConfirmed: null,
    dateModified: null,
  },
];

const getMealById = async (id) => {
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await res.json();
    return data.meals;
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

const makeTagSpans = (tags) => {
  if (!tags) {
    return "No tags found";
  } else {
    const tagsArr = tags.split(",");
    const tagSpans = tagsArr.map((tag) => {
      return `<span class="tag">${tag}</span>`;
    });
    return tagSpans.join("&nbsp;");
  }
};

const getIngredientsWithMeasures = (mealObj) => {
  const indregents = [];
  const measures = [];
  const ingredientsWithMeasures = [];

  Object.keys(mealObj).forEach((key) => {
    if (key.includes("strIngredient") && mealObj[key]) {
      indregents.push({ key: mealObj[key] });
    }
    if (key.includes("strMeasure") && mealObj[key]) {
      measures.push({ key: mealObj[key] });
    }
  });

  for (let k = 0; k < indregents.length; k++) {
    ingredientsWithMeasures.push({
      ingredient: indregents[k].key,
      measure: measures[k].key,
    });
  }

  return ingredientsWithMeasures;
};

const renderRecipeView = async () => {
  recipeViewWrapper.innerHTML = "loading...";
  const mealID = new URLSearchParams(window.location.search).get("id");
  const meal = await getMealById(mealID);
  //   const meal = demoMeal;
  if (!meal || meal.length === 0) {
    recipeViewWrapper.innerHTML = `
     <h3 style='text-align:center; margin-top:2.5rem; color:crimson;'>No meal found</h3>
        <h4 style='text-align:center;'>
        <a href='./index.html' style='color:royalblue;'>Go back to home</a>
        </h4>

    `;
    return;
  }

  const ingredientsWithMeasures = getIngredientsWithMeasures(meal[0]);
  console.log(ingredientsWithMeasures);
  recipeViewWrapper.innerHTML = `
  <div class='meal-info-wrapper'>
    <div class='meal-details'>
        <div class='meal-card'>
            <div class='meal-img'>
                <img src='${
                  meal[0].strMealThumb
                }' class='recipe-view-img' style='height:100px; width:100px;' />
            </div>
            <div class='meal-info'>
                <h4>${meal[0].strMeal}</h4>
                <p class='recipe-tags'> Indregients :  ${
                  ingredientsWithMeasures.length
                }</p>
                <p class='recipe-tags'> Tags :  ${makeTagSpans(
                  meal[0].strTags
                )}</p>
            </div>
        </div>
        <div class='instructions'>
            <h2 class='title'  style='margin-bottom:0;'>Instructions</h2>
            <p>${meal[0].strInstructions}</p>
        </div>
    </div>
    <div class='vertical-line'></div>
    <div class='meal-ingredients'>
        <h2 class='title'>Ingredients</h2>
        <ul class='ingredients-list'>
            ${ingredientsWithMeasures
              .map((ingredient) => {
                return `<li><ion-icon name="arrow-forward-outline"></ion-icon> ${ingredient.ingredient} - ${ingredient.measure}</li>`;
              })
              .join("")}
        </ul>
    </div>
  </div>
  <div class="separator"></div>
    <div class='meal-video-wrapper'>
        <h2 class='title'>Watch video tutorial for <span style='color:royalblue;'>${
          meal[0].strMeal
        }</span></h2>
        <iframe width="420" height="315" src="${getEmbedUrl(
          meal[0].strYoutube
        )}" frameborder="0" allowfullscreen></iframe>
    </div>    
      `;
};

window.onload = renderRecipeView();
