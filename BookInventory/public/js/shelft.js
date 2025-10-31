const addShelftInput = document.getElementById('addShelf');
const hideBtn = document.getElementById('showInput');
const showAddShelf = document.getElementById('addShelftBtn');

hideBtn.addEventListener('click', () => {
    addShelftInput.style.display = 'block';
    showAddShelf.style.display = 'block';
    hideBtn.style.display = 'none';
})