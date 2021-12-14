import {React, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../../components/searchBar/SearchBar';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './Search.css'
import qs from 'query-string';
import {useHistory } from 'react-router-dom';
import Result from './../../features/Result/Result';
import AOS from 'aos'
// import {Spinner} from 'react-bootstrap';
// import { createPortal } from 'react-dom';
Search.propTypes = {
    option: PropTypes.bool,
    setOption: PropTypes.func,
    retrieval: PropTypes.bool,
    setRetrieval: PropTypes.func,
};

function Search(props) {
    AOS.init();
    const {option, setOption, retrieval, setRetrieval} = props;
    const [result, setResult] = useState({});
    const location = useLocation();
    const [wait, setWait] = useState(false);
    // console.log(qs.parse(location.search));
    let history = useHistory();

    useEffect(()=>{
        if(!!(window.sessionStorage.getItem(JSON.stringify(qs.parse(location.search)))) === true){
            console.log("Đã có trong storage");
            const storage_result = window.sessionStorage.getItem(JSON.stringify(qs.parse(location.search)))
            // console.log(JSON.parse(storage_result));
            setResult(JSON.parse(storage_result));
            setWait(true);
        }
        else{
            // console.log(qs.parse(location.search))
            var bodyFormData = new FormData();
            bodyFormData.append('key',qs.parse(location.search).search)
            if(qs.parse(location.search).type === 'true'){
                bodyFormData.append('model','corpus')
            }else bodyFormData.append('model','cranfield')
            if(qs.parse(location.search).retrieval === 'true'){
                
                bodyFormData.append('data','BIM')
            }else bodyFormData.append('data','VSM')
            setWait(false)
            // for (var value of bodyFormData.values()) {
            //     console.log(value);
            //  }
            axios({
                method: 'post',
                url: 'http://127.0.0.1:3000/app',
                data: bodyFormData,
            })
            .then(function (response) {
                console.log(response.data)
                setResult(response.data)
                setWait(true)
                const value = JSON.stringify(response.data);
                const key = JSON.stringify(qs.parse(location.search))
                window.sessionStorage.setItem(key, value);
                console.log("Đây là câu hỏi khác");
            })
        }
        
    },[location.search])  

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
                <SearchBar onSubmit={onSubmit} option={option} setOption={setOption} qury={qs.parse(location.search)} retrieval={ retrieval} setRetrieval={setRetrieval}/>
            </div>
            { wait ? <div className="search-result">
            {   
                    Object.keys(result).map(key =>{
                    return <Result key={key} data={result[key]} stt={key}/>
                })

            }
            { !Object.keys(result).length && <Result key={'null'} data={"Không tìm thấy kết quả"} stt={"Unknown"}/>}
            </div> : hangOn() }
            
            <div className="bottom-footer">

            </div>
        </div>
    );
}

export default Search;