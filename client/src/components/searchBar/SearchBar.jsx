import {React, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useForm } from "react-hook-form";
import '../searchBar/searchBar.css';
SearchBar.propTypes = {
    onSubmit: PropTypes.func,
    option: PropTypes.bool,
    setOption: PropTypes.func,
    qury: PropTypes.object,
    retrieval: PropTypes.bool,
    setRetrieval: PropTypes.func,
};

function SearchBar(props) {
    const {onSubmit, option, setOption, qury, retrieval, setRetrieval} = props;
    const [check, setCheck] = useState({});
    const [check1, setCheck1] = useState({})
    

    const { register, handleSubmit, setValue } = useForm();

    // console.log(qury.search);

    useEffect(() =>{
        // console.log((document.querySelector('.option')));
        setCheck(document.querySelector('.option'));
        setCheck1(document.querySelector('.option-1'));
        // if(option){
        //     document.querySelector('.option').checked = true;
        // }else document.querySelector('.option').checked = false;
    },[]);

    useEffect(()=>{
        setValue("search", qury.search)
        setValue("type", option)
        setValue("retrieval", retrieval)
    },);

    function handleCheckBox(){
        if(check.checked){
            setOption(true);
        }else setOption(false);
    }

    function handleCheckBox1(){
        if(check1.checked){
            setRetrieval(true);
        }else setRetrieval(false);
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
                        <label  className="switch">
                            <input className="option" type="checkbox" onClick={handleCheckBox} name="type" {...register("type")}/> {/* {...register("type")} */}
                            <span className="slider round"></span>
                        </label>
                        <span>Corpus</span>
                    </div>

                    <div className="switch-option">
                        <span>VSM  </span>
                        <label className="switch-1">
                            <input className="option-1" type="checkbox" onClick={handleCheckBox1} name="retrieval" {...register("retrieval")}/>
                            <span className="slider round"></span>
                        </label>
                        <span>BIM</span>
                    </div>
                    
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