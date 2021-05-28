import React,{useState,useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { BiFoodTag } from 'react-icons/bi';
import { IoIosWine } from 'react-icons/io';
import { IoTimeOutline } from 'react-icons/io5';
import Loading from './Loading';
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
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import { brown ,red} from '@material-ui/core/colors';
import {Paper,Modal ,Grid,Typography, Avatar} from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import './IngredientRecipeSuggestion.css';
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
        height: '1500%',
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
        fontSize:'28px',
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
    }
  }));
function errorHandler()
{

}
function RecipeSuggestion({ingredient}){
    const classes = useStyles();
    const [recipeList,setRecipeList]=useState([]);
    const [id,setId]=useState(0);
    const [open, setOpen] = useState(false);
    var apiIngredient="https://api.spoonacular.com/recipes/findByIngredients?apiKey=c550dc06e1534abda082ecf4379d5cfa&number=40&ingredients=";
    ingredient.forEach((ingredientIndividual)=>{
        apiIngredient=apiIngredient+ingredientIndividual.ingredientname+",";
    });
    useEffect(()=>{
        fetch(apiIngredient)
            .then(response => response.json())
            .then(recipedata=> {
            setRecipeList(recipedata);
        })
        .catch(errorHandler)
    },[ingredient]);
    const handleClose = () => {
        setOpen(false);
        setId(0);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const recipeListRenderer=recipeList.map((recipeElem)=>{
            return(
                <Grid item xs={12} sm={6} md={4} key={recipeElem.id} className={classes.recipeItem}>
                <Paper
                container="true" 
                elevation={3}
                className={classes.recipeItemPaper}
                onClick={()=>{
                    handleOpen();
                    setId(recipeElem.id);
                  }}>
                <Avatar className={classes.avatar} src={recipeElem.image} /> 
                <h2 className={classes.heading}>{recipeElem.title}</h2>
                {(recipeElem.usedIngredientCount!==0)?(<div className={classes.ingredientList}><mark className={classes.markUsed}>{recipeElem.usedIngredientCount} Ingredients Used </mark></div>):(<div/>)}
                {(recipeElem.missedIngredientCount!==0)?(<div className={classes.ingredientList}><mark className={classes.markMissed}>{recipeElem.missedIngredientCount} Ingredients Missed </mark></div>):(<div/>)}
                {(recipeElem.unusedIngredients.length!==0)?(<div className={classes.ingredientList}><mark className={classes.markUnused}>{recipeElem.unusedIngredients.length} Ingredients Unused </mark></div>):(<div/>)}
                </Paper>
                </Grid>
                

            );
        })
    function RecipeDetail(){
        const [recipe,setRecipe]=useState({});
        const [ingredientsRequired, setIngrdientsRequired]=useState([]);
        const [wine,setWine]=useState({});
        const [nutrients,setNutrients]=useState([]);
        var apiRecipe="https://api.spoonacular.com/recipes/"+id+"/information?apiKey=c550dc06e1534abda082ecf4379d5cfa&includeNutrition=true";   
        useEffect(()=>{
            fetch(apiRecipe)
                .then(response => response.json())
                .then(recipe => {
                setRecipe(recipe);
                setIngrdientsRequired(recipe.extendedIngredients);
                setWine(recipe.winePairing);
                setNutrients(recipe.nutrition.nutrients);
            })
            .catch(errorHandler)
        },[id]);
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
                {(wine.pairingText!==undefined && wine.pairingText!=="")?
                (<div>
                <h2 className={classes.heading}> <IoIosWine color="magenta" size="40px"/> Wine Pairing</h2>
                <Typography variant="body1" component="h4">
                {ReactHtmlParser(wine.pairingText)}
                {wine.productMatches.map((wineProduct)=>{
                    return(
                        <div>
                        <h3 className={classes.heading}> <FaWineBottle color="green" size="30px"/> Product to try</h3>
                        <Typography variant="body1" component="h4">{wineProduct.title}</Typography>
                        <h3 className={classes.heading}> <ImQuestion color="red" size="30px"/>  Why should you try this product ?</h3>
                        <Typography variant="body1" component="h4">{wineProduct.description}</Typography>
                        <h3 className={classes.heading}><FaMoneyBillAlt color="green" size="30px"/>  How much does it cost per bottle ?</h3>
                        <Typography variant="body1" component="h4">{wineProduct.price}</Typography>
                        <Typography variant="body1" component="h4"> <a href={ReactHtmlParser(wineProduct.link)} target="_blank" rel="noreferrer">Check out the store !</a></Typography>
                        </div>
                    );
                })}
                </Typography>
                </div>):(<div/>)}
                {(nutrients.length)?(
                <div>
                <h2 className={classes.heading}> <DonutSmallIcon style={{ color: brown[500]}}/> Nutrients</h2>
                {nutrients.map((nutrient)=>{
                    return(
                        <div>
                        <h4>{ nutrient.amount } { nutrient.unit } {nutrient.title}</h4>
                        {(nutrient.percentOfDailyNeeds>100)?(<div><LinearProgress className={classes.nutrient} color="secondary" variant="determinate" value={100} /> {nutrient.percentOfDailyNeeds} % of Daily Need </div>):(<div><LinearProgress className={classes.nutrient} color="secondary" variant="determinate" value={nutrient.percentOfDailyNeeds} /> {nutrient.percentOfDailyNeeds} % of Daily Need</div>)}  
                        </div>
                    );
                    })}
                </div>    
                ):(<div/>)}
                </div>)
                :(<Loading/>)}
                </Paper>
                </Modal>
                </div>
                );
    }    
    return(
        <div>
            <div className={classes.recipeCardContainer}>
            <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >
            {(recipeList.length!==0)?
            (recipeListRenderer):(<Loading/>)}
            </Grid>
            </div>
            {open && <RecipeDetail/>}
        </div>
    )
}
export default RecipeSuggestion;