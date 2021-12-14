import React from 'react';
import PropTypes from 'prop-types';
import './Result.css'
import AOS from 'aos'
import "aos/dist/aos.css";
AOS.init();
Result.propTypes = {
    data: PropTypes.object,
};

function Result(props) {
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    const {data} = props;
    // console.log("data ne", stt)
    return (
        
        <div data-aos="fade-result" data-aos-duration="1000" className="result">
            <br></br>
            <div className="result__row1">
                <span className="index">[#{data.key}]</span>
            </div>
            
            <div className="result__row3">
                <span className="content">{capitalizeFirstLetter(data.text)}</span>
            </div>
        </div>
    );
}

export default Result;