import React, { useReducer , createContext } from 'react';
import { Switch, Route ,BrowserRouter} from 'react-router-dom';
import Navigation from './components/Navigation';
import Customize from './components/Customize';
import Ingredient from './components/Ingredient';
import './App.css';
import IngredientRecipeSuggestion from './components/IngredientRecipeSuggestion';
import SearchByName from './components/SearchByName';
import SearchRecipeSuggestion from './components/SearchRecipeSuggestion';
import Random from './components/Random';
import CustomizedRecipeSuggestion from './components/CustomizedRecipeSuggestion';
export const AppContext = createContext();
const initialState = {
  ingredient: [],
  dishName:'',
  nutrientData:{}
};
function reducer(state, action) {
  switch (action.type) {
      case 'CHANGE_INGREDIENT':
          return {
            ingredient: action.data
          };
      case 'CHANGE_DISHNAME':
        return {
          dishName: action.data
        };
      case 'CHANGE_NUTRIENTS':
        return {
          nutrientData:action.data
        };
      default:
          return initialState;
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {ingredient,dishName,nutrientData} =state;
  return (
    <AppContext.Provider value={{ state, dispatch }}>
    <BrowserRouter>
      <div className="App">
      <h1 className="Heading">cookingSimplified</h1>
      <h1> </h1>
      <Navigation/>
      <Switch>
      <Route exact path="/" >
      <Ingredient/>
      </Route>
      <Route exact path='/customize' >
      <Customize/>
      </Route>
      <Route exact path='/recipes_based_on_ingredient' >
      <IngredientRecipeSuggestion ingredient={ingredient}/>
      </Route>
      <Route exact path='/search' >
      <SearchByName/>
      </Route>
      <Route exact path='/search_recipe' >
      <SearchRecipeSuggestion dishName={dishName}/>
      </Route>
      <Route exact path='/random' >
      <Random/>
      </Route>
      <Route exact path='/custom_recipe' >
      <CustomizedRecipeSuggestion nutrientData={nutrientData}/>
      </Route>
      </Switch>
      </div>
    </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
