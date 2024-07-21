import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import SplitText from "gsap-trial/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText)
const usegsap = () => {


    useGSAP(() => {

        var tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: "#one",
                pin: true,
                start: "50% 50%",
                end: "150% 50%",
                scrub: true
            }
        });

        gsap.timeline({
            scrollTrigger: {
                trigger: "#img-one",
                start: "0% 90%",
                end: "200% 90%",
                scrub: true,
                // markers: true,
            }
        })
        tl2.to("#one-text", {
            top: "50%",
            stagger: 0.05,
            duration: 1
        })

        
        const texOne = new SplitText(".text-span", { type: "chars" })
        const charsTextOne = texOne.chars

        const text = gsap.timeline({
            scrollTrigger: {
                trigger: "#one-text",
                start: "0% 50%",
                end: "bottom 20%",
                // markers: true,
            }
        })

        text.from(charsTextOne, {
            stagger: 0.05,
            duration: 1,
            y: 100,
            ease: "back.inOut",
        })
        

        gsap.timeline({
            scrollTrigger: {
                trigger: "#img-one",
                start: "0% 90%",
                end: "bottom 90%",
                scrub: true,
                // markers: true,
            }
        }).to("#img-one", {
            backgroundSize: "50%",
        });



        gsap.timeline({
            scrollTrigger: {
                trigger: "#img-two",
                start: "0% 90%",
                end: "bottom 90%",
                scrub: true,
                // markers: true,
            }
        }).to("#img-two", {
            backgroundSize: "50%",

        })

        gsap.timeline({
            scrollTrigger: {
                trigger: "#img-three",
                start: "0% 90%",
                end: "bottom 90%",
                scrub: true,
                // markers: true,
            }
        }).to("#img-three", {
            backgroundSize: "50%",
        });

        gsap.timeline({
            scrollTrigger: {
                trigger: "#img-four",
                start: "0% 90%",
                end: "bottom 90%",
                scrub: true,
                // markers: true,
            }
        }).to("#img-four", {
            backgroundSize: "50%",
        });

        gsap.timeline({
            scrollTrigger: {
                trigger: "#img-five",
                start: "0% 90%",
                end: "bottom 90%",
                scrub: true,
                // markers: true,
            }
        }).to("#img-five", {
            backgroundSize: "50%",
        });

        gsap.timeline({
            scrollTrigger: {
                trigger: "#img-six",
                start: "0% 90%",
                end: "bottom 90%",
                scrub: true,
                // markers: true,
            }
        }).to("#img-six", {
            backgroundSize: "50%",
        });

        gsap.timeline({
            scrollTrigger: {
                trigger: "#img-seven",
                start: "0% 90%",
                end: "bottom 90%",
                scrub: true,
                // markers: true,
            }
        }).to("#img-seven", {
            backgroundSize: "50%",
        });

    }, [])

    const teste = () => {
        
      };

    return {
        teste,
    }

}
export default usegsap;