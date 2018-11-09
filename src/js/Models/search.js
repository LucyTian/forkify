import axios from 'axios';
import config from '../config';

export default class Search{
    constructor(query) {
        this.query = query;
    }

    async getResults(query){
        const key = config.KEY;
        try{
            const res = await axios(`${config.PROXY}${config.URL}?key=${key}&q=${this.query}`);
          
            this.result = res.data.recipes; // recipes is an array of 30 elements by default;

        } catch(error) {
            console.error(error);
        }
    }
}
