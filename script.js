const logoDiv = document.querySelector('.logoDiv');
const logoImage = document.querySelector('.logo');
const slogan = document.querySelector('.slogan');
const queryInput = document.querySelector('.query');
const searchIconDiv = document.querySelector('.searchIcondiv');
const foodGenieTitle = document.getElementById('foodgenieTitle');
const foodRandomImage = document.querySelector('.foodRandom');
const detailsRandom = document.querySelector('.detailsRandom');
const randomPre = document.querySelector('.randomPre');
let surpriseButton;
const ingredientsButton = document.querySelector('.IngredientsRandom');
const allRandomButtons = document.querySelectorAll('.btn-randoms');
const genie = document.querySelector('.genie');
const container = document.querySelector('.container');
const randomIngredients = document.querySelector('.randomIngredients')
const randomrefresher = async () => {
  try {
    let res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

const handler = async () => {
  try {
    let data = await randomrefresher();
    let mealdata = data.meals[0];
    console.log(mealdata);
    let returner = `
      <img src="${mealdata.strMealThumb}" height="200px" width="200px" alt="random food" class="foodRandom">
      <div class="detailsRandom">
        <pre class="randomPre">

          <b>${mealdata.strMeal}</b>

          ${mealdata.strCategory}

          ${mealdata.strArea}


          <button class="surprise btn">Surprise Me!</button>   <button class="IngredientsRandombtn btn">Ingredients</button>
        </pre>
      </div>`;
    console.log(mealdata)
    genie.innerHTML = returner;
    surpriseButton = document.querySelector('.surprise'); // Reassign surpriseButton each time
    let IngredientsArr = `<pre> \n <b>Ingredients</b> \n`
    for (let i in mealdata) {
        if (i.includes('strIngredient') && mealdata[i] != '') IngredientsArr += `\n  ${mealdata[i]} \n`
    }
    IngredientsArr += `\n \n <button class="close btn">Close</button> <a href="${mealdata.strSource}" target="_blank" class="recipe btn">Recipe</a> </pre>`
    console.log(IngredientsArr) 
    randomIngredients.innerHTML = IngredientsArr

  } catch (error) {
    console.error(error);
  }
};

window.onload = async () => {
  await handler(); // Call handler initially

  container.onclick = (e) => {
    if(e.target.classList.contains('surprise')) handler()
    if (e.target.classList.contains('IngredientsRandombtn'))
    randomIngredients.style.display = 'block';
  }
};

const closeBtn = document.querySelector('.close');

randomIngredients.onclick = (e) => {
  if (e.target.classList.contains('close')) randomIngredients.style.display = 'none'; 
};

randomIngredients.onclick = (e) => {
  if(e.target.classList.contains('close')) randomIngredients.style.display = 'none'
}