import React, { useState,useContext } from "react";
import { AppContext } from '../App';
import SearchIcon from '@material-ui/icons/Search';
// import '../App.css';
import './Ingredient.css';
import {  Link} from 'react-router-dom';
function SearchByName(){
    const [dishName, setDishname] = useState("");
    const { dispatch} = useContext(AppContext);
    const changeHandler = (e) => {
        setDishname(e.target.value);
    };

    const clickHandler=()=>{
        dispatch({ type: 'CHANGE_DISHNAME', data: dishName});
    }

                return(
                    <div>
                    <h2 className="pageHeading">What Are You Drooling For ?</h2>
                    <div className="number">
                    <input
                        name="search" 
                        value={dishName}
                        placeholder="Enter name. Try searching 'Butter Chicken'"
                        onChange={e=>changeHandler(e)}
                        className="Input"
                    />
                    </div>
                    <Link to="/search_recipe" >
                    <button className="Button" onClick={clickHandler}><SearchIcon fontSize="small"/></button>
                    </Link>
                    </div>
                )
            
}
export default SearchByName;