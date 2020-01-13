import React, { Component } from 'react';
import GoogleAuth from './GoogleAuth';

class Input extends Component {

    getData = (val) => {
        // do not forget to bind getData in constructor
        this.props.sendData(val);
    }

    render() {
        return (
            <div className="bg-orange-300 h-64 flex items-center justify-center flex-col">
                <GoogleAuth sendData={this.getData}/>
    
                <label className="font text-5xl">Search books:</label>
                <input type="text" value={this.props.value} onChange={this.props.onChange} className="bg-transparent font text-3xl border-dotted border-b-2 border-black w-1/6 outline-none text-center"/>
            </div>
        )
    }

}

export default Input;
