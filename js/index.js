const loadAllCoctail = (searchText, drinkLimit) => {

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`)
        .then(res => res.json())
        .then(data => display(data.drinks, drinkLimit))

}
let serial = 0;
const display = (drinks, drinkLimit) => {
    const tableBodyContainer = document.getElementById('tableBody');
    // tableBodyContainer.innerHTML='';
    const loadButton = document.getElementById('load-btn');

    if (drinkLimit && drinks.length > 10) {
        drinks = drinks.slice(0, 10)
        loadButton.classList.remove('hidden')
    }
    else {
        loadButton.classList.add('hidden')
    }

    drinks.forEach(drink => {
        serial += 1
        // console.log(drink)
        const { idDrink, strCategory, dateModified, strDrinkThumb } = drink;
        const tr = document.createElement('tr');
        tr.innerHTML = `
                    <th>
                    ${serial}
                  </th>
                <td>
                    <div class="flex items-center space-x-3">
                    <div class="avatar">
                        <div class="mask mask-squircle w-12 h-12">
                        <img src="${strDrinkThumb}" alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    
                    </div>
                </td>
                <td>${strCategory}</td>
                <td>
                   <p>${idDrink}</p>
                </td>
                <td>${dateModified ? `${dateModified}` : "have no date"}</td>
                <th>
                  
                    <label onclick='loadDetails(${idDrink})' for="modal" class="btn btn-success">details</label>

                </th>
    `
        tableBodyContainer.appendChild(tr)
        // loading end
        loading(false)
    })
}
// loading progress bar
const loading = (isLoading) => {
    const loadingProgress = document.getElementById('loading-progress');
    if (isLoading) {
        loadingProgress.classList.remove('hidden')
    }
    else {
        loadingProgress.classList.add('hidden')
    }
}
// common search input Text
const commonSearch = (drinkLimit) => {
    const inputField = document.getElementById('simple-search');
    const value = inputField.value;
    inputField.value = '';
    loadAllCoctail(value, drinkLimit);
    //   loading start
    loading(true)

}

// search by input text
document.getElementById('simple-search').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        commonSearch(10)
    }
})
// load more button
const loadMoreButton = () => {
    commonSearch()
}

const loadDetails = async (id) => {
    const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await res.json();
    displayDetails(data.drinks[0])
 
}
const displayDetails = (details) => {
    console.log(details)
    const{strDrinkThumb,strInstructionsIT}=details
    const modalContainer = document.getElementById('modal-container');
    const div = document.createElement('div');
    modalContainer.innerHTML='';
    div.classList.add('modal-box');
    div.innerHTML = `
                    <img src="${strDrinkThumb}" alt="">
                    <p class="py-4"><span class='text-3xl font-bold'>Instruction:</span>${strInstructionsIT}</p>
                    <div class="modal-action">
                        <label for="modal" class="btn">close</label>
                    </div>
    `
    modalContainer.appendChild(div)
}
