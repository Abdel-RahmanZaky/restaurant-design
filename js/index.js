let dataRow = document.getElementById("data-row");
let home = document.getElementById('home')

$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-screen").fadeOut(500)
        $("body").css("overflow", "visible")

    })
})

let closeNavbar = () => {
    let sliderWidth = $('#navbar').width()
    console.log(sliderWidth);
    $('.slide ').animate({ left: "-200px" }, 600)
    $(".nav-link").animate({
        top: 300
    }, 600)
}

$('#open').click(function () {
    if ($('#navbar').width() == '200') {
        closeNavbar();
    }
    else {
        $('.slide').animate({ left: "0" }, 600)
        $('#open').css("display", "none")
        $('#close').css("display", "block")
        for (let i = 0; i < 5; i++) {
            $(".nav-link").eq(i).animate({
                top: 0
            }, (i + 5) * 100)
        }
    }
})

$('#close').click(function () {
    closeNavbar()
    $('#open').css("display", "block")
    $('#close').css("display", "none")
})


function displayMeals(data) {
    let cartoona = "";

    for (let i = 0; i < data.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${data[i].idMeal}')" class="item position-relative overflow-hidden rounded-2 my-2">
                    <img class="w-100" src="${data[i].strMealThumb}" alt="">
                    <div class="caption text-center p-2 d-flex justify-content-center align-items-center">
                        <h3 class="fs-5 text-black">${data[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    dataRow.innerHTML = cartoona
}



async function getCategories() {
    dataRow.innerHTML = ""
    $(".loading-screen").fadeIn(300)
    home.innerHTML = ""
    const http = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    const response = await http.json()

    displayCategories(response.categories)
    $(".loading-screen").fadeOut(300)
}

function displayCategories(data) {
    box = ``
    
    for (let i = 0; i < data.length ; i++){
        box += `
        <div class="col-md-3 my-1">
                <div onclick="getCategoryMeals('${data[i].strCategory}')" class="item position-relative rounded-2 overflow-hidden">
                    <img class="w-100" src="${data[i].strCategoryThumb}" alt="img">
                    <div class="caption text-center p-2 ">
                        <h3 class="text-black">${data[i].strCategory}</h3>
                        <p class="text-black">${data[i].strCategoryDescription.split(" ").slice(0, 25).join(" ") }</p>
                    </div>
                </div>
        </div>
        `
    }
    dataRow.innerHTML = box
}


$('#Categories').click(function () {

    closeNavbar()
    $('#open').css("display", "block")
    $('#close').css("display", "none")
    $(".loading-screen").fadeIn(500)

    getCategories()
    displayCategories(data)
    $(".loading-screen").fadeOut(500)

})


async function getAreas() {
    dataRow.innerHTML = ""
    $(".loading-screen").fadeOut(300)
    home.innerHTML = ""
    const http = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    const response = await http.json()

    displayAreas(response.meals)
    $(".loading-screen").fadeOut(300)
}

function displayAreas(data) {
    box = ``;

    for (i = 0; i < data.length; i++){
        box += `
         <div class="col-md-3 my-1">
                <div  onclick="getAreaMeals('${data[i].strArea}')" class="item rounded-2 text-center">
                        <i class="fa-solid fa-house-laptop fs-2 text-white" ></i>
                        <h3 class ="text-white">${data[i].strArea}</h3>
                </div>
        </div>
        `
    }
    dataRow.innerHTML = box;
}
$('#Area').click(function () {
    // $(".inner-loading-screen").fadeIn(300)
    closeNavbar()
    $('#open').css("display", "block")
    $('#close').css("display", "none")
    $(".loading-screen").fadeIn(300)
    getAreas()

    displayAreas(data)
    $(".loading-screen").fadeOut(300)

})


async function getIngredients() {
    dataRow.innerHTML = ""
    $(".loading-screen").fadeIn(300)

    home.innerHTML = "";
    const http = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    const response = await http.json();
    console.log(response)
    diplayIngredients(response.meals.slice(0, 24))
    $(".loading-screen").fadeOut(300)
}

function diplayIngredients(data) {
    box = ``;

    for (i = 0; i < data.length; i++){
        box += `
        <div class="col-md-3">
                <div  onclick="getIngredientsMeals('${data[i].strIngredient}')"  class="item rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fs-2 text-white"></i>
                        <h3 class="text-white fs-5">${data[i].strIngredient}</h3>
                        <p class="text-white fs-6">${data[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
        </div>
        `
    }
    dataRow.innerHTML = box;
}

$('#Ingredients').click(function () {

    closeNavbar()
    $('#open').css("display", "block")
    $('#close').css("display", "none")
    $(".loading-screen").fadeIn(300)

    getIngredients()
    diplayIngredients()
    $(".loading-screen").fadeOut(300)
})


async function getCategoryMeals(category) {
    dataRow.innerHTML = ""
    $(".loading-screen").fadeIn(300)

    
    const http = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    const response = await http.json()


    displayMeals(response.meals.slice(0, 20))
    $(".loading-screen").fadeOut(300)
}

// getCategoryMeals("Beef")


async function getAreaMeals(area) {
    dataRow.innerHTML = ""
    $(".loading-screen").fadeIn(300)
    const http = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    const response = await http.json()


    displayMeals(response.meals.slice(0, 20))
    $(".loading-screen").fadeOut(300)

}


async function getIngredientsMeals(ingredients) {
    dataRow.innerHTML = ""
    $(".loading-screen").fadeIn(300)

    const http = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    const response = await http.json()


    displayMeals(response.meals.slice(0, 20))
    $(".loading-screen").fadeOut(300)

}

async function getMealDetails(mealID) {
    dataRow.innerHTML = ""
    $(".loading-screen").fadeIn(300)
    const http = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    const respone = await http.json();

    displayMealDetails(respone.meals[0])
    $(".loading-screen").fadeOut(300)

}


function displayMealDetails(meal) {

    home.innerHTML = "";


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
    let tags = meal.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }
    let cartoona = 
    `
            <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
                <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p id="des">${meal.strInstructions}</p>
                <h3 class="fs-5"><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3 class="fs-5"><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3 class="fs-5">Recipes :</h3>
                <ul class="list d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>
                <h3>Tags :</h3>
                <ul class="list d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>
    `

    dataRow.innerHTML = cartoona
}


function displaySearch() {
    home.innerHTML = `
     <div class="row p-5">
        <div class="col-md-6">
            <label class="py-2">Search By Name</label>
            <input id="search-1" onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text">
        </div>
        <div class="col-md-6">
            <label class="py-2">Search By Frist Letter</label>
            <input id="search-2" onkeyup="searchByFLetter(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Frist Letter" >
        </div>
    </div>
    
    `
    dataRow.innerHTML = ""
}

$('#Search').click(function () {
    closeNavbar()
    $('#open').css("display", "block")
    $('#close').css("display", "none")
    $(".loading-screen").fadeIn(300)
    displaySearch()
    $(".loading-screen").fadeOut(300)

})

async function searchByName(term) {
    dataRow.innerHTML = ""
    $(".loading-screen").fadeIn(300)

    const http = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    let response = await http.json()
    response.meals ? displayMeals(response.meals) : displayMeals([])

    // if (response.meal) {
    //     displayMeals(response.meals)
    // } else {
    //     displayMeals([])
    // }
    $(".loading-screen").fadeOut(300)
}

async function searchByFLetter(term) {
    dataRow.innerHTML = ""
    $(".loading-screen").fadeIn(300)
    term == "" ? term = "a" : "";
    const http = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    let response = await http.json()
    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".loading-screen").fadeOut(300)

}


function displayForm(){
    dataRow.innerHTML = `
    <div class="form min-vh-100 d-flex justify-content-center align-items-center flex-column">
            <div class="row w-100 px-5">
                <div class="col-md-6 my-2">
                    <input id="name" onkeydown="inputsValidation()" class="form-control w-100" placeholder="Enter Your Name" type="text">
                    <p id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Special characters and numbers not allowed
                    </p>
                </div>
                <div class="col-md-6 my-2">
                    <input id="email" onkeydown="inputsValidation()" class="form-control w-100" placeholder="Enter Your Email" type="email">
                    <p id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                         Email not valid *exemple@gmail.com
                    </p>
                </div>
                <div class="col-md-6 my-2">
                    <input id="phone" onkeydown="inputsValidation()" class="form-control w-100" placeholder="Enter Your Phone" type="text">
                    <p id="PhoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid Phone Number
                    </p>
                </div>
                <div class="col-md-6 my-2">
                    <input id="age" onkeydown="inputsValidation()" class="form-control w-100" placeholder="Enter Your Age" type="number">
                    <p id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid age
                    </p>
                </div>
                <div class="col-md-6 my-2">
                    <input id="password" onkeydown="inputsValidation()" class="form-control w-100" placeholder="Enter Your Password" type="password">
                    <p id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid password *Minimum eight characters, at least one letter and one number
                    </p>

                </div>
                <div class="col-md-6 my-2">
                    <input id="repassword" onkeydown="inputsValidation()" class="form-control w-100" placeholder="Enter Your Repassword" type="password">
                    <p id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid repassword
                    </p>
                </div>
            </div>
            <button id="submit" disabled class="btn btn-outline-danger mt-3">Submit</button>
        </div>
    `
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');
    let age = document.getElementById('age');
    let password = document.getElementById('password');
    let repassword = document.getElementById('repassword');


    name.addEventListener('focus', function () {
        nameInputState = true;
    })
    email.addEventListener('focus', function () {
        emailInputState = true;
    })
    phone.addEventListener('focus', function () {
        phoneInputState = true;
    })
    age.addEventListener('focus', function () {
        ageInputState = true;
    })
    password.addEventListener('focus', function () {
        passwordInputState = true;
    })
    repassword.addEventListener('focus', function () {
        repasswordInputState = true;
    })

    let subBtn = document.getElementById('submit')

    
}



let nameInputState = false;
let emailInputState = false;
let phoneInputState = false;
let ageInputState = false;
let passwordInputState = false;
let repasswordInputState = false;




function inputsValidation() {
    if (nameInputState) {
        if (nameValid()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputState) {

        if (emailValid()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputState) {
        if (phoneValid()) {
            document.getElementById("PhoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("PhoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputState) {
        if (ageValid()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputState) {
        if (passwordValid()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputState) {
        if (repasswordValid()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValid() &&
        emailValid() &&
        phoneValid() &&
        ageValid() &&
        passwordValid() &&
        repasswordValid()) {
        document.getElementById('submit').removeAttribute("disabled")
    } else {
        document.getElementById('submit').setAttribute("disabled", true)
    }
}

function nameValid() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("name").value))
}

function emailValid() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("email").value))
}

function phoneValid() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phone").value))
}

function ageValid() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("age").value))
}

function passwordValid() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("password").value))
}

function repasswordValid() {
    return document.getElementById("password").value == document.getElementById("repassword").value
}

$('#contact').click(function () {
    closeNavbar()
    $('#open').css("display", "block")
    $('#close').css("display", "none")
    $(".loading-screen").fadeIn(300)
    displayForm()
    $(".loading-screen").fadeOut(300)

})







