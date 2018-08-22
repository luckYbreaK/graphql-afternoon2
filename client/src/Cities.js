import React, {Component} from "react";
import gql from "graphql-tag";
import {graphql, Query} from "react-apollo";

class Cities extends Component {
    constructor() {
        super();

        this.state = {
            id: null,
            input: "",
            city: {}
        }
    }

    handleChange(val) {
        this.setState({
            input: val
        });
    }

    handleClick = async () => {
        
       let response = await this.props.addParam({
                variables: {
                    id: 1
                }
        })

        this.setState({
            city: response
        })
    }
        
        


    render(){
        return(
        <div>
            <input type="num" onChange={(e) => this.handleChange(e.target.value)} value={this.state.input}/>
            <button onClick={() => this.handleClick} >Get City</button>
            <p>{JSON.stringify(this.state.city)}</p>
            {/* {JSON.stringify(this.props.city)} */}
        </div>
        );
    }
}

const getCities = gql`
{
    cities {
        id
        city
        avgTempC
        avgTempF
    }
}
`

const getCity = gql`
query cityById($id:Int!){
  city(id:$id){
    city
    avgTempC
    avgTempF
  }
}
`

export default graphql(getCity, {name: "addParams"})(Cities);