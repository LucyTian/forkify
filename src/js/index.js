// Global app controller

import Search from './Models/search';
import * as searchView from './Views/searchView';
import {elements, renderLoader, clearLoader, elementStrings} from './Views/base';
import Recipe from './Models/recipes';

/** Global state of the application
 * - Search object
 * - Recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

/**
 * control search handles the reaction of search event
 */
const controlSearch = async () =>{
    // 1. get the query from the view
    const query = searchView.getInput();

    // 2. create a search object and make the search
    if (query) {
        state.search = new Search(query);

        // 3. prepare UI for result  (here also include the spinning of preparing for the list)
        searchView.clearInput();
        searchView.clearResult();
        renderLoader(elements.searchRes);
        

        try {
            // 4. update the result list, note getResult is a async method that return a promise, need
            // to wait until the promise finishes
            await state.search.getResults();
    
            // 5. render the result in the UI
            clearLoader(elements.searchRes);
            searchView.renderResult(state.search.result);
        } catch(error) {
            clearLoader(elements.searchRes);
            console.warn(error);
            alert("Error in searching");
        }  
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();  // prevent the default event
    controlSearch();
});

// pay attention to the element.closest here to find a certain element
elements.searchResPage.addEventListener('click', e => {
    const btn = e.target.closest(`.${elementStrings.searchBtnInline}`);
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResult();
        searchView.renderResult(state.search.result, goToPage);
    }

})


/**
 * Recipe controller
 */
const controlRecipe = async () =>{
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if (id) {
        // prepare the url for changes

        // create new recipe object
        state.recipe = new Recipe(id);

        // get the recipe data
        try {
            await state.recipe.getRecipe();
            const res = state.recipe.parseIngredient();

            // cal the time and serving
            state.recipe.calcServings();
            state.recipe.calcTime();


            // render the recipe
            console.log(state.recipe);
            console.log(res);
        } catch (error) {
            console.warn(error);
            alert('Error processing the recipe');
        }
        

        
    }
}

// add multiple event to an object with the same functions
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));