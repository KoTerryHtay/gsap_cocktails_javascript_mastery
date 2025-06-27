import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // const videoTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    const heroSplit = new SplitText(".title", { type: "chars, words" });

    const paragraphSplit = new SplitText(".subtitle", { type: "lines" });

    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.05,
    });

    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "elastic.out",
      stagger: 0.06,
      delay: 1, // start one second after the headline animation finishes
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          // start when the top of the homepage hits the top of the screen and end when the bottom of the homepage hits the top of the screen
          scrub: true, // animation progress will be directly related to the scroll which will make it feel natural.
        },
      })
      .to(".right-leaf", { y: 200 }, 0)
      .to(".left-leaf", { y: -200 }, 0);

    // first element refer to the element we're animating
    const startValue = isMobile ? "top 50%" : "center 60%";
    // when the top of the video reaches 50% down the screen, the animation starts
    // when the center of the video reaches 60% down the screen, the animation starts

    const endValue = isMobile ? "120% top" : "bottom top";
    // the percentage at the start. So this means that when the top of the video goes 120% past the top of the screen, meaning far off the screen,we end the animation
    // bottom top means that when the bottom of the video reaches the top of the screen, then the animation ends

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "video",
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true,
      },
    });

    videoRef.current!.onloadedmetadata = () => {
      tl.to(videoRef.current, {
        currentTime: videoRef.current?.duration,
      });
    };
  }, []);

  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">MOJITO</h1>
        <img
          src="/images/hero-left-leaf.png"
          alt="left-leaf"
          className="left-leaf"
        />
        <img
          src="/images/hero-right-leaf.png"
          alt="right-leaf"
          className="right-leaf"
        />

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Classic.</p>
              {/* sub-content */}
              <p className="subtitle">
                Sip the Spirit <br /> of Summer
              </p>
            </div>

            <div className="view-cocktails">
              <p className="subtitle">
                Every cocktail on our menu is a blend of premium ingredients,
                creative flair, and timeless recipes — designed to delight your
                senses.
              </p>
              <a href="#cocktails">View Cocktails</a>
            </div>
          </div>
        </div>
      </section>
      <div className="video absolute inset-0">
        <video
          ref={videoRef}
          src="/videos/output.mp4"
          muted
          playsInline
          preload="auto"
        />
      </div>
    </>
  );
}
