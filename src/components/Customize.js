import React, { useState,useContext } from "react";
import { AppContext } from '../App';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import SearchIcon from '@material-ui/icons/Search';
import { green } from '@material-ui/core/colors';
import './Customize.css';
import {  Link} from 'react-router-dom';
function SearchByName(){
    const [maxCarbs, setMaxCarbs] = useState(162);
    const [maxFat, setMaxFat] = useState(30);
    const [maxCalories, setMaxCalories] = useState(300);
    const [maxFibre, setMaxFibre] = useState(7);
    const [maxProtien, setMaxProtien] = useState(50);
    const [maxSugar, setMaxSugar] = useState(25);
    const [carbs,setCarbs]=useState(true);
    const [fat,setFat]=useState(true);
    const [fibre,setFibre]=useState(true);
    const [protien,setProtien]=useState(true);
    const [sugar,setSugar]=useState(true);
    const { dispatch} = useContext(AppContext);
    const changeMaxCarbHandler = (e) => {
        setMaxCarbs(e.target.value);
    };
    const changeMaxFatHandler = (e) => {
        setMaxFat(e.target.value);
    };
    const changeMaxCalorieHandler = (e) => {
        setMaxCalories(e.target.value);
    };
    const changeMaxFibreHandler = (e) => {
        setMaxFibre(e.target.value);
    };
    const changeMaxProtienHandler = (e) => {
        setMaxProtien(e.target.value);
    };
    const changeMaxSugarHandler = (e) => {
        setMaxSugar(e.target.value);
    };
    const changeCarbHandler = (e) => {
        setCarbs(!(carbs));
    };
    const changeFatHandler = (e) => {
        setFat(!(fat));
    };
    const changeFibreHandler = (e) => {
        setFibre(!(fibre));
    };
    const changeProtienHandler = (e) => {
        setProtien(!(protien));
    };
    const changeSugarHandler = (e) => {
        setSugar(!(sugar));
    };

    const clickHandler=()=>{
        dispatch({ type: 'CHANGE_NUTRIENTS', data: {maxCarbs:maxCarbs,carbs:carbs,maxFat:maxFat,fat:fat,maxCalories:maxCalories,
        maxFibre:maxFibre,fibre:fibre,maxProtien:maxProtien,protien:protien,maxSugar:maxSugar,sugar:sugar}});
    }

                return(
                    <div>
                    <h2 className="pageHeading">Customize You're Nutrition</h2>
                    <h4>Calories</h4>
                    <div className="search">
                    <input
                        type="range" 
                        min="100" max="1000"
                        name="maxcals" 
                        value={maxCalories}
                        step="10"
                        onChange={e=>changeMaxCalorieHandler(e)}
                        className="slider"
                    />
                    </div>
                    <div className="slidecontainer">
                    <h5>{maxCalories} Calories</h5>
                    </div>
                    <h4>Carbohydrates</h4>
                    <div class="search">
                    {(carbs)?(<input
                        type="range" 
                        min="2" max="325"
                        name="maxcarbs" 
                        value={maxCarbs}
                        step="1"
                        onChange={e=>changeMaxCarbHandler(e)}
                        className="slider"
                    />):
                    (<input
                        disabled={true}
                        type="range" 
                        min="2" max="325"
                        name="maxcarbs" 
                        value={maxCarbs}
                        step="1"
                        onChange={e=>changeMaxCarbHandler(e)}
                        className="slider"
                    />)}
                    {(carbs)?<ToggleOnIcon style={{ color: green[500]}} onClick={() => changeCarbHandler()} fontSize="large"/>:<ToggleOffIcon onClick={() => changeCarbHandler()} fontSize="large"/>}
                    </div>
                    <div className="slidecontainer">
                    {(carbs)?<h5>{maxCarbs} grams</h5>:<h5>Carbohydrates Filter Disabled</h5>}
                    </div>
                    <h4>Fat</h4>
                    <div class="search">
                    {(fat)?(<input
                        type="range" 
                        min="2" max="60"
                        name="maxfat" 
                        value={maxFat}
                        step="1"
                        onChange={e=>changeMaxFatHandler(e)}
                        className="slider"
                    />):
                    (<input
                        disabled={true}
                        type="range" 
                        min="2" max="60"
                        name="maxfat" 
                        value={maxFat}
                        step="1"
                        onChange={e=>changeMaxFatHandler(e)}
                        className="slider"
                    />)}
                    {(fat)?<ToggleOnIcon style={{ color: green[500]}} onClick={() => changeFatHandler()} fontSize="large"/>:<ToggleOffIcon onClick={() => changeFatHandler()} fontSize="large"/>}
                    </div>
                    <div className="slidecontainer">
                    {(fat)?<h5>{maxFat} grams</h5>:<h5>Fats Filter Disabled</h5>}
                    </div>
                    <h4>Protien</h4>
                    <div className="search">
                    {(protien)?(<input
                        type="range" 
                        min="2" max="100"
                        name="maxprotien" 
                        value={maxProtien}
                        step="1"
                        onChange={e=>changeMaxProtienHandler(e)}
                        className="slider"
                    />):
                    (<input
                        disabled={true}
                        type="range" 
                        min="2" max="100"
                        name="maxprotien" 
                        value={maxProtien}
                        step="1"
                        onChange={e=>changeMaxProtienHandler(e)}
                        className="slider"
                    />)}
                    {(protien)?<ToggleOnIcon style={{ color: green[500]}} onClick={() => changeProtienHandler()} fontSize="large"/>:<ToggleOffIcon onClick={() => changeProtienHandler()} fontSize="large"/>}
                    </div>
                    <div className="slidecontainer">
                    {(protien)?<h5>{maxProtien} grams</h5>:<h5>Protien Filter Disabled</h5>}
                    </div>
                    <h4>Sugar</h4>
                    <div className="search">
                    {(sugar)?(<input
                        type="range" 
                        min="2" max="50"
                        name="maxsugar" 
                        value={maxSugar}
                        step="1"
                        onChange={e=>changeMaxSugarHandler(e)}
                        className="slider"
                    />):
                    (<input
                        disabled={true}
                        type="range" 
                        min="2" max="50"
                        name="maxsugar" 
                        value={maxSugar}
                        step="1"
                        onChange={e=>changeMaxSugarHandler(e)}
                        className="slider"
                    />)}
                    {(sugar)?<ToggleOnIcon style={{ color: green[500]}} onClick={() => changeSugarHandler()} fontSize="large"/>:<ToggleOffIcon onClick={() => changeSugarHandler()} fontSize="large"/>}
                    </div>
                    <div className="slidecontainer">
                    {(sugar)?<h5>{maxSugar} grams</h5>:<h5>Sugar Filter Disabled</h5>}
                    </div>
                    <h4>Fibres</h4>
                    <div className="search">
                    {(fibre)?(<input
                        type="range" 
                        min="2" max="15"
                        name="maxfibre" 
                        value={maxFibre}
                        step="1"
                        onChange={e=>changeMaxFibreHandler(e)}
                        className="slider"
                    />):
                    (<input
                        disabled={true}
                        type="range" 
                        min="2" max="15"
                        name="maxfibre" 
                        value={maxFibre}
                        step="1"
                        onChange={e=>changeMaxFibreHandler(e)}
                        className="slider"
                    />)}
                    {(fibre)?<ToggleOnIcon style={{ color: green[500]}} onClick={() => changeFibreHandler()} fontSize="large"/>:<ToggleOffIcon onClick={() => changeFibreHandler()} fontSize="large"/>}
                    </div>
                    <div class="slidecontainer">
                    {(fibre)?<h5>{maxFibre} grams</h5>:<h5>Fibre Filter Disabled</h5>}
                    </div>
                    <Link to="/custom_recipe" >
                    <button className="Button" onClick={clickHandler}><SearchIcon fontSize="small"/></button>
                    </Link>
                    </div>
                )
            
}
export default SearchByName;