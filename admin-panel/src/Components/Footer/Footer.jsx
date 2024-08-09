import React from 'react'
import "./Footer.css";

function Footer() {
    return (
        <div className='panel-footer flex-center pad-20'>
            <p>Conpyright &copy; {new Date().getFullYear()} || TradeConnect Admin Panel (MERN Stack)</p>
        </div>
    )
}

export default Footer
