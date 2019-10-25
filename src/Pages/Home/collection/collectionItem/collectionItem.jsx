import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col } from 'reactstrap';
import Moment from 'react-moment';
import { setCollection, toggleModal, selecteItem } from '../../../../redux/reducers/action';

class collectionItem extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    add = () => {
        this.props.selecteItem(this.props.resultItem)
        this.props.toggleModal(true);    
    }    

    delete = () => {
        const nasaId = this.props.resultItem.data[0].nasa_id;

        const afterDelete =  this.props.collection;
        afterDelete.map((item, index) => {
            if(item.data[0].nasa_id === nasaId){
                this.props.collection.splice(index, 1)
            }
        })

        localStorage.setItem("myCollection", JSON.stringify(afterDelete))
        this.props.setCollection(afterDelete);
        window.location.reload(true);
    }

    edit = () => {
        this.props.selecteItem(this.props.resultItem)
        this.props.toggleModal(true);
    }

    render() {        
        return (
            <Col sm="4" className="item">
                {
                    this.props.resultItem.links !== undefined? 
                        <img className="item_image" src={this.props.resultItem.links[0].href}  alt="nasa" />:
                    null
                }
                <div className="infor d-flex">
                    <p>{this.props.resultItem.data[0].center}</p>
                    <Moment format="D MMM YYYY" withTitle>
                        {this.props.resultItem.data[0].date_created}
                    </Moment>
                </div>
                <h3 className="title">
                    {this.props.resultItem.data[0].title}
                </h3>
                <div className="description">
                    {this.props.resultItem.data[0].description}
                </div>
                {
                    this.props.checkPage === "search"?
                        <button onClick={this.add} className="btn add-btn"><i className="lni-plus"></i> Add to collection</button>
                        :
                        <div className="active d-flex">
                            <button onClick={this.like} className="btn active-btn"><i className="lni-heart-filled"></i></button>
                            <button onClick={this.edit} className="btn active-btn"><i className="lni-pencil"></i></button>
                            <button onClick={this.delete} className="btn active-btn"><i className="lni-trash"></i></button>
                        </div>
                }                
            </Col>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        collection: state.collection,
    };
}

const mapDitspatchToProps = (dispatch) => {
    return {
        setCollection: (collection) => {
            dispatch(setCollection(collection))
        },
        toggleModal: (check) => {
            dispatch(toggleModal(check))
        },
        selecteItem: (check) => {
            dispatch(selecteItem(check))
        },
    }
}

export default connect(
    mapStateToProps, mapDitspatchToProps
)(collectionItem);