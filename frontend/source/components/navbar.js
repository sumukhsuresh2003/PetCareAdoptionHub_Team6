import { useNavigate, useLocation } from 'react-router-dom';

const Navbut = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navStyle = {
        backgroundColor: '#333',
        padding: '20px',
        width: '100%',
    };

    const ulStyle = {
        listStyleType: 'none',
        margin: '0',
        padding: '0',
        display: 'flex',
        justifyContent: 'space-around',
    };

    const liStyle = {
        display: 'inline',
        fontFamily: 'Arial, Helvetica, sans-serif',
        color: 'black',
        float: 'left'
    };

    const linkStyle = {
        textDecoration: 'none',
        color: 'black',
        color: '#fff',
        padding: '8px 16px',
        transition: 'background-color 0.3s'
    };

    const activeLinkStyle = {
        backgroundColor: '#945e34',
        borderRadius: '5px',
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <nav style={navStyle}>
            <ul style={ulStyle}>
                <li style={liStyle} onClick={() => handleNavigation('/home')}>
                    <a style={location.pathname === '/home' ? { ...linkStyle, ...activeLinkStyle } : linkStyle} href="#">Home</a>
                </li>
                <li style={liStyle} onClick={() => handleNavigation('/petprofile')}>
                    <a style={location.pathname === '/petprofile' ? { ...linkStyle, ...activeLinkStyle } : linkStyle} href="#">Pet Profile</a>
                </li>
               
                <li style={liStyle} onClick={() => handleNavigation('/adopt')}>
                    <a style={location.pathname === '/adopt' ? { ...linkStyle, ...activeLinkStyle } : linkStyle} href="#">Adopt</a>
                </li>
                <li style={liStyle} onClick={() => handleNavigation('/volunteer')}>
                    <a style={location.pathname === '/volunteer' ? { ...linkStyle, ...activeLinkStyle } : linkStyle} href="#">Volunteer</a>
                </li>
                <li style={liStyle} onClick={() => handleNavigation('/lost')}>
                    <a style={location.pathname === '/lost' ? { ...linkStyle, ...activeLinkStyle } : linkStyle} href="#">Lost</a>
                </li>
                <li style={liStyle} onClick={() => handleNavigation('/found')}>
                    <a style={location.pathname === '/found' ? { ...linkStyle, ...activeLinkStyle } : linkStyle} href="#">Found</a>
                </li>
                <li style={liStyle} onClick={() => handleNavigation('/login')}>
                    <a style={location.pathname === '/login' ? { ...linkStyle, ...activeLinkStyle } : linkStyle} href="#">Login</a>
                </li>
                <li style={liStyle} onClick={() => handleNavigation('/createacc')}>
                    <a style={location.pathname === '/createacc' ? { ...linkStyle, ...activeLinkStyle } : linkStyle} href="#">Create Account</a>
                </li>
            </ul>
        </nav>
    );
}

export default Navbut;
