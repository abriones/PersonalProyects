const form = document.querySelector('#searchBar');

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const userSearch = form.elements.query.value;
    const config = { params: { q: userSearch } }
    const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
    console.log(config);
    removeImg();
    createImg(res.data);
})

const createImg = (shows) => {
    for (let result of shows) {
        if (result.show.image) {
            const img = document.createElement('img');
            img.src = result.show.image.medium;
            document.body.append(img);
        }
    }
}

const removeImg = () => {
    const remove = document.querySelectorAll('img');
    remove.forEach(function(currentValue, currentIndex, listObj){
        currentValue.remove();        
    });
    console.log(remove);
    // for(let img of remove){
    //     //remove[img].remove();
    // }
}