import React,{Component} from 'react';
import {
    Container
  } from 'reactstrap';
import { Button, Label,Row,Col,Media } from 'reactstrap';
import {Control,LocalForm,Errors} from 'react-redux-form';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
const required=(val)=>(val)&&(val.length)

class Addcase extends Component{
    constructor(props){
        super(props);
        this.handlesubmit=this.handlesubmit.bind(this);
    }

    handlesubmit(values){
        this.props.postusercase(values['title'],values['image'],values['body']);
    }

    render(){
        return(
            <div className="container" style={{marginTop:50,marginBottom:50}}>
                <h4 className="text-center"><PlaylistAddIcon/> Add Blog</h4>
                <Container style={{marginTop:50}}>
                <hr></hr>
                    <Row>
                        <Col sm="6">
                            <LocalForm onSubmit={(values)=>this.handlesubmit(values)}>
                                <div className='form-group'>
                                    <Label for="title">Title</Label>
                                    <Control.text model=".title" className='form-control'
                                     placeholder="Title"
                                     validators={{
                                        required
                                     }}/>
                                    <Errors
                                     model='.title'
                                     show="touched"
                                     messages={{
                                         required:'Title is required !!',
                                     }}
                                     ></Errors>
                                </div>
                                        <div className='form-group'>
                                        <Label for="image">Image</Label>
                                        <Control.text model=".image" className='form-control'
                                        placeholder="Image"
                                        validators={{
                                            required
                                        }}/>
                                        <Errors
                                        model='.image'
                                        show="touched"
                                        messages={{
                                            required:'Image is required !!',
                                        }}
                                        ></Errors>
                                        </div>
                                <div className='form-group'>
                                    <Label for="sentence-time">Body</Label>
                                    <Control.textarea model=".body" className='form-control'
                                     placeholder="body"
                                     />
                                </div>
                                <Button style={{marginLeft:'40%'}} color="secondary" size="md" active>Add</Button>
                            </LocalForm>        
                        </Col>
                        <Col>
                            <div className="container">
                            <Media style={{width:'90%',marginLeft:'auto',marginTop:30}} 
                            src="https://c4.wallpaperflare.com/wallpaper/492/496/909/costume-law-lawyer-businessman-wallpaper-preview.jpg">
                            </Media>
                            </div>
                        </Col>
                    </Row>
                    <hr></hr>
                </Container>
            </div>
        );
    }

}

export default Addcase;
