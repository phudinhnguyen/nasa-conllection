import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';
import CollectionItem from './collectionItem/collectionItem'

class Collection extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const result = this.props.list.map((item, index) => {
            return <CollectionItem checkPage={this.props.checkPage} resultItem={item} key={index}/>
        })
        return (            
            <Row className="collection">
                {result}
            </Row>
        );
    }
}

const mapStateToProps = state => {
    return {

    }
}

export default connect(
    mapStateToProps,
)(Collection);