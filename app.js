const cat = document.querySelector(".cat");
const spinner = `<div class="spinner"><div class="square-1"></div><div class="square-2"></div><div class="square-3"></div><div class="square-4"></div></div>`;
const loadingMsg = `<span style="color:black; background:white; padding:5px; margin:10px 0px; border-radius:4px;">
Please wait
<span class="dot-1">.</span>
<span class="dot-2">.</span>
<span class="dot-3">.</span>
</span>`

async function getData() {
  cat.innerHTML = spinner
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  const resData = await res.json();
  //console.log(resData);
  categories = resData.categories;
  //console.log(categories);
  cat.innerHTML = "";
  categories.forEach((category) => {
    const div = document.createElement("div");
    div.classList.add("container");
    div.innerHTML = `<h2>${category.strCategory}</h2><img src='${category.strCategoryThumb}' /><div class='view-more'><p class='info'><u>${category.strCategory}</u></p><br><button class='view-more-btn' name="${category.strCategory}" title="${category.strCategoryDescription}">about</button>&nbsp;<button class='view-more-btn' title="Explore Category *under dev -coming soon!*" name='Oops!'>explore</button></div>`;
    cat.appendChild(div);
  });
}

function showModal(head, body) {
    const modalBg = document.querySelector(".modal-bg");
    const modal = document.querySelector(".modal");
    const modalHead = document.querySelector(".modal-header");
    const modalBody = document.querySelector(".modal-body");
    modalHead.innerHTML = `<h2>${head}</h2>`;
    modalBody.innerHTML = `<p>${body}</p>`;
    modalBg.style.display = "grid";
    modalBg.style.placeItems = "center";
    modal.style.visibility = "visible";
    $(".modal").css({ animation: "my-animation 0.25s ease" });
    document.querySelector("#close-modal").addEventListener("click", () => {
      modalBg.style.display = "none";
    });
}

getData().then(()=>{
    function setRadius() {
    let allDivs = document.querySelectorAll(".container");
      //console.log(allDivs);
      for (let i = 0; i < allDivs.length; i++) {
        allDivs[i].style.borderRadius = `${Math.ceil(
          Math.random() * 100 + 1
        )}% ${Math.ceil(Math.random() * 100 + 1)}% ${Math.ceil(
          Math.random() * 100 + 1
        )}% ${Math.ceil(Math.random() * 100 + 1)}% / ${Math.ceil(
          Math.random() * 100 + 1
        )}% ${Math.ceil(Math.random() * 100 + 1)}% ${Math.ceil(
          Math.random() * 100 + 1
        )}% ${Math.ceil(Math.random() * 100 + 1)}%`;
        let colors = ["#743ad5", "#d53a9d"];
        allDivs[i].style.border = `2px solid ${
          colors[Math.floor(Math.random() * colors.length)]
        }`;
      }
    }
    const all = document.querySelectorAll(".view-more-btn");
    for (let i = 0; i < all.length; i++) {
      all[i].addEventListener("click", (e) => {
        showModal(e.target.name, e.target.title);
        //alert('About Category - '+e.target.title);
      });
    }
    setRadius();
    $(".container").on("mouseenter", (e) => {
      setRadius();
    });
})
.catch(err=>{
    console.log(err);
})



