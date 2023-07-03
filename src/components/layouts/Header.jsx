import React from 'react';
import {Link, Link as RouterLink} from 'react-router-dom';
import { Avatar, Menu, Badge, Tooltip } from 'antd';
import '../CSS/header.css'

// const Header = () => {
//     return (
//         <>
//             <Menu mode="horizontal" className='d-block d-md-none login' triggerSubMenuAction="hover" disabledOverflow={true} getPopupContainer={node => node.parentNode}>
//                 <Menu.Item key="signup" className="menu-item outline">
//                     <Link to='/signup' >
//                         <span className="">Register</span>
//                     </Link>
//                 </Menu.Item>
//                 <Menu.Item key="login" className="menu-item button">
//                     <Link to='/login'>Login</Link>
//                 </Menu.Item>
//             </Menu>
//         </>
//     )
// };

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                {/*<Link to="/">*/}
                {/*    <img src="/path/to/logo.png" alt="Logo" />*/}
                {/*</Link>*/}
            </div>
            <nav className="nav">
                <ul className="nav-links">
                    <li>
                        <Link to="/">Explore</Link>
                    </li>
                    <li>
                        <Link to="/create">Create</Link>
                    </li>
                    <li>
                        <Link to="/my-items">My Items</Link>
                    </li>
                </ul>
            </nav>
            <div className="user-profile">
                <div className="user-info">
                    {/*<span className="username">John Doe</span>*/}
                    <span className="wallet-address"></span>
                </div>
                <div className="connect-wallet">
                    <Link to="/connect-wallet" className="connect-wallet-button">Connect Wallet</Link>
                </div>
            </div>
        </header>
    );
};

export default Header;