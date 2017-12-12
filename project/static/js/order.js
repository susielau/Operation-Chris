var menu = {
      AA_burger: {
        order_title: "Customize Your Own Burger!",
        name: "All-American Burger",
        image: "static/images/all-american-burger2.jpg",
        patty: "Patties",
        description: "Delicious 4 oz Black Angus Beef burger topped with optional cheese and bacon.",
      },
      chicken_clucker: {
        order_title: "Customize Your Own Chicken Sandwich!",
        name: "Grilled Chicken Sandwich",
        image: "static/images/chicken-clucker.png",
        patty: "Chicken",
        description: "Grilled 4 oz chicken breast topped with optional Swiss-American cheese and bacon",
      }
    }

// Get the modal
var modal = document.getElementById('myModal'),
    nav = document.getElementById('nav');

// Get the button that opens the modal
var cards = document.getElementsByClassName("card");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

function open_modal(id) {
  modal.style.display = "block";
  nav.style.opacity = "0.5";
  // change modal to corresponding fields
  $("#order-title").text(menu[id].order_title);
  $("#form-item").attr("value", menu[id].name);
  $("#food-image").attr("src", menu[id].image);
  $("#patty > label").text(menu[id].patty);
}

// When the user clicks the button, open the modal
for (i = 0; i < cards.length; i++) {
  let card = cards[i]
  let id = card.id
  // changing the card content based on id
  $(card).children("img").attr("src",menu[id].image);
  $(card).children("img").attr("alt",menu[id].name);
  body = $(card).children(".card-body")
  $(body).children(".card-title").text(menu[id].name);
  $(body).children(".card-text").text(menu[id].description)

  card.onclick = () => { open_modal(id) };
}

function close() {
    modal.style.display = "none";
    nav.style.opacity = "1";
}

// When the user clicks on <span> (x), close the modal
span.onclick = close;
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        close()
    }
}
