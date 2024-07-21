import './index.css';
import { useEffect, useRef } from 'react';
import gsap from "gsap";
import ScrollSmoother from 'gsap-trial/ScrollSmoother';
import ScrollTrigger from 'gsap-trial/ScrollTrigger';

gsap.config({ trialWarn: false });
gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

import usegsap from '../hook/usegsap';
const App = () => {
    const{teste}=usegsap()
    // const containerRef = useRef(null);

    // useEffect(() => {
    //     const smoother = ScrollSmoother.create({
    //         wrapper: containerRef.current,
    //         content: containerRef.current.querySelector('#content'),
    //         smooth: 2,
    //         effects: true
    //     });
    //     console.log(smoother)
    //     return () => {
    //         smoother.kill();
    //     };
    // }, []);

    return (
        <div className="container" >
            <div id="content" className="content">
                

                <div className="fixed display-flex">
                    <div className="flex-p-content display-flex-column">
                        <div className="content-paragrafo-1">DEVELOPER <i>design</i></div>
                        <div className="content-paragrafo-2"></div>
                        <div className="nav display-flex">
                            <a className="info" href="#">info</a>
                            <a className="contact" href="#">contact</a>
                        </div>
                    </div>
                </div>
                <div id="one" className="section display-flex">
                    <h1 id="one-text" className="heading-text">
                        BLOGGER
                        <span className='text-span'>VISIT!</span>
                    </h1>

                </div>
                <div id="img-one" className="section-img"></div>

                <div id="two" className="section display-flex">
                    <h1 className="heading-text">STUDENT</h1>
                </div>
                <div id="img-two" className="section-img" onClick={teste}></div>

                <div id="three" className="section display-flex">
                    <h1 className="heading-text">DARK</h1>
                </div>
                <div id="img-three" className="section-img"></div>
                <div id="four" className="section display-flex">
                    <h1 className="heading-text">PHOTOGRHAP</h1>
                </div>
                <div id="img-four" className="section-img"></div>
                <div id="five" className="section display-flex">
                    <h1 className="heading-text">COLOR</h1>
                </div>
                <div id="img-five" className="section-img"></div>
                <div id="six" className="section display-flex">
                    <h1 className="heading-text">MODEL</h1>
                </div>
                <div id="img-six" className="section-img"></div>
                <div id="seven" className="section display-flex">
                    <h1 className="heading-text">ARTIST</h1>
                </div>
                <div id="img-seven" className="section-img"></div>
            </div>
        </div>
    );
};

export default App;
