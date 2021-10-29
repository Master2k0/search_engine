import {React, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useForm } from "react-hook-form";
import '../searchBar/searchBar.css';
import qs from 'query-string';
import {useLocation } from 'react-router-dom';
SearchBar.propTypes = {
    onSubmit: PropTypes.func,
    option: PropTypes.bool,
    setOption: PropTypes.func,
    qury: PropTypes.object,
};

function SearchBar(props) {
    const {onSubmit, option, setOption, qury} = props;
    const [check, setCheck] = useState({});
    

    const { register, handleSubmit, setValue } = useForm();

    // console.log(qury.search);

    useEffect(() =>{
        console.log((document.querySelector('.option')));
        setCheck(document.querySelector('.option'));
        // if(option){
        //     document.querySelector('.option').checked = true;
        // }else document.querySelector('.option').checked = false;
    },[]);

    useEffect(()=>{
        setValue("search", qury.search)
        setValue("type", option)
    },);

    function handleCheckBox(){
        if(check.checked){
            setOption(true);
        }else setOption(false);
    }
    
    

    const handleSm = (values)=>{
        // console.log(values);
        onSubmit(values);
        
    }
    return (
        <div>
            <form onSubmit={handleSubmit(handleSm)}>
            <div className="form-fill" >
                <div className="switch-option">
                    <span>CranField</span>
                    <label className="switch">
                        <input className="option" type="checkbox" onClick={handleCheckBox} name="type" {...register("type")}/>
                        <span className="slider round"></span>
                    </label>
                    <span>Corpus</span>
                </div>

                {/* <div className="switch-option">
                    <span>CranField</span>
                    <label className="switch">
                        <input className="option" type="checkbox" onClick={handleCheckBox} name="retrival" {...register("type")}/>
                        <span className="slider round"></span>
                    </label>
                    <span>Corpus</span>
                </div> */}
                
                <div className="form-submit">
                    <input type='text' id="search" className="input-search" {...register("search")} name="search" />
                    <button className="submit" ></button>
                </div>
            </div>
        </form>
        </div>


    );
}

export default SearchBar;