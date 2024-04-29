// $(document).ready(function(){

//     $('.loading').slideUp('500',function(){
//         $('.loading').remove()
//     })



// })


// $(function(){
//     $('.loading').slideUp('500',function(){
//         $('.loading').remove()
//     })

// })


let phone =document.querySelector('#input2');
let password = document.querySelector('#input3');
let email = document.querySelector('#input4');
let age = document.querySelector('#input5');
 let repass = document.querySelector('#input6');
 let submitBtn = document.querySelector('.submit');

closeNav();

//   
let layer = document.querySelector(".search");

$(".whole-nav i ").click(function () {
  let sideWidth = $(".side-inner").innerWidth();

  if ($(".whole-nav").css("left") == "0px") {
    $(".whole-nav ").animate({ left: -sideWidth }, 500);

    
    
  } else {
    $(".whole-nav ").animate({ left: "0px" }, 500);
   
  }

  $(".iconny").removeClass("fa-bars-staggered");
  $(".iconny").addClass("fa-x");
 
  
});

function closeNav() {
  let sideWidth = $(".side-inner").innerWidth();

  if ($(".whole-nav").css("left") == "0px") {
    $(".whole-nav ").animate({ left: -sideWidth }, 500);
  } else {
    $(".whole-nav ").animate({ left: "0px" }, 500);
  }
}

// Function to fetch data from the MealDB API
async function fetchMealData() {
  try {
    $(".loading").slideDown(0)
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=`
    );
    const data = await response.json();
    findPageMeals(data.meals);
   
    
    $(".loading").slideUp(800)
    // Process the fetched data as needed
  } catch (error) {
    console.error("Error fetching meals:", error);
  }
}

// Call the fetchMealData function to fetch data from the API


function findPageMeals(container) {
    // document.querySelector(".aklat").insertAdjacentHTML('beforeend', "");
  let box = "";
  for (let i = 0; i < container.length; i++) {
    box += `  <div class=" photo  relative overflow-hidden displayed  rounded-lg " onclick="getIdMeal('${container[i].idMeal}')" >
    <div class="  group transition-all  ease-in-out cursor-pointer fit" >
      <img src="${container[i].strMealThumb}" alt="meals photos" class="" >
      <div class=" bg-white/75 absolute top-0 left-0 right-0 bottom-0 translate-y-[100%] group-hover:translate-y-[0%]   duration-700 rounded-lg  fit ">
      <h3 class="text-black text-center pt-24 font-bold z-10 text-lg  ">${container[i].strMeal}</h3>
      </div>
    </div>
  
 </div>`;


  }

  document.querySelector(".aklat").innerHTML = box;


}


fetchMealData();



function searchMeals() {
  layer.addEventListener("click", function (e) {
    document.querySelector(".search-input").classList.remove("invisible");
    closeNav();
    document.querySelector(".aklat").innerHTML = "";
    
  });

  document
    .querySelector("#first-input")
    .addEventListener("keyup", function (e) {
      let search = e.target.value;
      searchByName(search);
      
      
    
    });
}

searchMeals();

async function searchByName(mealName) {
  try {
    $(".loading").slideDown(0)
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
    );
    const data = await response.json();


    let container = data.meals;
    

    let box = "";
        for (let i = 0; i < container.length; i++) {
          box += ` <div class=" photo  relative overflow-hidden displayed  rounded-lg "  onclick="getIdMeal('${container[i].idMeal}')" >
          <div class="  group transition-all  ease-in-out cursor-pointer fit">
            <img src="${container[i].strMealThumb}" alt="meals photos" class="" >
            <div class=" bg-white/75 absolute top-0 left-0 right-0 bottom-0 translate-y-[100%] group-hover:translate-y-[0%]   duration-700 rounded-lg  fit ">
            <h3 class="text-black text-center pt-24 font-bold z-10 text-lg  ">${container[i].strMeal}</h3>
            </div>
          </div>
        
       </div>`;
        }
        document.querySelector(".aklat").innerHTML = box;
        
    

        $(".loading").slideUp(800)
    // Process the fetched data as needed
  } catch (error) {
    console.error("Error fetching meals:", error);
  }
}


// $(".links h3").animate({
//     top: 300
// }, 500)

// function openSideNav() {
//     $(".whole-nav").animate({
//         left: 0
//     }, 500)


//     $(".iconny").removeClass("fa-bars-staggered");
//     $(".iconny").addClass("fa-x");


//     for (let i = 0; i < 5; i++) {
//         $(".links h3").eq(i).animate({
//             top: 0
//         }, (i + 5) * 100)
//     }
// }




async function getIdMeal(mealId){
    try {
        $(".loading").slideDown(0)
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
        );
        const data = await response.json();
        
       let snacks = data.meals;
        // Log the fetched data
        console.log(snacks);
        document.querySelector(".aklat").innerHTML = "";
        displayDetails(snacks)

        
        $(".loading").slideUp(800)
      } catch (error) {
        console.error("Error fetching meals:", error);
      }

    
}


// getIdMeal('53060');

function displayDetails(container){
    
    document.querySelector(".search-input").classList.add("invisible");
for(i=0;i<container.length;i++){
    let ingredients = [container[i].strMeasure1,container[i].strMeasure2,
    container[i].strIngredient3,container[i].strIngredient4,container[i].strIngredient5
    ,container[i].strIngredient6,container[i].strIngredient7,container[i].strIngredient8,container[i].strIngredient9,container[i].strIngredient10];
    document.querySelector('.aklat').innerHTML = ` <div class="detail flex gap-10 ms-32">
    
    <div class="image w-uu ">
      <img src="${container[0].strMealThumb}" class="w-full rounded-lg" />
      <h3 class="text-white text-[50px] ">${container[0].strMeal}</h3>
    </div>
    <div class="description w-[45%] ">
      <h2 class="text-white font-bold text-[55px]">Instructions</h2>
      <p class="text-white">
      ${container[0].strInstructions}
      </p>
      <h5 class="text-white font-bold text-[25px]">Area : ${container[0].strArea}</h5>
      <h5 class="text-white font-bold text-[25px] mb-8">Category : ${container[0].strCategory}</h5> 
      <div class=" font-bold text-[35px] flex flex-wrap ">
      <h5 class="text-white me-2 text-[25px] mb-2">Recipes :</h5>  
      <div class="flex flex-wrap gap-3">
      <h6 class="text-black bg-blue-200 rounded-lg me-2 text-[20px] font-normal px-4">${ingredients[0]}</h6>
      <h6 class="text-black bg-blue-200 rounded-lg me-2 text-[20px] font-normal px-4">${ingredients[1]}</h6>
      <h6 class="text-black bg-blue-200 rounded-lg me-2 text-[20px] font-normal px-4">${ingredients[2]}</h6>
      <h6 class="text-black bg-blue-200 rounded-lg me-2 text-[20px] font-normal px-4">${ingredients[3]}</h6>
      <h6 class="text-black bg-blue-200 rounded-lg me-2 text-[20px] font-normal px-4">${ingredients[4]}</h6>
      <h6 class="text-black bg-blue-200 rounded-lg me-2 text-[20px] font-normal px-4">${ingredients[5]}</h6>
      <h6 class="text-black bg-blue-200 rounded-lg me-2 text-[20px] font-normal px-4">${ingredients[6]}</h6>
      <h6 class="text-black bg-blue-200 rounded-lg me-2 text-[20px] font-normal px-4">${ingredients[7]}</h6>
      <h6 class="text-black bg-blue-200 rounded-lg me-2 text-[20px] font-normal px-4">${ingredients[8]}</h6>
      <h6 class="text-black bg-blue-200 rounded-lg me-2 text-[20px] font-normal px-4">${ingredients[9]}</h6>

      </div>
      </div> 

      <h5 class="text-white me-2 text-[25px] font-bold mt-8 mb-6">Tags :</h5>
      <div class="links">
      <button class="bg-green-600 text-white px-3 rounded-md py-3 me-2" id="source"><a href="${container[0].strSource}" target="_blank" class="link1">Source</a></button>
      <button class="bg-red-600 text-white px-3 rounded-md py-3"><a href="${container[0].strYoutube}" target="_blank" class="link1">Youtube</a></button>
      </div>
      
      
      
     
    </div>
  </div>`


    
}
  
  
  
 

}














// function displayDetails(container){

//     let box = "";
//     for (let i = 0; i < container.length; i++) {
//       box += ` <div class=" photo  relative overflow-hidden displayed  rounded-lg ">
//       <div class="  group transition-all  ease-in-out cursor-pointer fit">
//         <img src="${container[i].strMealThumb}" alt="meals photos" class="" >
//         <div class=" bg-white/75 absolute top-0 left-0 right-0 bottom-0 translate-y-[100%] group-hover:translate-y-[0%]   duration-700 rounded-lg  fit ">
//         <h3 class="text-black text-center pt-24 font-bold z-10 text-lg  ">${container[i].strMeal}</h3>
//         </div>
//       </div>
    
//    </div>`;
//     }
//     document.querySelector(".aklat").innerHTML = box;
//     getIdMeal(container[i].idMeal);




// }


async function getCategoriesData(){
    
    try {
        $(".loading").slideDown(0)
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/categories.php`
        );
        
        const data = await response.json();
         let categories = data.categories;
        
        
         
       displayCategories(categories)
        
       $(".loading").slideUp(800)
       
    
        // Process the fetched data as needed
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
}
//when to call it in aright way



function displayCategories(container){
    document.querySelector('.category').addEventListener('click',function(){
        
        document.querySelector(".search-input").classList.add("invisible");
        
        closeNav();

        let box = "";
        for (let i = 0; i < container.length; i++) {
          box += `<div class=" photo  relative overflow-hidden displayed  rounded-lg "  onclick="getCategoriesMeals('${container[i].strCategory}')" >
          <div class="  group transition-all  ease-in-out cursor-pointer fit">
            <img src="${container[i].strCategoryThumb}" alt="meals photos" class="" >
            <div class=" bg-white/75 absolute top-0 left-0 right-0 bottom-0 translate-y-[100%] group-hover:translate-y-[0%]   duration-700 rounded-lg  fit ">
            <h3 class="text-black text-center pt-24 font-bold z-10 text-lg  ">${container[i].strCategory}</h3>
            </div>
          </div>
        
       </div> `;
      
      
        }
      
        document.querySelector(".aklat").innerHTML = box;
      
      

    })


}

getCategoriesData();




async function getCategoriesMeals(category){
   
    
    try {
        $(".loading").slideDown(0)
        const response = await fetch( `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}` );
        const data = await response.json();
     
        
        // console.log(data.meals);
        document.querySelector(".aklat").innerHTML = "";
        
       displayCategoriesMeals(data.meals)
       
       $(".loading").slideUp(800)
      
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
}





function displayCategoriesMeals(container){
    let box = "";
        for (let i = 0; i < container.length; i++) {
          box += `  <div class=" photo  relative overflow-hidden displayed  rounded-lg " onclick="getIdMeal('${container[i].idMeal}')"  >
          <div class="  group transition-all  ease-in-out cursor-pointer fit">
            <img src="${container[i].strMealThumb}" alt="meals photos" class="" >
            <div class=" bg-white/75 absolute top-0 left-0 right-0 bottom-0 translate-y-[100%] group-hover:translate-y-[0%]   duration-700 rounded-lg  fit ">
            <h3 class="text-black text-center pt-24 font-bold z-10 text-lg  ">${container[i].strMeal}</h3>
            </div>
          </div>
        
       </div>`;
      
      
        }
      
        document.querySelector(".aklat").innerHTML = box;
      
       
}



async function getAreaData(){
    try {
        $(".loading").slideDown(0)
       
        const response = await fetch( `https://www.themealdb.com/api/json/v1/1/list.php?a=list` );
        const data = await response.json();
        
        document.querySelector(".aklat").innerHTML = "";
        // console.log(data.meals);
        displayAreas(data.meals);
       
        $(".loading").slideUp(800)
    
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
}

getAreaData()


function displayAreas(container){
    document.querySelector('.area').addEventListener('click',function(){
        document.querySelector(".search-input").classList.add("invisible");
        
        closeNav();

        let box = "";
        for (let i = 0; i < container.length; i++) {
          box += `  <div class="areas-meal cursor-pointer text-center ms-24   gap-9 " onclick="getAreasMeals('${container[i].strArea}')" >
          <i class="fa-solid fa-house-laptop text-[70px] text-white"></i>
          <h3 class="text-white pt-4 text-[20px] ">${container[i].strArea}</h3>
         </div>`;
      
      
        }
      
        document.querySelector(".aklat").innerHTML = box;
      
      

    })


}



async function getAreasMeals(area){
    try{
        $(".loading").slideDown(0)
        
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
        const data = await response.json();
        const meals = data.meals;
       console.log(meals);

       displayCategoriesMeals(meals)
       
       $(".loading").slideUp(800)
    }
    catch(error){
        console.error("Error fetching meals:", error);
    }
}



async function getIngredientData(){
    try {
        $(".loading").slideDown(0)
        
        const response = await fetch( `https://www.themealdb.com/api/json/v1/1/list.php?i=list` );
        const data = await response.json();
        // console.log(data.meals);
        
     displayIngredientData(data.meals.splice(0,25))
     
     $(".loading").slideUp(800)
    
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
}
  

getIngredientData()


function displayIngredientData(container){
    document.querySelector('.ingredient').addEventListener('click',function(){
      closeNav();
        document.querySelector(".search-input").classList.add("invisible");
        
        
        let box = "";
        for (let i = 0; i < container.length; i++) {
          const description = container[i].strDescription ? container[i].strDescription.split(" ").slice(0, 20).join(" ") : "";
          box += `  <div class="text-center cursor-pointer rounded-lg"   onclick="getCategoriesMeals('${container[i].strIngredient}')" >
          <i class="fa-solid fa-drumstick-bite text-[70px]  text-white  "></i>
          <h3 class="text-white pt-4 ">${container[i].strIngredient}</h3>
          <p class="text-white ">${description}</p>

        </div> `;
      
      
        }
      
        document.querySelector(".aklat").innerHTML = box;
      
      

    })
}

function userContacts(){
  document.querySelector(".aklat").innerHTML = "";

  document.querySelector('.contact').addEventListener('click',function(){
    closeNav();
    document.querySelector(".aklat").innerHTML = "";
    document.querySelector(".yallahwy").classList.remove('invisible')
    
   
  })
}

userContacts()


  var regex = {
    input1: /^[a-zA-Z0-9 ]{3,}$/,
    input2: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    input3: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
    input4: /[^@\s]+@[^@\s]+\.[^@\s]+/,
    input5: /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/,
    input6: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
  };


 

  function validateInputs(element) {
    if (regex[element.id].test(element.value)) {
      // element.classList.add("border-green-500");
      // document.querySelector('.zhgt').classList.add('invisible')
return true;
     
    } else {
      // document.querySelector('.zhgt').classList.remove('invisible')

      return false;
      
    }
  }

  

  function validateName(){
    document.querySelector('#input1').addEventListener("keyup", (e) => {
      if(validateInputs(e.target) && (e.target) !=""){
        document.querySelector('.zhgt1').classList.add('invisible')
      }else{
         document.querySelector('.zhgt1').classList.remove('invisible')
      }
    });
  }

  validateName()

  function validatePhone(){
    document.querySelector('#input2').addEventListener("keyup", (e) => {
      if(validateInputs(e.target) && (e.target) !=""){
        document.querySelector('.zhgt2').classList.add('invisible')
      }else{
         document.querySelector('.zhgt2').classList.remove('invisible')
      }
    });
  }

  validatePhone()

  function validatePassword(){
    document.querySelector('#input3').addEventListener("keyup", (e) => {
      if(validateInputs(e.target) && (e.target) !=""){
        document.querySelector('.zhgt3').classList.add('invisible')
      }else{
         document.querySelector('.zhgt3').classList.remove('invisible')
      }
    });
  }

  validatePassword()

  
  function validateEmail(){
    document.querySelector('#input4').addEventListener("keyup", (e) => {
      if(validateInputs(e.target) && (e.target) !=""){
        document.querySelector('.zhgt4').classList.add('invisible')
      }else{
         document.querySelector('.zhgt4').classList.remove('invisible')
      }
    });
  }

  validateEmail()


  function validateAge(){
    document.querySelector('#input5').addEventListener("keyup", (e) => {
      if(validateInputs(e.target) && (e.target) !=""){
        document.querySelector('.zhgt5').classList.add('invisible')
      }else{
         document.querySelector('.zhgt5').classList.remove('invisible')
      }
    });
  }

  validateAge()

  function validateRePassword(){
    document.querySelector('#input6').addEventListener("keyup", (e) => {
      if(validateInputs(e.target) && (e.target) !=""){
        document.querySelector('.zhgt6').classList.add('invisible')
      }else{
         document.querySelector('.zhgt6').classList.remove('invisible')
      }

    });
  }

  validateRePassword()

  
  // if (validateName() &&
  //       validateEmail() &&
  //       validatePassword() &&
  //       validateAge() &&
  //       validatePhone() &&
  //       validateRePassword()) {
          
           
          
       
  //   } else {
  //       submitBtn.setAttribute("disabled", true)
  //   }






























