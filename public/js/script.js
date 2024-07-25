let addIngredientsBtn = document.getElementById("addIngredientsBtn");
let ingredientList = document.querySelector(".ingredientList")
let ingredeintDiv = document.querySelectorAll(".ingredeintDiv")[0]

addIngredientsBtn.addEventListener("click", function(){
    let newIngredients = ingredeintDiv.cloneNode(true);
    let input = newIngredients.getElementsByTagName("input")[0];
    input.value = "";
    ingredientList.appendChild(newIngredients);
})


document.addEventListener("DOMContentLoaded", function() {
    const categorySelect = document.querySelector('select[name="category"]');
    const stateField = document.getElementById('stateField');

    categorySelect.addEventListener('change', function() {
        if (this.value === 'Indian') {
            stateField.style.display = 'block';
        } else {
            stateField.style.display = 'none';
        }
    });
});

