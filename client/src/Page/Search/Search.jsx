import {React, useEffect, useRef , useState} from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../../components/searchBar/SearchBar';
import { useLocation } from 'react-router-dom';
import './Search.css'
import qs from 'query-string';
import {useHistory } from 'react-router-dom';
import Result from './../../features/Result/Result';
import AOS from 'aos'
import {Spinner} from 'react-bootstrap';
import { createPortal } from 'react-dom';
Search.propTypes = {
    option: PropTypes.bool,
    setOption: PropTypes.func,
};

const result_query = [ {
                            "Title": "experimental investigation of the aerodynamics of a wing in a slipstream .", 
                            "Author": "brenckman,m.", 
                            "Year": "j. ae. scs. 25, 1958, 324.", 
                            "Content": "experimental investigation of the aerodynamics of a wing in a slipstream . an experimental study of a wing in a propeller slipstream was made in order to determine the spanwise distribution of the lift increase due to slipstream at different angles of attack of the wing and at different free stream to slipstream velocity ratios . the results were intended in part as an evaluation basis for different theoretical treatments of this problem . the comparative span loading curves, together with supporting evidence, showed that a substantial part of the lift increment produced by the slipstream was due to a /destalling/ or boundary-layer-control effect . the integrated remaining lift increment, after subtracting this destalling lift, was found to agree well with a potential flow theory . an empirical evaluation of the destalling effects was made for the specific configuration of the experiment .", 
                            "STT": 1}, 
                            {"Title": "simple shear flow past a flat plate in an incompressible fluid of small viscosity .", 
                            "Author": "ting-yili", 
                            "Year": "department of aeronautical engineering, rensselaer polytechnic institute troy, n.y.", 
                            "Content": "simple shear flow past a flat plate in an incompressible fluid of small viscosity . in the study of high-speed viscous flow past a two-dimensional body it is usually necessary to consider a curved shock wave emitting from the nose or leading edge of the body . consequently, there exists an inviscid rotational flow region between the shock wave and the boundary layer . such a situation arises, for instance, in the study of the hypersonic viscous flow past a flat plate . the situation is somewhat different from prandtl's classical boundary-layer problem . in prandtl's original problem the inviscid free stream outside the boundary layer is irrotational while in a hypersonic boundary-layer problem the inviscid free stream must be considered as rotational . the possible effects of vorticity have been recently discussed by ferri and libby . in the present paper, the simple shear flow past a flat plate in a fluid of small viscosity is investigated . it can be shown that this problem can again be treated by the boundary-layer approximation, the only novel feature being that the free stream has a constant vorticity . the discussion here is restricted to two-dimensional incompressible steady flow .", 
                            "STT": 2}, 
                            {"Title": "the boundary layer in simple shear flow past a flat plate .", 
                            "Author": "m. b. glauert", 
                            "Year": "department of mathematics, university of manchester, manchester, england", 
                            "Content": "the boundary layer in simple shear flow past a flat plate . the boundary-layer equations are presented for steady incompressible flow with no pressure gradient .", 
                            "STT": 3}, 
                            {"Title": "approximate solutions of the incompressible laminar boundary layer equations for a plate in shear flow .", 
                            "Author": "yen,k.t.", 
                            "Year": "j. ae. scs. 22, 1955, 728.", 
                            "Content": "approximate solutions of the incompressible laminar boundary layer equations for a plate in shear flow . the two-dimensional steady boundary-layer problem for a flat plate in a shear flow of incompressible fluid is considered . solutions for the boundary- layer thickness, skin friction, and the velocity distribution in the boundary layer are obtained by the karman-pohlhausen technique . comparison with the boundary layer of a uniform flow has also been made to show the effect of vorticity .", 
                            "STT": 4}, 
                             {"Title": "one-dimensional transient heat conduction into a double-layer slab subjected to a linear heat input for a small time internal .", 
                            "Author": "wasserman,b.", 
                            "Year": "j. ae. scs. 24, 1957, 924.", 
                            "Content": "one-dimensional transient heat conduction into a double-layer slab subjected to a linear heat input for a small time internal . analytic solutions are presented for the transient heat conduction in composite slabs exposed at one surface to a triangular heat rate . this type of heating rate may occur, for example, during aerodynamic heating .", 
                            "STT": 5}
]

const result_query_1 = [
                            {"Title": "approximate solutions of the incompressible laminar boundary layer equations for a plate in shear flow .", 
                            "Author": "yen,k.t.", 
                            "Year": "j. ae. scs. 22, 1955, 728.", 
                            "Content": "approximate solutions of the incompressible laminar boundary layer equations for a plate in shear flow . the two-dimensional steady boundary-layer problem for a flat plate in a shear flow of incompressible fluid is considered . solutions for the boundary- layer thickness, skin friction, and the velocity distribution in the boundary layer are obtained by the karman-pohlhausen technique . comparison with the boundary layer of a uniform flow has also been made to show the effect of vorticity .", 
                            "STT": 4}, 
                             {"Title": "one-dimensional transient heat conduction into a double-layer slab subjected to a linear heat input for a small time internal .", 
                            "Author": "wasserman,b.", 
                            "Year": "j. ae. scs. 24, 1957, 924.", 
                            "Content": "one-dimensional transient heat conduction into a double-layer slab subjected to a linear heat input for a small time internal . analytic solutions are presented for the transient heat conduction in composite slabs exposed at one surface to a triangular heat rate . this type of heating rate may occur, for example, during aerodynamic heating .", 
                            "STT": 5}
]

function Search(props) {
    AOS.init();
    const {option, setOption} = props;
    const location = useLocation();
    // console.log(qs.parse(location.search));
    let history = useHistory();

    // Chỗ để vọc////////////////////////////////////////////////////////////////

    const [umbala, setUmbala] = useState(false);
    const [query, setQuery] = useState([]);
    setTimeout(function(){ 
        setUmbala(true);
    }, 3000);

    useEffect(()=>{
        console.log(location.search)
        if(!!(window.sessionStorage.getItem(JSON.stringify(qs.parse(location.search)))) === true){
            console.log("Đã có trong storage");
            const storage_result = window.sessionStorage.getItem(JSON.stringify(qs.parse(location.search)))
            console.log(JSON.parse(storage_result));
            setQuery(JSON.parse(storage_result));
        }
        else if(qs.parse(location.search).search === 'hi'){
            const value = JSON.stringify(result_query);
            const key = JSON.stringify(qs.parse(location.search))
            window.sessionStorage.setItem(key, value);
            console.log("đây là hi")
            setQuery(result_query);
        }else {
            const value = JSON.stringify(result_query_1);
            const key = JSON.stringify(qs.parse(location.search))
            window.sessionStorage.setItem(key, value);
            setQuery(result_query_1);
            console.log("Đây là câu hỏi khác");
        }

    },[location.search])

    
    ///////////////////////////////////////////////////


    function onSubmit(values){
        history.push({
            pathname: '/search',
            search: qs.stringify(values),  // query string
            state: {  // location state
            q: true, 
            },
          });
    }

    function hangOn(){
        return(
            <div className="hang-on">
                <div className="spinner-grow text-primary first-time" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow text-secondary second-time" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow text-success third-time" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow text-danger fourth-time" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }
    return (
        <div className="search">
            <div className="top-header">
                <SearchBar onSubmit={onSubmit} option={option} setOption={setOption} qury={qs.parse(location.search)}/>
            </div>
            {umbala ? <div className="search-result">
            {query.map( result =>{
                return <Result key={result.STT} outCome={result}/>
            })
            } 
            </div> : hangOn() }
               
        </div>
    );
}

export default Search;