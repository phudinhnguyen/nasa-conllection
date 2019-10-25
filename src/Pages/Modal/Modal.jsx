import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label } from 'reactstrap';
import { toggleModal, setCollection } from '../../redux/reducers/action';
import { withRouter } from "react-router";

class MyModal extends Component {

    constructor(props) {
        super(props);        
        this.state = {
            title: "",
            description: "",
            type: "",
            link: "",
        }
    }

    componentDidMount() {
        this.setState({
            title: this.props.itemSelected.data[0].title,
            description: this.props.itemSelected.data[0].description,
            type: this.props.itemSelected.data[0].type,
            link: this.props.itemSelected.href,
        })
    }
    

    toggle = () => {
        this.props.toggleModal(false);
    }

    onChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value,
        })
      }

    add = () => {
        this.props.toggleModal(false);
        const myCollection = this.props.collection;
        if(myCollection === null){
            this.props.setCollection([this.props.itemSelected]);
            localStorage.setItem("myCollection", JSON.stringify([this.props.itemSelected]))
        }else{
            myCollection.push(this.props.itemSelected);
            this.props.setCollection(myCollection);
            localStorage.setItem("myCollection", JSON.stringify(myCollection))
        }   
        this.props.history.push('/')
    }

    edit = () => {
        const nasaId = this.props.itemSelected.data[0].nasa_id;

        const afterDelete =  this.props.collection;
        afterDelete.map((item, index) => {
            if(item.data[0].nasa_id === nasaId){
                item.data[0].title = this.state.title;
                item.data[0].description = this.state.description;
                item.data[0].type = this.state.media_type;
                item.data[0].link = this.props.collection[0].href;
            }
        })

        localStorage.setItem("myCollection", JSON.stringify(afterDelete))
        window.location.reload(true);
    }

    render() {
        return (
            <Modal isOpen={this.props.checkModal} toggle={this.toggle}>
                {
                    this.props.checkPage === "search"?
                    <ModalHeader toggle={this.toggle}>Add to collection</ModalHeader>:
                    <ModalHeader toggle={this.toggle}>Edit</ModalHeader>
                }                
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label >Title</Label>
                            <input name="title" value={this.state.title} className="form-control" type="text"  onChange={this.onChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label >Description</Label>
                            <textarea name="description" value={this.state.description} className="form-control" rows="5"  onChange={this.onChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label >Type</Label>
                            <select name="type" value={this.state.type} className="form-control" rows="8" onChange={this.onChange} >
                                <option value="image">Image</option>
                                <option value="video">Video</option>
                                <option value="audio">Audio</option>
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Label >Link preview image url</Label>
                            <input name="link" value={this.state.link} className="form-control"  onChange={this.onChange}/>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    {
                        this.props.checkPage === "search"?
                        <Button className="add-btn" onClick={this.add}><i className="lni-plus mt-2"></i> Add to collection </Button>
                        :
                        <Button className="add-btn" onClick={this.edit}> Save <i className="lni-check-mark-circle mt-2"></i></Button>
                    }
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        collection: state.collection,
        checkModal: state.checkModal,
        itemSelected: state.itemSelected
    }
}

const mapDitspatchToProps = (dispatch) => {
    return {
        setCollection: (collection) => {
            dispatch(setCollection(collection))
        },
        toggleModal: (check) => {
            dispatch(toggleModal(check))
        },
    }
}

export default withRouter(connect(mapStateToProps,mapDitspatchToProps)(MyModal));