// 2nd API Provider - OpenStreetMap, Google Maps or Youtube
async function placeHolderAPI() {
  const url = `https://placeholder.com/api`;
  try {
    const data = await fetch(url);
    return data.json();
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}

// Fetch Cocktail By Ingredient
async function fetchCocktailByIngredient(ingredient) {
  // add a check to see if the ingredient is empty
  if (!ingredient) {
    console.error('No ingredient provided');
    return null;
  }
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  try {
    const data = await fetch(url);
    // add decisioning to determine if data contains a cocktail then return the data
    return data.json();
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}

// Fetch Cocktail By Name
async function fetchCocktailByName(cocktailName) {
  // add a check to see if the cocktailName is empty
  if (!cocktailName) {
    console.error('No cocktail name provided');
    return null;
  }

  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`;
  try {
    const data = await fetch(url);
    // determine if data contains a cocktail
    // need help from TA to determine if object is empty as it currently
    // breaks when no cocktail is found
    if (data) {
      console.log('Cocktail Found', data);
      return data.json();
    } else {
      console.log('No cocktail found');
      return null;
    }
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}

$(document).ready(function () {
  // add event listeners

  // detect form submission, id below will depend on the form id in the modal
  $('#searchCocktail').on('click', handleSearchForm);
});
