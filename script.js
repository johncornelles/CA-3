const logoDiv = document.querySelector('.logoDiv');
const logoImage = document.querySelector('.logo');
const slogan = document.querySelector('.slogan');
const queryInput = document.querySelector('.query');
const searchIconDiv = document.querySelector('.searchIcondiv');
const foodGenieTitle = document.getElementById('foodgenieTitle');
const foodRandomImage = document.querySelector('.foodRandom');
const detailsRandom = document.querySelector('.detailsRandom');
let surpriseButton;
let ingredientsButtonSearch;
const ingredientsButton = document.querySelector('.IngredientsRandombtn');
const allRandomButtons = document.querySelectorAll('.btn');
const genie = document.querySelector('.genie');
const container = document.querySelector('.container');
const randomIngredients = document.querySelector('.randomIngredients');
const resultsDiv = document.querySelector('.results');
const ingredientsDiv = document.querySelector('.ingredients');

const randomrefresher = async () => {
  try {
    let res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

const randomHandler = async () => {
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
    genie.innerHTML = returner;
    surpriseButton = document.querySelector('.surprise');
    let IngredientsArr = `<pre> <b>${mealdata.strMeal}</b>\n \n<b>Ingredients</b> \n`
    for (let i in mealdata) {
        if (i.includes('strIngredient') && mealdata[i] != '') IngredientsArr += `\n  ${mealdata[i]} \n`
    }
    IngredientsArr += `\n \n <button class="close btn">Close</button> <a href="${mealdata.strSource}" target="_blank" class="recipe btn">Recipe</a> </pre>`
    randomIngredients.innerHTML = IngredientsArr
  } catch (error) {
    console.error(error);
  }
};

const categoryFetcher = async (query) => {
  try {
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${query}`)
    let mealdata = await data.json()
    return mealdata
  } catch (error) {
    console.error(error)
  }
}
const searchDatafetcher = async (id) => {
  let data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  let meal = await data.json()
  return meal
}

const displayIngredients = (data) => {
            let fragment = `<pre>\n<b>${data.strMeal}</b>\n\n<b>Ingredients</b>\n`;
            // console.log(data, '79')
            for (let i = 1; i <= 20; i++) {
                const ingredient = data[`strIngredient${i}`];
                const measure = data[`strMeasure${i}`];

                if (ingredient && measure) 
                    fragment += `\n ${measure} ${ingredient} \n`;
                
            }

            fragment += `\n<button class="close btn">Close</button>    <a href="${data.strSource}" target="_blank" class="recipe btn">Recipe</a></pre>`;
            ingredientsDiv.innerHTML = fragment
            ingredientsDiv.style.display = 'block';

            const closeBtn = ingredientsDiv.querySelector('.close');
            closeBtn.onclick = () => ingredientsDiv.style.display = 'none'
        };

const searchHandler = async (query) => {
    let mealdata = await categoryFetcher(query);
    let meals = mealdata.meals;
    meals = meals.splice(0, 10)

    for (let meal of meals) {
        let x = await searchDatafetcher(meal.idMeal);
        let data = x.meals[0];
        let i = 1
        let fragment = `
            <div class="item${data.idMeal} card">
                <img src="${data.strMealThumb}" height="200px" width="200px" alt="random food">
                <pre>
                
                    <b>${data.strMeal}</b>

                    ${data.strCategory}

                    ${data.strArea}stringify


                    <a href="${data.strSource}" target="_blank" class="btn recipe">Recipe</a> <button class="btn btn-ingredients-search ingredientsbtn${data.idMeal} ${data.idMeal}">Ingredients</button>
                </pre>
                    
            </div>`;
        resultsDiv.innerHTML += fragment;
        console.log(meal)
        console.log('data', data)
        resultsDiv.addEventListener('click', (e) => {
        if(e.target.classList.contains(`${data.idMeal}`)){
          displayIngredients(data)
        }
})
    }
    // document.querySelectorAll('.btn-ingredients-search').forEach((btn) => {
    //     let x = btn.getAttribute('data-mealdata');
    //     // let y = JSON.parse(x)
    //     console.log(x)
    // })
    // document.querySelectorAll('.btn-ingredients-search').forEach((btn) => {
    //     btn.onclick = () => {console.log(btn.getAttribute('data-mealdata'))}
    // })

};

window.onload = async () => {
  await randomHandler();

  container.onclick = (e) => {
    if(e.target.classList.contains('surprise')) randomHandler()
    if (e.target.classList.contains('IngredientsRandombtn'))
    randomIngredients.style.display = 'block';
  }
};

randomIngredients.onclick = (e) => {
  if (e.target.classList.contains('close')) randomIngredients.style.display = 'none'; 
};

queryInput.addEventListener('keypress', (e) => {if(e.key == 'Enter' && queryInput.value.trim() != '') searchHandler(queryInput.value)})