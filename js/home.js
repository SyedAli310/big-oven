const searchResultsDiv = document.querySelector('.g-meal-search-results') 
const mealOfTheDayDiv = document.querySelector('.meal-of-the-day') 


async function getRandomMeal(){
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    const data  = await res.json();
    console.log(data.meals);

    const searchedMeal = document.createElement("div");
    searchedMeal.classList.add("searched-meal-div");
    searchedMeal.innerHTML = 
    `
        <p id='ing-tag'>#${data.meals[0].strCategory} &nbsp; #${data.meals[0].strArea}</p>
        <img src='${data.meals[0].strMealThumb}' class='searched-meal-img-2' style='height:100px; width:100px;' />
        <h4>${data.meals[0].strMeal}</h4>
        <p style='color:#743ad5'>ID: ${data.meals[0].idMeal}</p>
    `
    mealOfTheDayDiv.append(searchedMeal)
}

window.onload = getRandomMeal()

async function searchRecipes(query){
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+query)
    const data  = await res.json();

    console.log(data.meals);
    searchResultsDiv.innerHTML = ''
    if(data.meals != null){
        data.meals.forEach((el) => {
            const searchedMeal = document.createElement("div");
            searchedMeal.classList.add("searched-meal-div");
            searchedMeal.innerHTML = 
            `
                <p id='ing-tag'>#${el.strCategory} &nbsp; #${el.strArea}</p>
                <img src='${el.strMealThumb}' class='searched-meal-img-2' style='height:100px; width:100px;' />
                <h4>${el.strMeal}</h4>
                <p style='color:#743ad5'>ID: ${el.idMeal}</p>
            `
            searchResultsDiv.append(searchedMeal);
        });
    }
    else{
        searchResultsDiv.append(`No results for ${query}`);
    }
}

let x = null
$("#main-search-text").keyup((e)=>{
    let searchedText = $(e.target).val()
    searchedText = searchedText.toLowerCase()
    //console.log(searchedText)

    clearTimeout(x)
    x = setTimeout(()=>{
        if(searchedText!='' && searchedText!=' '){
            searchRecipes(searchedText)
        }
     },500)
})

