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
}

// When the user clicks the button, open the modal
for (i = 0; i < cards.length; i++) {
  var id = cards[i].id
  cards[i].onclick = () => { open_modal(id) };
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    nav.style.opacity = "1";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
