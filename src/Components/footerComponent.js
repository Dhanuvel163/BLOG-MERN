import React,{Component} from 'react';
import {
    NavLink,
  } from 'reactstrap';

class Footer extends Component{
    render(){
        return(
            <div className='bg-dark'>
                <NavLink style={{color:'white',fontWeight:'bold',textAlign:'center'}}>ContactUs</NavLink>
                <NavLink style={{color:'white',fontWeight:'bold',textAlign:'center'}}>Email : dhanuram99@gmail.com</NavLink>
            </div>
        );
    }
}

export default Footer;