import React, { Component } from 'react';
import GoogleAuth from './GoogleAuth';

const Input = (props) => {

    return (
        <div className="bg-orange-300 h-64 flex items-center justify-center flex-col">
            <GoogleAuth/>

            <label className="font text-5xl">Search books:</label>
            <input type="text" value={props.value} onChange={props.onChange} className="bg-transparent font text-3xl border-dotted border-b-2 border-black w-1/6 outline-none text-center"/>
        </div>
    )
}

export default Input;
