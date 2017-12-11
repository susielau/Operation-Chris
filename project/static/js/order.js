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
  console.log(id)
  // modal for all-american burger
  if (id === 'AA-burger') {
    $("#order-title").text("Customize Your Own Burger!");
    $("#food-image").attr("src", "static/images/all-american-burger2.jpg");
    $("#patty > label").text("Patties");
  }
  else if (id === 'chicken-clucker') {
    $("#order-title").text("Customize Your Own Chicken Sandwich!");
    $("#food-image").attr("src", "static/images/chicken-clucker.png");
    $("#patty > label").text("Chicken");
  }
}

// When the user clicks the button, open the modal
for (i = 0; i < cards.length; i++) {
  let id = cards[i].id
  cards[i].onclick = () => { open_modal(id) };
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
