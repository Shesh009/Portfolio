document.addEventListener('DOMContentLoaded', function () {
    // Hide all hidden cards on page load
    const allHiddenCards = document.querySelectorAll('.hidden-cards');
    allHiddenCards.forEach(card => {
        card.style.display = 'none';
    });

    // Set default card (e.g., index 1)
    toggleHiddenCards(1);
});

function toggleHiddenCards(index) {
    // Hide all hidden cards
    const allHiddenCards = document.querySelectorAll('.hidden-cards');
    allHiddenCards.forEach(card => {
        card.style.display = 'none';
    });

    // Show the selected hidden cards
    const selectedHiddenCards = document.querySelector(`.hidden-cards-${index}`);
    if (selectedHiddenCards) {
        selectedHiddenCards.style.display = 'grid';
    }

    // Highlight the selected button
    const allButtons = document.querySelectorAll('.main-card button');
    allButtons.forEach(button => {
        button.classList.remove('selected');
    });

    const selectedButton = document.querySelector(`.main-card button[data-index="${index}"]`);
    if (selectedButton) {
        selectedButton.classList.add('selected');
    }
}