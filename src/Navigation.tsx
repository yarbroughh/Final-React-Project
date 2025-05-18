import { NavLink } from 'react-router-dom'
import type { NavigationProps } from './types';

function Navigation({ cartCount }: NavigationProps) {
    return (
        <nav className="sticky-top">
            <div className="container-fluid">
                <ul className="nav justify-content-end">
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link">Home</NavLink>
                    </li>
                   <li className="nav-item">
                        <NavLink to="/contact" className="nav-link">Contact</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/explore" className="nav-link">Explore</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/journal" className="nav-link">Journal</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/store" className="nav-link">Store</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/cart" className="nav-link"><i className="bi bi-cart"></i> {cartCount}</NavLink>
                    </li>

                </ul>
            </div>
        </nav>
    );
}

export default Navigation;