import React, { Component } from 'react'

const year=new Date().getFullYear();
 class Footer extends Component {
    render() {
        return (
            
                <div>
            <footer className="bg-dark mg-4 p-4 text-white text-center">
            Copyright &copy;{year} DevConnector
            </footer>
             </div>
            
        )
    }
}
export default Footer;

