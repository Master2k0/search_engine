import {React, useState} from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../../components/searchBar/SearchBar';
import 'bootstrap/dist/css/bootstrap.css';
import './Home.css';
import {useHistory, useLocation } from 'react-router-dom';
import qs from 'query-string';
Home.propTypes = {
    option: PropTypes.bool,
    setOption: PropTypes.func,
};

function Home(props) {
    const {option, setOption} = props;
    const location = useLocation();
    let history = useHistory();

    function onSubmit(values){
        history.push({
            pathname: '/search',
            search: qs.stringify(values),  // query string
            state: {  // location state
              q: true, 
            },
          }); 
    }
    return (
        <div className="home">
            <div className="container">
            <div className="name-search">
                <span>Search Engine</span>
            </div>
            <div className="input">
                <SearchBar onSubmit={onSubmit} option={option} setOption={setOption} qury={qs.parse(location.search)}/>
            </div>
        </div>
        </div>
    );
}

export default Home;