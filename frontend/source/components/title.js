import ImageSlider from "./slider";
import { Link, Routes, useNavigate } from "react-router-dom";

const Title = () => {
    const titleStyle = {
        backgroundColor: '#333', // Brown background color
        padding: '20px',
        fontFamily: 'Abril Fatface', // Font family
        color: '#fff', // Font color
        // position : 'fixed',
        width: '100%'
        // textAlign: 'center', // Center align text
    };

    return (
        <div style={titleStyle}>
            <h2>Pet Care Hub</h2>
        </div>
    );
}

export default Title;
