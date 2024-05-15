// Get the category select element
const categorySelect = document.getElementById('category');

// Add an event listener for the 'change' event on the select element
categorySelect.addEventListener('change', function() {
  // Get the selected category value
  const selectedCategory = this.value;

  // You can use the selectedCategory variable here to perform actions based on the chosen category
  // For example, you could:
  // - Change the color of the form control based on the category (for visual feedback)
  // - Log the selected category to the console for debugging purposes
  console.log("Selected category:", selectedCategory);
});