const categorySelect = document.getElementById('category');
categorySelect.addEventListener('change', function() {
  const selectedCategory = this.value;
  console.log("Selected category:", selectedCategory);
});
