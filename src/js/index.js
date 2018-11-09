// Global app controller

import Search from './Models/search';
import * as searchView from './Views/searchView';
import {elements} from './Views/base';

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

        // 3. prepare UI for result
        searchView.clearInput();
        searchView.clearResult();

        // 4. update the result list, note getResult is a async method that return a promise, need
        // to wait until the promise finishes
        await state.search.getResults();
        console.log(state.search.result);
        
        // 5. render the result in the UI
        searchView.renderResult(state.search.result);
    }
    

    // 4. show the updated result list

}

controlSearch();

elements.searchForm.addEventListener('submit', e=>{
    e.preventDefault();  // prevent the default event
    controlSearch();
})