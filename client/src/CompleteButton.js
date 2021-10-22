import React from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';
import { BsCircle } from 'react-icons/bs';

export default function CompleteButton({ isComplete, handleClick, handleClickParams = [] }) {
    return (
        <button type="button" className="complete-btn">{isComplete ? <AiFillCheckCircle className="complete-btn-check" onClick={() => handleClick(...handleClickParams)} /> :
            <BsCircle className="complete-btn-circle" onClick={() => handleClick(...handleClickParams)} />}</button>
    );
}