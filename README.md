# Bachelor Bites Web Application

Welcome to "Bachelor Bites," a web application designed to simplify cooking for bachelors by exploring recipes, ingredients, and random meal ideas using TheMealDB API.

## Description

"Bachelor Bites" assists users in easily exploring various cooking options:

- **Category-based Search:** Enables users to search for meals based on categories.
- **Random Meal Generator:** Provides random meal suggestions with detailed information, including images, categories, areas, and recipe sources.
- **Ingredients Display:** Allows users to view the ingredients for specific meals.
- **Recipe Access:** Users can access the full recipe for each meal suggestion.
- **Responsive Design:** The web app is built to seamlessly adapt to different devices, ensuring a user-friendly experience on desktops, tablets, and mobile phones.

## Features

- Search for meals by category.
- Generate random meal ideas with comprehensive details.
- View ingredients required for specific meals.
- Access the full recipe for each meal.
- Responsive design catering to multiple devices.

## API Used

This project leverages TheMealDB API to fetch meal-related data. The utilized endpoints are:

- **Random Meal:** `https://www.themealdb.com/api/json/v1/1/random.php`
- **Filter by Category:** `https://www.themealdb.com/api/json/v1/1/filter.php?c={category}`
- **Lookup by ID:** `https://www.themealdb.com/api/json/v1/1/lookup.php?i={id}`

## How to Use

1. Clone or download the repository.
2. Open the `index.html` file in any web browser.
3. Utilize the search bar to explore meals by category.
4. Click on "Surprise Me!" to generate random meal suggestions.
5. Click on the "Ingredients" button to access the ingredients list for a specific meal.
6. View the full recipe by clicking the "Recipe" button for a meal.

## Credits

The "Bachelor Bites" project utilizes TheMealDB API to fetch meal data. Credits and thanks to TheMealDB for providing the APIs powering this web application.
