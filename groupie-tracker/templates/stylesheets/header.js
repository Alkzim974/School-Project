// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the header
var header = document.getElementById("header");

// Get the offset position of the navbar
var sticky = header.offsetTop +10;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.scrollY > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}


document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById("search");
  const suggestionsBox = document.createElement("div");
  suggestionsBox.id = "suggestions-box";
  suggestionsBox.style.position = "absolute";
  suggestionsBox.style.border = "1px solid #ccc";
  suggestionsBox.style.backgroundColor = "#fff";
  suggestionsBox.style.zIndex = "1000";
  suggestionsBox.style.display = "none";
  searchInput.parentNode.appendChild(suggestionsBox);

  searchInput.addEventListener("input", function() {
      const query = searchInput.value;
      if (query.length === 0) {
          suggestionsBox.style.display = "none";
          return;
      }
      fetch(`/suggest?q=${query}`)
          .then(response => response.json())
          .then(data => {
              suggestionsBox.innerHTML = "";
              data.forEach(artist => {
                  const suggestionItem = document.createElement("div");
                  suggestionItem.textContent = artist.Name;
                  suggestionItem.style.padding = "8px";
                  suggestionItem.style.cursor = "pointer";
                  suggestionItem.addEventListener("click", function() {
                      searchInput.value = artist.Name;
                      suggestionsBox.style.display = "none";
                  });
                  suggestionsBox.appendChild(suggestionItem);
              });
              suggestionsBox.style.display = "block";
          });
  });

  document.addEventListener("click", function(event) {
      if (!suggestionsBox.contains(event.target) && event.target !== searchInput) {
          suggestionsBox.style.display = "none";
      }
  });
});
