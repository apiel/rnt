import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './App.css';

class Item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    }
  }

  loadData() {
    fetch('http://localhost:2000/')
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log('data', json);
        this.setState(() => ({
          data: json,
        }));
      });
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    const item = this.state.data[this.props.match.params.id];
    return (
      <div className="App">
        {item ? (
            <>
                <h2>
                    {item.name}
                </h2>
                <img src={item.avatar} alt={item.name} />
                <p>{item.text}</p>
                <p>{item.address}, {item.city}, {item.country}</p>
            </>
        ) : (<p>Loading</p>)}
      </div>
    );
  }
}

export default Item;

