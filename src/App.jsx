import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const glyphs = ["♥", "❤", "💕", "💗"];

    // 1. Scroll karne par hearts
    let lastY = window.scrollY;
    let lastSpawn = 0;

    function floatHeart() {
      const h = document.createElement("span");

      h.className = "heart";
      h.textContent =
        glyphs[Math.floor(Math.random() * glyphs.length)];

      h.style.left = Math.random() * 95 + "vw";
      h.style.fontSize = 16 + Math.random() * 14 + "px";

      h.style.setProperty(
        "--dx",
        Math.random() * 80 - 40 + "px"
      );

      h.style.setProperty(
        "--r",
        Math.random() * 60 - 30 + "deg"
      );

      h.style.animationDuration =
        3.5 + Math.random() * 2.5 + "s";

      h.style.opacity = 0.55 + Math.random() * 0.4;

      document.body.appendChild(h);

      setTimeout(() => h.remove(), 6500);
    }

    function handleScroll() {
      if (reduce) return;

      const now = Date.now();

      if (
        Math.abs(window.scrollY - lastY) > 60 &&
        now - lastSpawn > 220
      ) {
        floatHeart();

        lastSpawn = now;
        lastY = window.scrollY;
      }
    }

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    // 2. Click par heart burst + ripple
    function handleClick(e) {
      if (reduce) return;

      for (let i = 0; i < 6; i++) {
        const b = document.createElement("span");

        b.className = "burst";
        b.textContent = "♥";

        b.style.left = e.clientX + "px";
        b.style.top = e.clientY + "px";

        b.style.fontSize =
          12 + Math.random() * 10 + "px";

        const a =
          Math.PI * 2 * i / 6 +
          Math.random() * 0.5;

        const d = 40 + Math.random() * 40;

        b.style.setProperty(
          "--bx",
          Math.cos(a) * d + "px"
        );

        b.style.setProperty(
          "--by",
          Math.sin(a) * d + "px"
        );

        document.body.appendChild(b);

        setTimeout(() => b.remove(), 950);
      }

      const btn = e.target.closest(".btn");

      if (btn) {
        const r = btn.getBoundingClientRect();

        const s = Math.max(
          r.width,
          r.height
        );

        const rp = document.createElement("span");

        rp.className = "ripple";

        rp.style.width = s + "px";
        rp.style.height = s + "px";

        rp.style.left =
          e.clientX -
          r.left -
          s / 2 +
          "px";

        rp.style.top =
          e.clientY -
          r.top -
          s / 2 +
          "px";

        btn.appendChild(rp);

        setTimeout(() => rp.remove(), 700);
      }
    }

    window.addEventListener("click", handleClick);

    // 3. Cartoon animation
    const scene =
      document.getElementById("scene");

    const sceneObserver =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              scene.classList.add("play");
            } else {
              scene.classList.remove("play");
            }
          });
        },
        { threshold: 0.6 }
      );

    if (scene) {
      sceneObserver.observe(scene);

      scene.addEventListener("click", () => {
        scene.classList.remove("play");

        void scene.getBoundingClientRect();

        scene.classList.add("play");
      });
    }

    // 4. Sections reveal animation
    const io =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add("show");

              io.unobserve(en.target);
            }
          });
        },
        { threshold: 0.15 }
      );

    const revealElements =
      document.querySelectorAll(".reveal");

    revealElements.forEach((el, i) => {
      el.style.transitionDelay =
        (i % 3) * 90 + "ms";

      io.observe(el);
    });

    // Cleanup
    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "click",
        handleClick
      );

      sceneObserver.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div>
      <nav>
        <div className="wrap">
          <a href="#top" className="logo">
            Love<span>Beat</span>
          </a>

          <ul>
            <li>
              <a href="#kaise">
                How To Work
              </a>
            </li>

            <li>
              <a href="#safe">
                Safety
              </a>
            </li>

            <li>
              <a href="#join">
                Join 
              </a>
            </li>
          </ul>

          <a href="#join" className="btn">
            Login
          </a>
        </div>
      </nav>

      {/* HERO */}

      <header className="hero" id="top">
        <div className="wrap">

          <div className="intro">
            <h1>
              Ek call, nayi shuruaat
            </h1>

            <p>
              Apni pasand ka insaan chuno
              aur ek tap me call karo.
            </p>

            <div className="btns">
              <a href="#join" className="btn">
                Abhi shuru karein
              </a>

              <a
                href="#kaise"
                className="btn ghost"
              >
                Dekhein kaise
              </a>
            </div>
          </div>

          <div
            className="phone"
            aria-hidden="true"
          >
            <div className="screen">

              <div className="avatar">
                ♥
              </div>

              <b>Priya</b>

              <small>
                Aapko call kar rahi hai...
              </small>

              <div className="actions">

                <div className="dot no">
                  ×
                </div>

                <div className="dot yes">
                  ☎
                </div>

              </div>
            </div>
          </div>

        </div>
      </header>

      {/* CARTOON */}

      <section className="scene-sec">

        <div className="wrap">

          <h2 className="reveal">
            Pehli call, pehli muskaan
          </h2>

          <svg
            className="scene"
            id="scene"
            viewBox="0 0 640 230"
            role="img"
            aria-label="Ek ladka daudkar ladki ko gale lagata hua"
          >

            <rect
              x="10"
              y="190"
              width="620"
              height="5"
              rx="5"
              fill="#ffd1dc"
            />

            <g className="pair">

              {/* LADKI */}

              <g transform="translate(580,190)">

                <g className="girl">

                  <g className="bob">

                    <circle
                      cy="-98"
                      r="18"
                      fill="#2a0d22"
                    />

                    <rect
                      x="-18"
                      y="-98"
                      width="14"
                      height="40"
                      rx="7"
                      fill="#2a0d22"
                    />

                    <rect
                      className="leg g-legr"
                      x="-9"
                      y="-42"
                      width="7"
                      height="42"
                      rx="3"
                      fill="#e0a07a"
                    />

                    <rect
                      className="leg g-legl"
                      x="2"
                      y="-42"
                      width="7"
                      height="42"
                      rx="3"
                      fill="#f2b48c"
                    />

                    <path
                      d="M-12,-84 L12,-84 L24,-36 L-24,-36 Z"
                      fill="#e8456b"
                    />

                    <circle
                      cy="-100"
                      r="15"
                      fill="#f2b48c"
                    />

                    <path
                      d="M-15,-102 A15,15 0 0 1 15,-102 Q0,-112 -15,-102 Z"
                      fill="#2a0d22"
                    />

                    <circle
                      cx="-6"
                      cy="-99"
                      r="2"
                      fill="#2a0d22"
                    />

                    <path
                      d="M-9,-92 q4,4 8,0"
                      stroke="#c0394f"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />

                    <rect
                      className="arm g-arm"
                      x="-4"
                      y="-82"
                      width="8"
                      height="36"
                      rx="4"
                      fill="#f2b48c"
                    />

                  </g>

                </g>

              </g>

              {/* LADKA */}

              <g transform="translate(60,190)">

                <g className="boy">

                  <g className="bob">

                    <rect
                      className="arm b-armr"
                      x="-4"
                      y="-82"
                      width="8"
                      height="36"
                      rx="4"
                      fill="#e0a07a"
                    />

                    <rect
                      className="leg b-legr"
                      x="-5"
                      y="-42"
                      width="10"
                      height="42"
                      rx="5"
                      fill="#2c4a8a"
                    />

                    <rect
                      className="leg b-legl"
                      x="-5"
                      y="-42"
                      width="10"
                      height="42"
                      rx="5"
                      fill="#35569f"
                    />

                    <rect
                      x="-13"
                      y="-86"
                      width="26"
                      height="48"
                      rx="10"
                      fill="#4a2a8a"
                    />

                    <circle
                      cy="-101"
                      r="15"
                      fill="#f2b48c"
                    />

                    <path
                      d="M-15,-103 A15,15 0 0 1 15,-103 Q0,-98 -15,-103 Z"
                      fill="#2a0d22"
                    />

                    <circle
                      cx="6"
                      cy="-100"
                      r="2"
                      fill="#2a0d22"
                    />

                    <path
                      d="M2,-93 q4,4 8,0"
                      stroke="#c0394f"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />

                    <rect
                      className="arm b-arml"
                      x="-4"
                      y="-82"
                      width="8"
                      height="36"
                      rx="4"
                      fill="#f2b48c"
                    />

                  </g>

                </g>

              </g>

              <text
                className="love"
                x="322"
                y="88"
                textAnchor="middle"
                fontSize="34"
                fill="#e8456b"
              >
                ♥
              </text>

            </g>

          </svg>

          <p className="hint">
            Love Beat
          </p>

        </div>

      </section>

      {/* HOW */}

      <section id="kaise">

        <div className="wrap">

          <h2 className="reveal">
            Teen kadam, bas itna hi
          </h2>

          <p className="sub reveal">
            Profile banao, kisi ko chuno,
            aur call lagao.
          </p>

          <div className="steps">

            <div className="card reveal">

              <div className="n">1</div>

              <h3>
             Create Your Profile
              </h3>

              <p>
               Add your name, photo, and a short introduction about yourself. Whether you’re a boy or a girl, the process is simple and easy for everyone.
              </p>

            </div>

            <div className="card reveal">

              <div className="n">2</div>

              <h3>
              Choose Someone
              </h3>

              <p>
                Browse profiles and send a call request to someone you like.
              </p>

            </div>

            <div className="card reveal">

              <div className="n">3</div>

              <h3>
                Talk on a Call
              </h3>

              <p>
                Once the other person accepts, the call connects. No need to share your phone number.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* SAFETY */}

      <section id="safe">

        <div className="wrap">

          <div className="safe reveal">

            <div>

              <h2>
                Your Choice, Your <br></br> Control
              </h2>

              <p>
    A call only happens when the other person accepts it. If anything feels wrong, you can block or report them with just one tap.
              </p>

            </div>

            <ul>

              <li>
               Your phone number always stays private
              </li>

              <li>
You decide whether to accept or reject a call
              </li>

              <li>
Block or report anyone at any time
              </li>

            </ul>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="cta" id="join">

        <div className="wrap">

          <h2 className="reveal">
             Ready for your first call?

          </h2>

          <p className="sub reveal">
          Create your free account — it takes less than a minute.

          </p>

          <a
            href="#"
            className="btn reveal"
          >
            Create Account
          </a>

        </div>

      </section>

      <footer>
       © 2026 LoveBeat Connect Talk Feel
      </footer>

    </div>
  );
}

export default App;