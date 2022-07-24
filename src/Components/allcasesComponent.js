import React,{Component} from 'react';
import {Card,CardHeader,CardBody,CardTitle,CardText } from 'reactstrap';
import ReactLoading from 'react-loading';
import DataUsageRoundedIcon from '@material-ui/icons/DataUsageRounded';
import {isloggedin} from '../service/userservice';

function Cardprofile(props){
    // const acceptHandler=(id)=>{
    //     props.postaccept(id);
    // }

    if(isloggedin() ){
        return(
            <Card inverse color="danger" style={{marginTop:50}}>
                <CardHeader style={{textTransform:'uppercase'}}>
                <span className="text-warning" style={{fontWeight:'bold'}}> Title : </span>
                 {props.casedata.title}
                </CardHeader>
                <CardBody>
                    <CardText>
                        <img src={props.casedata.image} alt="" style={{width:'200px',height:'200px',borderRadius:20,boxShadow:'box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;'}}/>
                    </CardText>
                    <CardTitle>
                        <span className="text-warning" style={{fontWeight:'bold'}}></span>
                        {props.casedata.body}
                    </CardTitle>
                    {/* <Button onClick={()=>acceptHandler(props.casedata._id)} color="primary">ACCEPT</Button> */}
                </CardBody>
            </Card>
        )
    }
}

function Head(props){
    if(props.data.length>0){
        return(
            <h4 className="text-center"><DataUsageRoundedIcon style={{fontSize:40,marginRight:6}}/>All Blogs!</h4>
            )
    }else{
        return(
            <h4 className="text-center"><DataUsageRoundedIcon style={{fontSize:40,marginRight:6}}/>No Results found!</h4>
        );
    }
}


class Allcases extends Component{
    constructor(props){
        super(props);
        this.state={}
        this.handlesubmit=this.handlesubmit.bind(this);
    }
    
    handlesubmit(values){
        // this.props.postprofiledata(values.username,values.mobile);
    }

    render(){
        if(this.props.allcases.isloading){
            return(
            <div style={{height:'100%',width:'100%'}} className="d-flex align-items-center justify-content-center">
                <ReactLoading></ReactLoading>
            </div>
            )
        }else if(this.props.allcases.allcases){
            const cases=this.props.allcases.allcases.map((data)=>{
                return(<Cardprofile casedata={data}></Cardprofile>);
            })
            return(
                <div className="container" style={{marginTop:50,marginBottom:50,height:'100%'}}>
                    <Head data={this.props.allcases.allcases}/>

                    <div style={{marginTop:50}}>
                        {cases}
                    </div>
                </div>
            );
        }else if(this.props.allcases.err){
            return(<div>{this.props.usercases.err}</div>)
        }
    }
}

export default Allcases;