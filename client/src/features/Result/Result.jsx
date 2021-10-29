import React from 'react';
import PropTypes from 'prop-types';
import './Result.css'
import AOS from 'aos'
import "aos/dist/aos.css";
AOS.init();
Result.propTypes = {
    outCome: PropTypes.object,
};

function Result(props) {
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    const {outCome} = props;
    return (
        <div data-aos="fade-result" data-aos-duration="1000" className="result">
            <div className="result__row1">
                <span className="index">#{outCome.STT}</span>
                <span className="title">{capitalizeFirstLetter(outCome.Title)}</span>
            </div>
            <div className="result__row2">
                <span className="author">{capitalizeFirstLetter(outCome.Author)}</span>
                <span className="year"> {capitalizeFirstLetter(outCome.Year)}</span>
            </div>
            <div className="result__row3">
                <span className="content">{capitalizeFirstLetter(outCome.Content)}</span>
            </div>
        </div>
    );
}

export default Result;