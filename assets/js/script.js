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

// Generate Dynamic HTML For Cocktail
const displayCocktail = (data) => {
  // Console Log the data to see what the individual elements are
  const cocktail = data.drinks[0];
  console.log('Returned Cocktail Name:', cocktail.strDrink);
  console.log('Returned Cocktail Instructions:', cocktail.strInstructions);
  console.log('Returned Cocktail Image:', cocktail.strDrinkThumb);

  // Clear Previsous Ingredient List
  $('#drinkIngredients').empty();

  // Dynamically Update Drink Name
  $('#cardDrinkName').html(`<h4>${cocktail.strDrink}</h4>`);

  // Dynamically Update Drink Instructions
  $('#drinkInstructions').html(cocktail.strInstructions);

  // Dynamically Update Drink Image
  $('#drinkImg').attr('src', cocktail.strDrinkThumb);

  // Dnyamically Update Ingredients
  for (let i = 1; i <= 15; i++) {
    const ingredient = cocktail[`strIngredient${i}`];
    let measure = cocktail[`strMeasure${i}`] || '';

    if (ingredient) {
        console.log('Ingredient:', measure + ingredient);
        $('#drinkIngredients').append(`<li>${measure} ${ingredient}</li>`);
    }
}}

// Process Coctail Search Form
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

  // call async fetchCocktailByName function and pass in the cocktail name
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

// Fetch Random Cocktail
const randomCocktail = async () => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/random.php`;
  try {
    const data = await fetch(url);
    return data.json();
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
};

$(document).ready(function (event) {
  // Initialize Modal
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems, {
    opacity: 0.5,
    inDuration: 300,
    outDuration: 200,
    dismissible: true,
  });

  // Load Page With Random Cocktail
  randomCocktail().then((data) => {
    displayCocktail(data);
  });

  // detect form submission
  $('#searchCocktail').on('click', handleSearchByName);


  const randomButton = document.getElementById('randomButton');

  randomButton.addEventListener('click', () => {
    randomCocktail().then((data) => {
      displayCocktail(data);
    });
  });
});
// Initialize variables
var map;
var service;
var infowindow;

function initMap() {
  // Default map location (UCF)
  var center = { lat: 28.6024, lng: -81.2001 };

  // Initialize map
  map = new google.maps.Map(document.getElementById('map'), {
    center: center,
    zoom: 12,
  });

  // Initialize Places service and infowindow
  service = new google.maps.places.PlacesService(map);
  infowindow = new google.maps.InfoWindow();
}

//  function to find liquor stores by zip code.
function searchLocation() {
  var zipCode = document.getElementById('zipCodeInput').value.trim();

  // Use Geocoding to get coordinates for the zip code
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: zipCode }, function (results, status) {
    if (status === 'OK') {
      var location = results[0].geometry.location;
      map.setCenter(location);

      // Search for liquor stores near the coordinates
      var request = {
        location: location,
        radius: 10000, // 10 kilometers
        type: 'liquor_store',
      };
      // create marker for liquor stores.
      service.nearbySearch(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        } else {
          alert('No liquor stores found nearby.');
        }
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function createMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
  });

  google.maps.event.addListener(marker, 'click', function () {
    infowindow.setContent('<strong>' + place.name + '</strong><br>' + place.vicinity);
    infowindow.open(map, this);
  });
}
