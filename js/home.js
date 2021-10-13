
async function getRandomMeal(){
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    const data  = await res.json();
    console.log(data.meals);
}

async function searchRecipes(query){
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+query)
    const data  = await res.json();
    console.log(data.meals);
}




