import axios from 'axios';
import config from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe () {
        try {
            const result = await axios(`${config.PROXY}${config.RecipeURL}?key=${config.KEY}&rId=${this.id}`);
            this.title = result.data.recipe.title;
            this.author = result.data.recipe.publisher;
            this.img = result.data.recipe.image_url;
            this.url = result.data.recipe.source_url;
            this.ingredients = result.data.recipe.ingredients;
        } catch (error) {
            console.warn(error);
            alert ('Something went wrong getting the receipe :(');
        }
    }

    calcTime() {
        const numIngre = this.ingredients.length;
        const period = Math.ceil(numIngre / 3);
        this.time = period * 15;
    }

    calcServings () {
        this.serving = 4;
    }

    parseIngredient() {
        const unitLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon','cups','pounds'];

        const unitShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];

        const units = [...unitShort, 'kg', 'g']

        const newIngredient = this.ingredients.map(cur => {
            // 1. uniform units
            let ingredient = cur.toLowerCase();

            unitLong.forEach((ele, i) => {
                ingredient = ingredient.replace(ele, unitShort[i]);
            })


            // 2. remove parentheses
            ingredient.replace(/ *\([^)]*\)/g, '');


            // 3. parse the ingredients into count, unit and ingredient
            const arrIng = ingredient.split(' ');

            // findIndex takes in a call back function returns boolean, findIndex it self returns the index of 
            // the first elements that returns true in the callback func
            const unitIndex = arrIng.findIndex(ele =>units.includes(ele));  

            let objIng;
            if (unitIndex > -1) {
                // if there is unit
                const arrCount = arrIng.slice(0, unitIndex);
                let count;
                if (arrCount.length == 1) {
                    count = eval(arrCount[0].replace('-', '+'));
                } else {
                    count = eval(arrCount.join('+'));
                }
                objIng = {
                    count: count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                };
            } else if (parseInt(arrIng[0], 10)) {
                // if there is no unit, but a number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            } else if (unitIndex == -1) {
                // if there is no unit or number in first position
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient 
                }
            }
            return objIng;
        });
        this.ingredients = newIngredient;
    }
}

export const updateServings = (type) => {
    // servings
    const newServings = type = 'dec'? this.serving - 1: this.serving + 1;


    // ingredients
    this.ingredients.forEach(ele => {
        ele.count *= (newServings / this.serving);
    })
    this.serving = newServings;
}