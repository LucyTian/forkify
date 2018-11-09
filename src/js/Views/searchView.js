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
}

const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link results__link--active" href="${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="Test">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.pulisher}</p>
                </div>
            </a>
        </li>
    `;

   elements.searchResList.insertAdjacentHTML('beforeend', markup);

}

export const renderResult = recipes => {
    recipes.forEach(renderRecipe);
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
