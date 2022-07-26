import React,{Component} from 'react';
import {isloggedin,isuserloggedin,islawyerloggedin} from '../service/userservice';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
  } from 'reactstrap';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ThumbsUpDownRoundedIcon from "@material-ui/icons/ThumbsUpDownRounded";
import LockIcon from '@material-ui/icons/Lock';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import CameraIcon from '@material-ui/icons/Camera';
import PaymentIcon from '@material-ui/icons/Payment';
function Logout(props){
    if(isloggedin()){
        return(
        <div 
        onClick={()=>{
            localStorage.removeItem('token')
            setTimeout(()=>{props.fetchuserdata()},200)
        }} 
        style={{marginRight:10}}>
            <NavItem>
                <NavLink href="/"><LockIcon/>Logout</NavLink>
            </NavItem>    
        </div>);
    }else{
        return(<div></div>);
    }
}

function Mycases(props){
    if(isloggedin()){
        return(
            <div> 
                <NavItem>
                    <NavLink href="/user/mycases"><PaymentIcon style={{marginRight:7}}/>My Blogs</NavLink>
                </NavItem>
            </div>);
    }else{
        return(<div></div>);
    }
}

function USERDATA(props){
    if(isloggedin()){
        return(
            <div> 
                <NavItem>
                    <NavLink href="/user/edit"><AccountCircleIcon/> {props.user.user}</NavLink>
                </NavItem>
            </div>);
    }else{
        return(<div></div>);
    }
}

function ADDCASEDATA(props){
    if(isloggedin() && isuserloggedin()){
        return(
            <>
            <div> 
                <NavItem>
                    <NavLink href="/user/case"><CameraIcon style={{marginRight:7}}/>ADD BLOG</NavLink>
                </NavItem>
                </div><div>
                <NavItem>
                    <NavLink href="/search/case"><CameraIcon style={{marginRight:7}}/>SEE All BLOGS</NavLink>
                </NavItem>
            </div>
            </>);
    }else if(isloggedin() && islawyerloggedin()){
        return(
            <div> 
                <NavItem>
                    <NavLink href="/search/case"><CameraIcon style={{marginRight:7}}/>SEE CASES</NavLink>
                </NavItem>
            </div>);
    }else{
        return(<div></div>);
    }
}

class Header extends Component{
constructor(props){
    super(props);
    this.toggle=this.toggle.bind(this);
    this.state={
        isOpen:false,   
    }
}
toggle(){
    this.setState({isOpen:!this.state.isOpen});
}

    render(){
        return(
            <div className="fixed-top">
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand href="/">
                        <ThumbsUpDownRoundedIcon style={{ marginRight: 7, fontSize: 30 }} />
                        <b>BLOGY</b>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>

                    <Nav className="ml-auto" navbar>
                        {
                            !isloggedin()
                            &&
                            <>
                                <NavItem>
                                    <NavLink href="/user/login"><VpnKeyIcon style={{marginRight:4,fontSize:20}}/>Login</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/user/login">
                                        <GroupAddIcon style={{marginRight:4,fontSize:20}}/>
                                        Signup
                                    </NavLink>
                                </NavItem>
                            </>
                        }
                        <ADDCASEDATA />
                        <USERDATA user={this.props.userdata}/>
                        <Mycases/>
                        <Logout fetchuserdata={this.props.fetchuserdata}></Logout>
                    </Nav>
                    </Collapse>
                </Navbar>
       </div>
        );
    }
}

export default Header;