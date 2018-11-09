// Global app controller

import Search from './Models/search';
import * as searchView from './Views/searchView';
import {elements, renderLoader, clearLoader, elementStrings} from './Views/base';

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
        

        // 4. update the result list, note getResult is a async method that return a promise, need
        // to wait until the promise finishes
        await state.search.getResults();
        console.log(state.search.result);
        
        // 5. render the result in the UI
        clearLoader(elements.searchRes);
        searchView.renderResult(state.search.result);
    }
}

controlSearch();

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