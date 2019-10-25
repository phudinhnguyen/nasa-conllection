import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row } from 'reactstrap';
import Collection from './collection/collection';
import { Link } from 'react-router-dom';
import { toggleModal } from '../../redux/reducers/action';
import MyModal from '../Modal/Modal'
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collection: [],
        }
    }

    render() {
        return (
            <>
                <Container className="home">
                    <Row className="header">
                        <h1 className="title">Nasa Conlection</h1>
                        <Link to="/search" className="btn add-btn"><i className="lni-plus"></i>Add new item</Link>
                    </Row>
                    <Collection checkPage="home" list={this.props.collection} />
                </Container>
                {this.props.checkModal &&
                    <MyModal />
                }
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        collection: state.collection,
        checkModal: state.checkModal
    }
}

const mapDitspatchToProps = (dispatch) => {
    return {
        toggleModal: (check) => {
            dispatch(toggleModal(check))
        },
    }
}

export default connect(
    mapStateToProps, mapDitspatchToProps
)(Home);