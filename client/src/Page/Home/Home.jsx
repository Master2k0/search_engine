import {React} from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../../components/searchBar/SearchBar';
import 'bootstrap/dist/css/bootstrap.css';
import './Home.css';
import {useHistory, useLocation } from 'react-router-dom';
import qs from 'query-string';
import Canvas from '../../features/Canvas/Canvas';
Home.propTypes = {
    option: PropTypes.bool,
    setOption: PropTypes.func,
    retrieval: PropTypes.bool,
    setRetrieval: PropTypes.func,
};

function Home(props) {
    const {option, setOption, retrieval, setRetrieval} = props;
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
            <Canvas/>
            <div className="container">
            <div className="name-search">
                <span>Search Engine</span>
            </div>
            <div className="input">
                <SearchBar onSubmit={onSubmit} option={option} setOption={setOption} qury={qs.parse(location.search)} retrieval={ retrieval} setRetrieval={setRetrieval}/>
            </div>
        </div>
        </div>
    );
}

export default Home;