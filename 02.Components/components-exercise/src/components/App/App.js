import React, { Component } from 'react';
import './App.css';
import Street from '../Street/Street';
import House from '../House/House';
import HouseDetails from '../HouseDetails/HouseDetails';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            streets: [],
            selectedStreetIdx: 0,
            selectedHouseIdx: 0,
            hasFetched: false
        };
    }

    getSelectedStreet() {
        return this.state.streets[this.state.selectedStreetIdx].homes;
    };

    getSelectedHouse() {
        return this.state.streets[this.state.selectedStreetIdx].homes[this.state.selectedHouseIdx];
    };

    streetHoverEvent(idx) {
        this.setState({
            selectedStreetIdx: idx
        });
    };

    houseHoverEvent(idx) {
        this.setState({
            selectedHouseIdx: idx
        });
    };

    componentWillMount() {
        fetch('http://localhost:9999/feed/street/all')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    streets: data.streets,
                    hasFetched: true
                })
            })
            .catch(err => console.log(err));
    }

    render() {
        if (!this.state.hasFetched) {
            return null;
        }
        return (
            <div className="App">
                <div className="streets">
                    <h2>Streets</h2>
                    {
                        this.state.streets.length > 0 ? 
                        this.state.streets.map((street, idx) => {
                        return (<Street streetHoverEvent={this.streetHoverEvent.bind(this)} location={street.location} key={idx} id={idx} />)
                    }) : null 
                    }
                </div>
                <div className="houses">
                    <h2>Houses</h2>
                    {
                        this.getSelectedStreet().map((home, idx) => {
                            return (
                                <House houseHoverEvent={this.houseHoverEvent.bind(this)} imageUrl={home.imageUrl} key={idx} id={idx} />
                            )
                        })
                    }
                </div>
                <div className="house-details">
                    <h2>Details</h2>
                    {
                        this.state.streets.length > 0 ?
                        <HouseDetails type={this.getSelectedHouse().type}
                            description={this.getSelectedHouse().description}
                            imageUrl={this.getSelectedHouse().imageUrl}
                            price={this.getSelectedHouse().price}
                            key={this.state.selectedHouseIdx} />
                        : null
                    }
                </div>
            </div>
        );
    }
}

export default App;
