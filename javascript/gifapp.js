var animalArray = ["dog", "cat", "rabbit", "skunk", "goldfish", "bird", "ferret", "turtle",
"sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", 
"capybara", "teacup pig", "serval", "salamander", "frog"];

     // Function for displaying buttons
     function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise we will have repeat buttons)
        $("#animalButtons").empty();

        // Looping through the array of movies
        for (var i = 0; i < animalArray.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var b = $("<button>");
          // Adding a class of movie to our button
          b.addClass("animal");
          // Adding a data-attribute
          b.attr("id", animalArray[i]);
          // Providing the initial button text
          b.text(animalArray[i]);
          // Adding the button to the HTML
          $("#animalButtons").append(b);
        }
      }

      renderButtons();


$("#addAnimal").on("click", function() {
    event.preventDefault();

    var newAnimal = $("#animal-input").val().trim();

        // Adding the movie from the textbox to our array
        animalArray.push(newAnimal);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();

});

$(document).on("click", ".animal", function(){
    $("#animals").empty();
    var animal = $(this).text();

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=QO2XgioHI735Fte606yihsok8bUEsyDC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
  
            console.log(response);
            // storing the data from the AJAX request in the results variable
            var results = response.data;
  
            // Looping through each result item
            for (var i = 0; i < results.length; i++) {
  
              // Creating and storing a div tag
              var animalDiv = $("<div>");
  
              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + results[i].rating);
  
              // Creating and storing an image tag
              var animalImage = $("<img>");
              animalImage.addClass("gif");
              console.log("bloop");
              // Setting the src attribute of the image to a property pulled off the result item
              animalImage.attr("data-animate", results[i].images.fixed_height.url);
              animalImage.attr("data-still", results[i].images.fixed_height_still.url);
              animalImage.attr("state", "still");
              animalImage.attr("src", results[i].images.fixed_height_still.url);
  
              // Appending the paragraph and image tag to the animalDiv
              animalDiv.append(p);
              animalDiv.append(animalImage);
  
              // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
              $("#animals").append(animalDiv);
            }
          });
        });

          $(document).on("click", ".gif",function() {
            // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
            var state = $(this).attr("state");
            console.log("holi");
            // If the clicked image's state is still, update its src attribute to what its data-animate value is.
            // Then, set the image's state to animate
            // Else set src to the still value
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("state", "still");
            }
          });

