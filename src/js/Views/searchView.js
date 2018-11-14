import {elements} from './base';

/**
 * getInput : get the client input from the form of search
 */
export const getInput = () => elements.searchInput.value;

/**
 * clearInput: clear up the value of the search form
 */
export const clearInput = () => elements.searchInput.value = '';

export const clearResult = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPage.innerHTML = '';
}

const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link results__link--active" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="Test">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;

   elements.searchResList.insertAdjacentHTML('beforeend', markup);

}

/**
 * createButton creates prev or next button to show the result in the list
 * type is 'prev' or 'next'
 * data-goto inside the button!!!
 */
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto = ${type === 'prev'? page - 1: page + 1}>
        <span>Page ${type === 'prev'? page - 1: page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev'? 'left': 'right'}"></use>
        </svg>
        
    </button>
`
/**
 * renderButtons renders the button according to the result number, result per page
 */
const renderButtons = (page, numResults, resPerPage) =>{
    const pages = Math.ceil(numResults / resPerPage);

    let button = '';
    if (page === 1 && pages > 1) {
        // only button to go to next
        button = createButton(page, 'next');
    } else if (page < pages) {
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `
    } else if (page === pages && pages > 1){
        button = createButton(page, 'prev');
    }

    //const prevBtns = element.searchBtnInline;

    elements.searchResPage.insertAdjacentHTML('beforeend', button);
}

/**
 * renderResult manipulates the result given the whole list of the recipes, the page and number 
 * of result need to be displayed per page
 */
export const renderResult = (recipes, page = 2, resPerPage = 10)=> {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    recipes.slice(start, end).forEach(renderRecipe);
    
    renderButtons(page, recipes.length, resPerPage);
}

export const highlightSelected = id => {
    // before highlight a new recipe, need to remove the highlight of the previous ones
    const resultArr = Array.from(document.querySelectorAll(`.results_link`));
    resultArr.forEach(ele => {
        ele.classList.remove('result__link-active');
    });
    document.querySelector(`a[href="#${id}"]`).classList.add('result__link-active');
}

/**
 * limitRecipeTitle will shorten the title
 * pasta with tomato and spinach
 * 
 */
const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];  // const of array can still add elements, did not change type
    if (title.length > limit) {
        title.split(' ').reduce((total, cur) => {
            if (total + cur.length <= limit) {
                newTitle.push(cur);
            }
            return total + cur.length;
        }, 0);
        return (`${newTitle.join(' ')} ...`);

    }
    return title;
}
