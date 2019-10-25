import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row } from 'reactstrap';
import Collection from '../Home/collection/collection'
import { getResultFromApi } from '../../redux/reducers/action';
import MyModal from '../Modal/Modal'


class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            result: [],
        }
    }

    onChange = (e) => {
        getResultFromApi(e.target.value, (data) => {
            this.setState({
                result: data,
            })
        });
    }

    render() {
        return (
            <div className="search">
                <Container>
                    <Link className="back" to="/"><i className="lni-chevron-left"></i>Back to collection</Link>
                    <h1 className="search_title">
                        Search from nasa
                    </h1>
                    <input className="search_input" onChange={this.onChange} type="text" placeholder="Type something to search..." />
                    <Row>
                        <Collection checkPage="search" list={this.state.result} />
                    </Row>
                </Container>
                {this.props.checkModal &&
                    <MyModal checkPage="search" />
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        checkModal: state.checkModal
    };
}

export default connect(
    mapStateToProps
)(Search);