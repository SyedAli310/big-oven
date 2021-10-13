const output = document.querySelector(".output");
const spinner = `<div class="spinner"><div class="square-1"></div><div class="square-2"></div><div class="square-3"></div><div class="square-4"></div></div>`;
const loadingMsg = `<span style="color:black; background:white; padding:10px; margin:10px 0px; border-radius:4px;">
Please wait
<span class="dot-1">.</span>
<span class="dot-2">.</span>
<span class="dot-3">.</span>
</span>`;

async function getAllIngredients() {
  output.innerHTML = spinner;
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  const data = await res.json();
  //console.log(data.meals);
  data.meals.sort(() => Math.random() - 0.5);
  return data.meals;
}

async function getRecipeByIngredient(ingredient) {
    console.log('inside modal getter');
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = "";
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + ingredient
  );
  const data = await res.json();
  //console.log(data.meals);
  if (data.meals != null) {
    length = data.meals.length;
    data.meals.forEach((el) => {
      const searchedMeal = document.createElement("div");
      searchedMeal.classList.add("searched-meal-div");
      searchedMeal.innerHTML = `
            <p id='ing-tag'>#${ingredient}</p>
            <img src='${el.strMealThumb}' class='searched-meal-img' style='height:100px; width:100px;' />
            <h4>${el.strMeal}</h4>
            <p style='color:#743ad5'>ID: ${el.idMeal}</p>
            `;
      modalBody.append(searchedMeal);
    });
    showModal(
      `<span style='color:#1b1b1b;'>${length}</span> Recipe(s) include <span style='color:#1b1b1b;'>${ingredient}</span>
       <img src='https://www.themealdb.com/images/ingredients/${ingredient}.png' 
        style='height:50px' width:50px; border-radius:100%; />
      `
    );
  } else {
    modalBody.innerHTML = `<h2 style='color:crimson; text-align:center;'>No recipies found for <i style='color:#743ad5'>'${ingredient}'</i><br><p style='font-size:small; font-weight:light; color:grey;'>Only the main ingredients are listed here, <i style='color:#743ad5'; font-size:larger; !important>'${ingredient}'</i> might still be a secondary ingredient for several recipies.</p></h2>`;
    showModal("☹️.....");
  }
}

function showModal(head) {
  const modalBg = document.querySelector(".modal-bg");
  const modal = document.querySelector(".modal");
  const modalHead = document.querySelector(".modal-header");
  const modalBody = document.querySelector(".modal-body");
  modalHead.innerHTML = `<h2>${head}</h2>`;
  //modalBody.innerHTML = body;
  modalBg.style.display = "grid";
  modalBg.style.placeItems = "center";
  modal.style.visibility = "visible";
  $(".modal").css({ animation: "my-animation 0.25s ease" });
  document.querySelector("#close-modal").addEventListener("click", () => {
    modalBg.style.display = "none";
  });
}



function showIngredients(data){
    output.innerHTML = "";
    const fallbackImg = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-SKSRQBe0jiXkAO6FIAvUdpGKXcztiPMU9Q&usqp=CAU`;
    data.forEach((el) => {
        const ingredient = document.createElement("span");
        ingredient.classList.add("ingredient-span");
        ingredient.innerHTML = `<a class='ing-links'>${el.strIngredient}</a>`;
        output.append(ingredient);
      });
}

function searchIngredient(data,searchedText){
    $(".output").removeClass("not-viewed");
    $(".view-all span").text("view less");

    
    let searchRes = []
    data.forEach(value =>{
        //console.log(value);
        if(value.strIngredient.toLowerCase().match(searchedText)){
            searchRes.push(value)
        }
        output.innerHTML = loadingMsg;
    })
    if(searchRes.length == 0){
        searchRes.push({strIngredient:'No results found!'})
    }
    setTimeout(()=>{
        console.log(searchRes);
        showIngredients(searchRes)
        clickEventBinder()
    },1000)
    
}

function clickEventBinder() {
    $(".ing-links").on("click", (e) => {
        //console.log(e.target.text);
        getRecipeByIngredient(e.target.text);
      });
}

getAllIngredients().then((data) => {
  $("#total-ingredients").text(`Total: ${data.length}`);

  showIngredients(data) 
  clickEventBinder()

  $(".view-all").on("click", (e) => {
    $("#view-all-loader").html(loadingMsg);
    $("#view-all-loader").css("visibility", "visible");
    $(".view-all").attr("disabled", true);
    $(".view-all").css("opacity", 0.5);
    setTimeout(() => {
      $("#view-all-loader").html("");
      $("#view-all-loader").css("visibility", "hidden");
      $(".output").toggleClass("not-viewed");
      if ($(".view-all span").text() == "view all") {
        //console.log("hello1");
        $(".view-all span").text("view less");
      } else if ($(".view-all span").text() == "view less") {
        //console.log("hello2");
        $(".view-all span").text("view all");
      }
      $(".view-all").removeAttr("disabled");
      $(".view-all").css("opacity", 1);
    }, 2000);
  });

  
  //search functionality
  $("#ing-search-form").on("submit", (e) => {
      e.preventDefault();
      let searchedText = $('#ing-search-text').val()
      searchedText = searchedText.toLowerCase()
      console.log(searchedText)
      searchIngredient(data,searchedText)
    });

    let x = null
   $("#ing-search-text").keyup((e)=>{
       let searchedText = $(e.target).val()
       searchedText = searchedText.toLowerCase()
       console.log(searchedText)
       clearTimeout(x)
       x = setTimeout(()=>{
           searchIngredient(data,searchedText)
        },250)
   })
});

$('.search-btn').on('click',(e)=>{
    // $('#ing-search-form').css('display','flex')
    // $('#ing-search-form').css({transform:'translateY(0)'})
    $('#ing-search-form').toggleClass('search-hide')
    $('#ing-search-text').select()
})
$('#close-search-bar').on('click',(e)=>{
    // $('#ing-search-form').css('display','flex')
    // $('#ing-search-form').css({transform:'translateY(0)'})
    $('#ing-search-form').toggleClass('search-hide')
    
})
