import m1 from './pets1.jpg';
import m2 from './pets2.jpg';
import m3 from './pets3.jpg';

const Home = () => {
    return (
        <div>
            <div>
                {/* <img src={m1}></img>
                <img src={m2}></img> */}
                <img src={m3} alt="Pet 3" style={{ width: '100%' }}></img>
            </div>
        </div>
    );
}

export default Home;
