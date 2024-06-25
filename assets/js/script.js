// 2nd API Provider - OpenStreetMap, Google Maps or Youtube
const placeHolderAPI = async () => {
  const url = `https://placeholder.com/api`;
  try {
    const data = await fetch(url);
    return data.json();
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
};

// Fetch Cocktail By Ingredient
const fetchCocktailByIngredient = async (ingredient) => {
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
};

// Fetch Cocktail By Name
const fetchCocktailByName = async (cocktailName) => {
  console.log('Cocktail Name Passed To Fetch Function:', cocktailName);
  // add a check to see if the cocktailName is empty
  if (!cocktailName) {
    console.error('No cocktail name provided');
    return null;
  }
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`;
  try {
    const data = await fetch(url);
    // add decisioning to determine if data contains a cocktail, if true, return the data
    //console.log('Data:', data);

    if (data) {
      return data.json();
    } else {
      console.log('No Data Returned');
      return null;
    }
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
};

const displayCocktail = (data) => {
  // Console Log the data to see what the individual elements are
  const cocktail = data.drinks[0];
  console.log('Returned Cocktail Name:', cocktail.strDrink);
  console.log('Returned Cocktail Instructions:', cocktail.strInstructions);
  console.log('Returned Cocktail Image:', cocktail.strDrinkThumb);
  console.log('Returned Cocktail Image 2:', cocktail.strImageSource);

  // Dynamically Update Drink Name
  //$('#nameOfElementID').html(cocktail.strDrink);

  // Dynamically Update Drink Instructions
  //$('#nameOfElementID').html(cocktail.strInstructions);

  // Dynamically Update Drink Image
  //$('#nameOfElementID').html(cocktail.strDrinkThumb);

  // Dynamically Update Drink Name 2
  //$('#nameOfElementID').html(cocktail.strImageSource);

  // Dnyamically Update Ingredients Example
  if (cocktail.strIngredient1) {
    console.log('Ingredient 1:', cocktail.strMeasure1 + cocktail.strIngredient1);
    //$('#nameOfElementID').html(cocktail.strMeasure1 + cocktail.strIngredient1);
  }
};

const handleSearchByName = async (event) => {
  event.preventDefault();
  const cocktailName = $('#cocktailInput').val();

  // we have the cocktail name, now we can close the modal
  // create modalInstance variable to close the modal
  const modalInstance = M.Modal.getInstance(document.getElementById('modal1'));
  // close the modal and clear the drink name input field
  $('#cocktailInput').val('');
  modalInstance.close();

  if (!cocktailName) {
    console.error('No cocktail name provided');
    // add an alert to modal to notify the user that cocktail name is required
    return null;
  }

  fetchCocktailByName(cocktailName).then((data) => {
    // Returned cocktail data
    if (Array.isArray(data.drinks)) {
      displayCocktail(data);
    } else {
      console.log('No Cocktail Found');
      // add an alert to index.html to notify the user that no cocktail results were found
    }
  });
};
// function for closing the modal
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems, {
    opacity: 0.5,
    inDuration: 300,
    outDuration: 200,
    dismissible: true,
  });

  const modal = document.getElementById('modal1');
  if (modal) {
    const submitButton = document.getElementById('searchCocktail');
    if (submitButton) {
      submitButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        modal.style.display = 'none'; // Hide the modal by changing the display style

        const overlay = document.querySelector('.modal-overlay');
        if (overlay) {
          overlay.style.display = 'none';
        }

        document.body.classList.remove('modal-open');
      });
    } else {
      console.error('Submit button not found');
    }
  } else {
    console.error('Modal element not found');
  }
});
$(document).ready(function (event) {
  // Initialize Modal
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems, {
    opacity: 0.5,
    inDuration: 300,
    outDuration: 200,
    dismissible: true,
  });

  console.log('Document Ready');

  // detect form submission
  $('#searchCocktail').on('click', handleSearchByName);
});
