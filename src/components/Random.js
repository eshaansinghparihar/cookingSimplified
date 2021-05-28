import CasinoIcon from '@material-ui/icons/Casino';
import React,{useState,useEffect} from "react";
import Loading from './Loading';
import { makeStyles } from '@material-ui/core/styles';
import { BiFoodTag } from 'react-icons/bi';
import { IoIosWine } from 'react-icons/io';
import { IoTimeOutline } from 'react-icons/io5';
import { BsFillPeopleFill } from 'react-icons/bs'
import { FaWineBottle } from 'react-icons/fa';
import { ImQuestion } from 'react-icons/im'; 
import { FaMoneyBillAlt } from 'react-icons/fa';
import { BiDish } from 'react-icons/bi';
import { FaRupeeSign } from 'react-icons/fa';
import { GiCook } from 'react-icons/gi';
import { MdRestaurantMenu } from 'react-icons/md';
import { BiFoodMenu } from 'react-icons/bi';
import CancelIcon from '@material-ui/icons/Cancel';
import ReactHtmlParser from 'react-html-parser';
import { red } from '@material-ui/core/colors';
import {Paper,Modal ,Grid,Typography, Avatar} from '@material-ui/core';
import './IngredientRecipeSuggestion.css';
// import '../App.css';
import {  Link} from 'react-router-dom';
import './Ingredient.js';
const useStyles = makeStyles((theme) => ({
    paper: {
      maxWidth: '80%',
      maxHeight:'80vh',
      overflow:'scroll',
      marginLeft:'auto',
      marginRight:'auto',
      marginTop:theme.spacing(4),
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    ModalContainer:{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '1000%',
        backdropFilter: "blur(4px)",
        backgroundColor:'rgba(0,0,30,0.4)'
    },
    recipeCardContainer: {
        flexGrow: 1,
        padding: theme.spacing(1),
        width:'95%',
        marginLeft:'auto',
        marginRight:'auto',
    }, 
    recipeItem:{
        marginBottom:theme.spacing(2),
        padding:theme.spacing(1),
    },
    recipeItemPaper:{
        padding:theme.spacing(1),
        minHeight:'65vh',
        borderRadius:'10%',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#fff',
        fontSize:'30px',
        width:'45vh',
        height:'40vh',
        marginLeft:'auto',
        marginRight:'auto'
      },
    markUsed:
    {
        backgroundColor:'#90EE90',
        color:'#fff',
        fontWeight:'800',
        padding:theme.spacing(1),
    },
    markUnused:
    {
        backgroundColor:'#A7C7E7',
        color:'#fff',
        fontWeight:'800',
        padding:theme.spacing(1),
    },
    heading:
    {
        flexDirection:'row',
        display:'block',
        marginLeft:'auto',
        marginRight:'auto',
        color:'#484848'
    },
    markMissed:{
        fontWeight:'800',
        padding:theme.spacing(1),
        backgroundColor:'#800020',
        color:'#fff',
    },
    ingredientList:{
        flexDirection:'row',
        display:'block',
        marginLeft:'auto',
        marginRight:'auto',
        marginBottom:theme.spacing(2)
    },
    closeButton:
    {
        float:'right'
    },
    pageHeading:{
        marginBottom:theme.spacing(8)
    }
  }));
function errorHandler(){

}
function Random(){
    const classes = useStyles();
    const [tag, setTag] = useState("");
    const [open, setOpen] = useState(false);
    const changeHandler = (e) => {
        setTag(e.target.value);
    };
    const handleClose = () => {
        setOpen(false);
        setTag("");
    };
    const handleOpen = () => {
        setOpen(true);
    };
    function RecipeDetail(){
        const [recipe,setRecipe]=useState([]);
        const [ingredientsRequired, setIngrdientsRequired]=useState([]);
        var apiRecipe="https://api.spoonacular.com/recipes/random?apiKey=9f4aa7cc7b3448c688bb9e36b0b124ca&tags="+tag;   
        useEffect(()=>{
            fetch(apiRecipe)
                .then(response => response.json())
                .then(data => {
                setRecipe(data.recipes[0]);
                setIngrdientsRequired(data.recipes[0].extendedIngredients);
            })
            .catch(errorHandler)
        },[tag]);
            const ingredientList=ingredientsRequired.map((ingredient)=>
            {
                    return(
                        <div id={ingredient.id} className={classes.ingredientList}> 
                            <Typography variant="body1" component="h4">{ingredient.originalString}</Typography>
                        </div>
                    );
            })
            return(
                <div className={classes.ModalContainer}>
                <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                <Paper elevation={3} className={classes.paper}>
                {(ingredientsRequired.length!==0) && ((recipe.vegetarian)?<BiFoodTag color="green" size="40px"/>:<BiFoodTag color="brown" size="40px"/>)}
                <CancelIcon className={classes.closeButton} style={{ color: red[500]}} onClick={handleClose}/>
                {(ingredientsRequired.length!==0)?
                (<div>
                <Avatar className={classes.avatar} src={recipe.image} /> 
                <h2 className={classes.heading}><BiDish color="gray" size="40px"/> {recipe.title}</h2>
                <h2 className={classes.heading}><GiCook color="gray" size="30px"/> Summary</h2>
                <Typography variant="body1" component="h4">
                {ReactHtmlParser(recipe.summary)}
                </Typography>
                <h2 className={classes.heading}><MdRestaurantMenu color="brown" size="30px"></MdRestaurantMenu>Ingredients</h2>
                {ingredientList}
                <h2 className={classes.heading}><BiFoodMenu color="orange" size="30px"></BiFoodMenu>Instructions</h2>
                <Typography variant="body1" component="h4">
                {ReactHtmlParser(recipe.instructions)}
                </Typography>
                <h2 className={classes.heading}><FaMoneyBillAlt color="green" size="30px"/> Approx. Price per serving </h2>
                <Typography variant="body1" component="h4">
                <FaRupeeSign />{Math.round(((recipe.pricePerServing)/100)*73*(recipe.servings))}.00
                </Typography>
                <h2 className={classes.heading}><IoTimeOutline color="purple" size="30px"/> Ready in </h2>
                <Typography variant="body1" component="h4">
                {recipe.readyInMinutes} minutes
                </Typography>
                <h2 className={classes.heading}><BsFillPeopleFill color="gray" size="30px"/>Ideal for ?</h2>
                <Typography variant="body1" component="h4">
                Serves {recipe.servings} 
                </Typography>
                </div>)
                :(<Loading/>)}
                </Paper>
                </Modal>
                </div>
    
            );
        }       
         return(
                    <div>
                    <h2 className={classes.pageHeading}>Get Surprised</h2>
                    <div className="number">
                    <input
                        name="random" 
                        value={tag}
                        placeholder="(Optional) Enter a tag to search for. Try 'dessert' "
                        onChange={e=>changeHandler(e)}
                        className="Input"
                    />
                    </div>
                    <button className="Button" onClick={()=>{
                    handleOpen()}}>
                    <CasinoIcon fontSize="small"/>
                    </button>
                    {open && <RecipeDetail/>}
                    </div>
                )
            
}
export default Random;