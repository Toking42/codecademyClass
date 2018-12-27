// Codecademy MealMaker Projekt
const meal = {
  _course : {
    appetizers: [],
    mains: [],
    desserts: []
  },

  addDishToCourse(courseName, name, price) {
    let dish = {
      name,
      price
    }
    this._course[courseName].push(dish);
  },

  getRandomDishFromCourse(courseName) {
    let courses = this._course[courseName];
    return courses[Math.floor(Math.random()*courses.length)];
  },

  generateRandomMeal() {
    let randomMeal = [];
    randomMeal['appetizer'] = this.getRandomDishFromCourse('appetizers');
    randomMeal['main'] = this.getRandomDishFromCourse('mains');
    randomMeal['dessert'] = this.getRandomDishFromCourse('desserts');
    let sum = 0.0;
    console.log('Sie haben bestellt:');
    for(let key in randomMeal) {
      sum += randomMeal[key].price;
      console.log("\t"+randomMeal[key].name+"\t"+randomMeal[key].price)
    }
    console.log('\tSumme:'+sum);

  },

  get courses() {
    return this._course;
  }
}

//console.log(meal.courses);
meal.addDishToCourse('mains','Schnitzel',9.8);
meal.addDishToCourse('mains','Cordon Bleu',9.8);
meal.addDishToCourse('mains','Spätzle',9.8);
meal.addDishToCourse('mains','Gulasch',9.8);
meal.addDishToCourse('appetizers','Suppe',9.8);
meal.addDishToCourse('appetizers','Salat',9.8);
meal.addDishToCourse('appetizers','Gemüse',9.8);
meal.addDishToCourse('desserts','Mousse',9.8);
meal.addDishToCourse('desserts','Creme',9.8);
meal.addDishToCourse('desserts','Eis',9.8);

//console.log(meal.courses);
console.log(meal.generateRandomMeal());
