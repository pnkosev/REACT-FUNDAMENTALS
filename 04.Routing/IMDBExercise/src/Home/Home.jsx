import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Home.css'

class Home extends Component {
  render() {
    const { movies, user, isAdmin, isLoading } = this.props;
    return (
      <div className="Home">
        <h1>All movies</h1>
        {
          isLoading ? (
            <span>Loading...</span>
          ) : (
              <ul className="movies">
                {
                  movies.map((movie, index) => (
                    <li key={movie._id} className="movie">
                      <h2>{movie.title}</h2>
                      <img src={movie.poster} alt="" />
                      {
                        user || isAdmin ? (
                          <span>
                            <button>
                              <Link to={"movie/" + index + "/trailer"} onClick={() => {
                                this.props.selectMovie(index);
                              }}>View Trailer
                        </Link>
                            </button>
                            <button>
                              <Link to={"movie/" + index + "/storyLine"} onClick={() => {
                                this.props.selectMovie(index);
                              }}>View Story Line
                        </Link>
                            </button>
                          </span>
                        ) : (
                            null
                          )
                      }
                    </li>
                  ))
                }
              </ul>
            )
        }
      </div>
    );
  }
}

export default Home;
