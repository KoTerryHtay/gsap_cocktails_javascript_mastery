import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function App() {
  return (
    <div className="noisy h-[100vh] flex-center">
      <div className="text-indigo-300 text-3xl">App</div>
    </div>
  );
}
