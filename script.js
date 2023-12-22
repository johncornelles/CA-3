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
const searcdiv = document.querySelector('.searchIcondiv')

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
    let IngredientsArr = `<pre>\n<b>${mealdata.strMeal}</b>\n\n<b>Ingredients</b>\n`;
    for (let i = 1; i <= 20; i++) {
        const ingredient = mealdata[`strIngredient${i}`];
        const measure = mealdata[`strMeasure${i}`]
        if (ingredient && measure && ingredient != null && measure != null && ingredient.trim() != '' && measure.trim() != '')  {
            IngredientsArr += `\n ${measure} ${ingredient} \n`;
        }
    }

IngredientsArr += `\n<button class="close btn">Close</button>      <a href="${mealdata.strSource}" target="_blank" class="recipe btn">Recipe</a>\n</pre>`;
randomIngredients.innerHTML = IngredientsArr;

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
            window.scrollTo({
              top: 0,
              behavior: "smooth"
            })
            let fragment = `<pre>\n<b>${data.strMeal}</b>\n\n<b>Ingredients</b>\n`;
            for (let i = 1; i <= 20; i++) {
                const ingredient = data[`strIngredient${i}`];
                const measure = data[`strMeasure${i}`];

                if (ingredient && measure && ingredient != null && measure != null && ingredient.trim() != '' && measure.trim() != '') 
                    fragment += `\n ${measure} ${ingredient} \n`;
                
            }

            fragment += `\n<button class="close btn">Close</button>    <a href="${data.strSource}" target="_blank" class="recipe btn">Recipe</a></pre>`;
            ingredientsDiv.innerHTML = fragment
            ingredientsDiv.style.display = 'block';

            const closeBtn = ingredientsDiv.querySelector('.close');
            closeBtn.onclick = () => ingredientsDiv.style.display = 'none'
        };

const searchHandler = async (query) => {
    try {

        if (!query.trim()) {
            throw new Error('Invalid input');
        }

        let mealdata = await categoryFetcher(query.trim());
        let meals = mealdata.meals;
        if (meals.length === 0) {
            throw new Error('Invalid input');
        }
        document.querySelector('.resultTitle').textContent = 'Results';
        meals = meals.splice(0, 10);
        for (let meal of meals) {
            let x = await searchDatafetcher(meal.idMeal);
            let data = x.meals[0];
            const mealName = `<b>${data.strMeal.slice(0, 20)}</b>`;
            let fragment = `
                <div class="item${data.idMeal} card">
                    <img src="${data.strMealThumb}" height="200px" width="200px" alt="random food">
                    <pre>
                        <b>${mealName}</b>

                        ${data.strCategory}

                        ${data.strArea}

                        <a href="${data.strSource}" target="_blank" class="btn recipe">Recipe</a>    <button class="btn btn-ingredients-search ${data.idMeal}">Ingredients</button>
                    </pre>
                </div>`;
            resultsDiv.innerHTML += fragment;
            console.log(meal);
            console.log('data', data);
            resultsDiv.addEventListener('click', (e) => {
                if (e.target.classList.contains(`${data.idMeal}`)) {
                    displayIngredients(data);
                }
            });
        }
    } catch (error) {
       document.querySelector('.resultTitle').textContent = 'Invalid Input';
       resultsDiv.innerHTML = ''
    }
};

window.onload = async () => {
  await randomHandler();

  container.onclick = (e) => {
    if(e.target.classList.contains('surprise')) randomHandler()
    if (e.target.classList.contains('IngredientsRandombtn')){
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    randomIngredients.style.display = 'block';
    }
  }
};

randomIngredients.onclick = (e) => {
  if (e.target.classList.contains('close')) randomIngredients.style.display = 'none'; 
};

queryInput.addEventListener('keypress', (e) => {
  if(e.key == 'Enter' && queryInput.value.trim() != '') searchHandler(queryInput.value)
  resultsDiv.innerHTML = ''
})

searcdiv.onclick = () => {
  if(queryInput.value.trim() != '') {
    searchHandler(queryInput.value)
    resultsDiv.innerHTML = ''
  }
}

logoDiv.onclick = () => window.location.reload()