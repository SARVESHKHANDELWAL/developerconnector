import React, { Component } from 'react';
import spinner from '../../img/spinner.gif'

 class Spinner extends Component {
    render() {
        return (
            <div>
               <img style={{width:'100px',height:'100px',margin:'auto',display:'block'}} src={spinner} alt="Laoding..."/>
            </div>
        )
    }
}
export default Spinner;
