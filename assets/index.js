$(document).ready(function () {
  let apiDrink = [];

  function getDrinksForDiv() {
      $.get("https://www.thecocktaildb.com/api/json/v1/1/random.php", function (response) {
        console.log(response)
        $(".content-first-body").append(`
          <div>
            <img class="drinksForDiv" src =${response.drinks[0].strDrinkThumb}>
            <div class="drinksForDivTextContent">
              <h5 class="heading divDrinkHeading">\"${response.drinks[0].strDrink}\"</h5>
              <h5 class="heading"><u>Ingredients:</u></h5>
                <ul>
                  <li class = "divDrinkIngredient">${response.drinks[0].strIngredient1} &#40; ${response.drinks[0].strMeasure1} &#41; </li>
                  <li class = "divDrinkIngredient">${response.drinks[0].strIngredient2} &#40; ${response.drinks[0].strMeasure2} &#41; </li>
                  <li class = "divDrinkIngredient">${response.drinks[0].strIngredient3} &#40; ${response.drinks[0].strMeasure3} &#41; </li>
                </ul>
                <h5 class = "heading"><u>Directions:</u></h5>
                <ul>
                <li> ${response.drinks[0].strInstructions}
                </ul>
            </div>
          </div>
  
          <button class="save btn-danger">Save</button>`);
      apiDrink.push({
        "cocktail_name": response.drinks[0].strDrink,
        "ingredients": `${response.drinks[0].strIngredient1}, ${response.drinks[0].strIngredient2}, ${response.drinks[0].strIngredient3}`,
        "directions": response.drinks[0].strInstructions
      });

      $('.save').on('click', function () {
        saveCocktail(apiDrink);
        getPinnedDrinks(response.drinks[0].strDrink);
      });
    });



  };



  // End Drinks For Div 

  //corona_cocktail calls
  function appendImgGlassRate(rate, id) {
    if (rate < 0 || null) {
      $(`.glasses${id}`).append(`
        <div class="col-md-1"></div>
        <div class="col-md-2 glass-00"></div>
        <div class="col-md-2 glass-00"></div>
        <div class="col-md-2 glass-00"></div>
        <div class="col-md-2 glass-00"></div>
        <div class="col-md-2 glass-00"></div>
        `);
    } else if (rate > 0.01 && rate <= 2) {
      $(`.glasses${id}`).append(`
        <div class="col-md-1"></div>
        <div class="col-md-2 glass-100"></div>
        <div class="col-md-2 glass-00"></div>
        <div class="col-md-2 glass-00"></div>
        <div class="col-md-2 glass-00"></div>
        <div class="col-md-2 glass-00"></div>
        `);
    } else if (rate > 2.01 && rate <= 4) {
      $(`.glasses${id}`).append(`
        <div class="col-md-1"></div>
        <div class="col-md-2 glass-100"></div>
        <div class="col-md-2 glass-60"></div>
        <div class="col-md-2 glass-00"></div>
        <div class="col-md-2 glass-00"></div>
        <div class="col-md-2 glass-00"></div>
        `);
    }
    else if (rate > 4.01 && rate <= 6) {
      $(`.glasses${id}`).append(`
        <div class="col-md-1"></div>
        <div class="col-md-2 glass-100"></div>
        <div class="col-md-2 glass-100"></div>
        <div class="col-md-2 glass-60"></div>
        <div class="col-md-2 glass-00"></div>
        <div class="col-md-2 glass-00"></div>
        `);
    } else if (rate > 6.01 && rate <= 8) {
      $(`.glasses${id}`).append(`
        <div class="col-md-1"></div>
        <div class="col-md-2 glass-100"></div>
        <div class="col-md-2 glass-100"></div>
        <div class="col-md-2 glass-100"></div>
        <div class="col-md-2 glass-60"></div>
        <div class="col-md-2 glass-00"></div>
        `);
    } else if (rate > 8.01 && rate < 10) {
      $(`.glasses${id}`).append(`
        <div class="col-md-1"></div>
        <div class="col-md-2 glass-100"></div>
        <div class="col-md-2 glass-100"></div>
        <div class="col-md-2 glass-100"></div>
        <div class="col-md-2 glass-100"></div>
        <div class="col-md-2 glass-60"></div>
        `);
    } else if (rate >= 10) {
      $(`.glasses${id}`).append(`
        <div class="col-md-1"></div>
        <div class="col-md-2 glass-100"></div>
        <div class="col-md-2 glass-100"></div>
        <div class="col-md-2 glass-100"></div>
        <div class="col-md-2 glass-100"></div>
        <div class="col-md-2 glass-100"></div>
        `);
    }
  }

  function appendReviewDetails(info) {
    $('.reviewDiv').append(`
      <div class="review-card border-rounded">
        <div class="row">
          <div class="col-md-2"></div>
          <div value="${info.id}" class="col-md-8 review-id">
            <div class="row review-user"> User: ${info.user_id}</div> 
            <div class="row glasses${info.id}"></div>
            <div class="row review-rate">${info.rate_cocktail}/10</div>
            <div class="row review-cocktail">${info.review_cocktail}</div>
            <div class="row" value="${info.id}" id="${info.id}">
              <div class="col-md-3"></div>
              <button type="button" class="btn btn-outline-warning mb-2" data-toggle="modal" data-target="#editModal-${info.id}">Edit</button>
              <div class="col-md-2"></div>
              <button class="btn btn-outline-danger mb-2 delete-review" value="${info.id}" id="${info.id}">Delete</button>
            </div>
          </div>
        </div> 
      </div>

      <!-- Modal -->
      <div class="modal fade" id="editModal-${info.id}" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editModalLabel">Edit review</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="inputReview-${info.id}">Review:</label>
                  <input type="text" class="form-control" id="inputReview-${info.id}" value="${info.review_cocktail}">
                </div>
                <div class="form-row">
                  <div class="form-group col-md-4">
                    <label for="inputRate-${info.id}">Rate:</label>
                    <select id="inputRate-${info.id}" class="form-control">
                      <option selected>${info.rate_cocktail}</option>
                      <option>1</option><option>2</option><option>3</option><option>4</option><option>5</option>
                      <option>6</option><option>7</option><option>8</option><option>9</option><option>10</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-warning saveReviewEdit" value="${info.id}">Save changes</button>
            </div>
          </div>
        </div>
      </div>
      `);

  }
  // Logan pinned.cocktail_name     pinned.ingredients       pinned.directions 
  function appendPinnedDrinks(pinned) {
    $('.leftsideTwo').append(`
    <div class = "pinnedDiv">
    <p>${pinned.cocktail_name}</p>
    <p> ${pinned.ingredients} </p>
    <p>${pinned.directions} </p>
    <button type="button" class="btn btn-outline-warning" data-toggle="modal">Submit A Review</button>
    <div>`)
  }
  // Logan



  // corona_cocktail calls
  function saveCocktail(apiDrink) {
    $.post(
      "http://localhost:9000/cocktail",
      //"https://backend-project-2.herokuapp.com/cocktail",
      apiDrink[0],
    );
  }


  // login button / modal function

  function getReviewsByCocktail(cocktail_id) {
    $.ajax({
      async: true,
      //url: `https://backend-project-2.herokuapp.com/reviews/cocktail/${cocktail_id}`,
      url: `http://localhost:9000/reviews/cocktail/${cocktail_id}`,
      method: "GET"
    }).then((res) => {
      const reviews = res;
      for (const review in reviews) {
        const info = reviews[review];
        appendReviewDetails(info);
        const rate = info.rate_cocktail;
        appendImgGlassRate(rate, info.id);
      }
    });
  };

  function deleteReviewById(review_id) {
    $.ajax({
      method: "DELETE",
      //url: `https://backend-project-2.herokuapp.com/reviews/${review_id}`,
      url: `http://localhost:9000/review/${review_id}`,
      success: function () {
        window.location.reload();
      }
    });
  }

  // functional
  function postNewReview(review_obj) {
    $.post(// `https://backend-project-2.herokuapp.com/reviews`,
      `http://localhost:9000/reviews`, review_obj, (data) => {
        console.log(data);
      });
  };

  function patchReviewById(reviews_id, updated_review) {
    $.ajax({
      method: "PATCH",
      // url: `https://backend-project-2.herokuapp.com/reviews/${reviews_id}`,
      url: `http://localhost:9000/reviews/${reviews_id}`,
      data: updated_review
    }).then((res) => {
      console.log(res);
      window.location.reload();
    });
  };

// Get Pinned Drinks for Div
function getPinnedDrinks(cocktailName){
  $.ajax({
      //url: `https://backend-project-2.herokuapp.com/cocktail `,
      url: `http://localhost:9000/cocktail/${cocktailName}`,
      method: "GET"
  }).then((res)=> {
    const cocktail = res;
    console.log(res);
    for(const id in cocktail){
      const pinned = cocktail[id];
      appendPinnedDrinks(pinned)
    }
  })
}

  // Reviews for Div
  function getAllReviews() {
    $.ajax({
      async: true,
      //url: `https://backend-project-2.herokuapp.com/reviews`,
      url: `http://localhost:9000/reviews`,
      method: "GET"
    }).then((res) => {
      const reviews = res;
      for (const review in reviews) {
        const info = reviews[review];
        appendReviewDetails(info);
        const rate = info.rate_cocktail;
        appendImgGlassRate(rate, info.id);
      }
      //this button is tied to the modals that update the reviews from the "Recent Reviews" on the site
      $('.saveReviewEdit').on('click',(btn)=>{
        const btnId = $(btn.target).attr('value');

        const updateReviewObj = {
          review_cocktail: $(`#inputReview-${btnId}`).val(),
          rate_cocktail: $(`#inputRate-${btnId}`).val()
        }
        console.log(updateReviewObj);
        patchReviewById(btnId, updateReviewObj);
      });

    });
  };
  getAllReviews();
  getDrinksForDiv();
  getPinnedDrinks();



  $(document).on("click", ".delete-review", (btn) => {
    const reviewId = $(btn.target).attr("value");
    deleteReviewById(reviewId);
  });

// Refresh
$(document).on("click", ".refreshBtn", (btn) => {
  $(".content-first-body").empty();
  getDrinksForDiv();
})
  


});
