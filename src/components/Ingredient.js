import React, { useState,useContext } from "react";
import { AppContext } from '../App';
// import '../App.css';
import {  Link} from 'react-router-dom';
import './Ingredient.css';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
function Ingredient(){
    const [ingredients, setIngredients] = useState([{ ingredientname: ""}]);
    const { dispatch} = useContext(AppContext);
    const changeHandler = (e, index) => {
        const { name, value } = e.target;
        const list = [...ingredients];
        list[index][name] = value;
        setIngredients(list);
    };

    const removeIngredient = index => {
        const list = [...ingredients];
        list.splice(index, 1);
        setIngredients(list);
    };

    const addIngredient=()=>{
        setIngredients([...ingredients, {ingredientname:""}]);
    };

    const clickHandler=()=>{
        dispatch({ type: 'CHANGE_INGREDIENT', data: ingredients});
    }

    return(
        <div>
            <h2 className="pageHeading">What's In You're Refridgerator ? </h2>
            {ingredients.map((ingredient , index) => {
                return(
                    <div key={index} className="number">
                        
                        {(index<1)?
                            (<input
                                name="ingredientname" 
                                value={ingredient.ingredientname}
                                placeholder="Try to add atleast two Ingredients"
                                onChange={e=>changeHandler(e , index)}
                                className="Input"
                            />):
                            (<input
                                name="ingredientname" 
                                value={ingredient.ingredientname}
                                placeholder="Add an Ingredient"
                                onChange={e=>changeHandler(e , index)}
                                className="Input"/>)
                            }
                    <button className="Button" onClick={() => removeIngredient(index)}><RemoveIcon fontSize="small"/></button>
                    </div>
                )
            })}
            <button className="Button" onClick={addIngredient}><AddIcon fontSize="small"/></button>
            <Link to="/recipes_based_on_ingredient" >
            {ingredients.length>0 && <button className="Button" onClick={clickHandler}><ArrowForwardIosIcon fontSize="small"/></button>}
            </Link>
            
        </div>
    )
}
export default Ingredient;