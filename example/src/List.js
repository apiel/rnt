import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './App.css';

class List extends Component {
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
    return (
      <div className="App">
        <header className="App-header">
          <h1>The awesome app</h1>
          {this.state.data.map((item, index) => (
            <div key={index}>
              <h2>
                <Link to={{ pathname: `/item/${index}`}}>
                    {item.name}
                </Link>
              </h2>
              <img src={item.avatar} alt={item.name} />
              <p>{item.text}</p>
              <Link to={{ pathname: `/item/${index}`}}>link</Link>
            </div>
          ))}
        </header>
      </div>
    );
  }
}

export default List;
