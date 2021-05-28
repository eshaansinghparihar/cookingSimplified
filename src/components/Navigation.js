import React,{Component} from 'react';
import { Tab ,Tabs} from '@material-ui/core';
import KitchenIcon from '@material-ui/icons/Kitchen';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import CasinoIcon from '@material-ui/icons/Casino';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
const styles = (theme) => ({
  root: {
    width: '100%',
    height:'13vh',
    '& > svg': {
      margin: theme.spacing(0),
    },
    marginTop:'4vh',
    marginBottom:'4vh',
    marginLeft:'auto',
    marginRight:'auto',
  },
})

class Navigation extends Component{
  
  constructor(props){
    super(props);
    this.state={
      value: window.location.pathname
    }
  }
  render(){
    const { classes } = this.props;
    return (
        <Tabs variant="fullWidth" value={this.state.value} onChange={(event, newValue) => {this.setState({value:newValue});}} className={classes.root}>
        < Tab component={Link}  value="/" to='/' icon={<KitchenIcon fontSize="medium"/>}/>
        < Tab component={Link} value="/search" to='/search' icon={<SearchIcon fontSize="medium"/>}/>
        <Tab component={Link}  value="/customize" to='/customize' icon={<DirectionsRunIcon fontSize="medium"/>}/>
        <Tab component={Link}  value="/random" to='/random' icon={<CasinoIcon fontSize="medium"/>}/>
        </Tabs>
    );
  }

}
export default withStyles(styles, { withTheme: true })(Navigation);