import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [messageKey, setMessageKey] = useState(0);
  const [messageDelivered, setMessageDelivered] = useState(false);

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

  // Message animation restart
  function sendMessage() {
    setMessageDelivered(false);

    setMessageKey((prev) => prev + 1);

    setTimeout(() => {
      setMessageDelivered(true);
    }, 4500);
  }

  return (
    <div>

      {/* NAVBAR */}

      <nav>
        <div className="wrap">

          <a
            href="#top"
            className="logo"
          >
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

          <a
            href="https://play.google.com/store/apps/details?id=com.lovetales.app"
            className="btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Login
          </a>

        </div>
      </nav>


      {/* HERO */}

      <header
        className="hero"
        id="top"
      >

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

              <a
                href="#join"
                className="btn"
              >
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

              <b>
                Priya
              </b>

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

              <div className="n">
                1
              </div>

              <h3>
                Create Your Profile
              </h3>

              <p>
                Add your name, photo, and a short introduction about yourself. Whether you’re a boy or a girl, the process is simple and easy for everyone.
              </p>

            </div>


            <div className="card reveal">

              <div className="n">
                2
              </div>

              <h3>
                Choose Someone
              </h3>

              <p>
                Browse profiles and send a call request to someone you like.
              </p>

            </div>


            <div className="card reveal">

              <div className="n">
                3
              </div>

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
                Your Choice, Your
                <br />
                Control
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

      <section
        className="cta"
        id="join"
      >

        <div className="wrap">


          {/* COUNTERS */}

          <div className="counter-container">


            {/* HAPPY USERS */}

            <div
              className="counter-box reveal"
              onClick={(e) => {

                const counter =
                  e.currentTarget.querySelector(
                    ".counter"
                  );

                const target = 10000;
                const duration = 1500;

                const startTime =
                  performance.now();

                function animate(time) {

                  const progress =
                    Math.min(
                      (time - startTime) /
                        duration,
                      1
                    );

                  const value =
                    Math.floor(
                      progress * target
                    );

                  counter.textContent =
                    value.toLocaleString() + "+";

                  if (progress < 1) {
                    requestAnimationFrame(
                      animate
                    );
                  }

                }

                requestAnimationFrame(
                  animate
                );

              }}
            >

              <strong className="counter">
                10,000+
              </strong>

              <span>
                Happy Users
              </span>

            </div>


            {/* CALLS MADE */}

            <div
              className="counter-box reveal"
              onClick={(e) => {

                const counter =
                  e.currentTarget.querySelector(
                    ".counter"
                  );

                const target = 5000;
                const duration = 1500;

                const startTime =
                  performance.now();

                function animate(time) {

                  const progress =
                    Math.min(
                      (time - startTime) /
                        duration,
                      1
                    );

                  const value =
                    Math.floor(
                      progress * target
                    );

                  counter.textContent =
                    value.toLocaleString() + "+";

                  if (progress < 1) {
                    requestAnimationFrame(
                      animate
                    );
                  }

                }

                requestAnimationFrame(
                  animate
                );

              }}
            >

              <strong className="counter">
                5,000+
              </strong>

              <span>
                Calls Made
              </span>

            </div>


            {/* CONNECTIONS */}

            <div
              className="counter-box reveal"
              onClick={(e) => {

                const counter =
                  e.currentTarget.querySelector(
                    ".counter"
                  );

                const target = 25000;
                const duration = 1500;

                const startTime =
                  performance.now();

                function animate(time) {

                  const progress =
                    Math.min(
                      (time - startTime) /
                        duration,
                      1
                    );

                  const value =
                    Math.floor(
                      progress * target
                    );

                  counter.textContent =
                    value.toLocaleString() + "+";

                  if (progress < 1) {
                    requestAnimationFrame(
                      animate
                    );
                  }

                }

                requestAnimationFrame(
                  animate
                );

              }}
            >

              <strong className="counter">
                25,000+
              </strong>

              <span>
                Connections
              </span>

            </div>

          </div>


          {/* MESSAGE ANIMATION */}

          <div className="message-animation">


            {/* LEFT LADKA */}

            <div className="message-boy">

              <svg
                viewBox="0 0 120 190"
                className="message-character"
              >

                {/* Head */}

                <circle
                  cx="60"
                  cy="42"
                  r="25"
                  fill="#f2b48c"
                />

                {/* Hair */}

                <path
                  d="M35 40 Q38 10 60 12 Q84 10 86 40 Q75 28 60 30 Q45 28 35 40"
                  fill="#2a0d22"
                />

                {/* Eye */}

                <circle
                  cx="69"
                  cy="43"
                  r="3"
                  fill="#2a0d22"
                />

                {/* Smile */}

                <path
                  d="M65 54 Q72 60 79 54"
                  stroke="#c0394f"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* Body */}

                <rect
                  x="40"
                  y="68"
                  width="40"
                  height="58"
                  rx="12"
                  fill="#4a2a8a"
                />

                {/* Arms */}

                <rect
                  x="25"
                  y="72"
                  width="10"
                  height="48"
                  rx="5"
                  fill="#f2b48c"
                />

                <rect
                  x="85"
                  y="72"
                  width="10"
                  height="48"
                  rx="5"
                  fill="#f2b48c"
                />

                {/* Legs */}

                <rect
                  x="43"
                  y="124"
                  width="13"
                  height="52"
                  rx="6"
                  fill="#2c4a8a"
                />

                <rect
                  x="64"
                  y="124"
                  width="13"
                  height="52"
                  rx="6"
                  fill="#35569f"
                />

                {/* Phone */}

                <rect
                  x="75"
                  y="85"
                  width="28"
                  height="48"
                  rx="5"
                  fill="#222"
                />

                <rect
                  x="79"
                  y="90"
                  width="20"
                  height="36"
                  rx="3"
                  fill="#fff"
                />

                <text
                  x="89"
                  y="113"
                  textAnchor="middle"
                  fontSize="13"
                  fill="#e8456b"
                >
                  ♥
                </text>

              </svg>

            </div>


            {/* MESSAGE ROAD */}

            <svg
              className="message-road"
              viewBox="0 0 760 250"
              key={messageKey}
            >
<path 
  id={`messagePath-${messageKey}`} 
  d="
    M 90 125
    C 170 65, 245 65, 330 125
    C 415 185, 510 185, 670 125
  " 
  fill="none" 
  stroke="#f4b6c2" 
  strokeWidth="6" 
  strokeDasharray="8 12" 
  strokeLinecap="round" 
/>


              {/* MESSAGE BOX */}

              <g className="moving-message">

                <rect
                  x="-65"
                  y="-28"
                  width="130"
                  height="56"
                  rx="16"
                  fill="#ffffff"
                  stroke="#e8456b"
                  strokeWidth="3"
                />

                <text
                  x="0"
                  y="6"
                  textAnchor="middle"
                  fontSize="17"
                  fontWeight="700"
                  fill="#e8456b"
                >
                  Hello ❤️
                </text>

                <animateMotion
                  dur="4.5s"
                  repeatCount="1"
                  rotate="auto"
                  begin="0s"
                  onEnd={() =>
                    setMessageDelivered(true)
                  }
                >

                  <mpath
                    href={`#messagePath-${messageKey}`}
                  />

                </animateMotion>

              </g>

            </svg>


            {/* RIGHT LADKI */}

            <div
              className={
                "message-girl " +
                (messageDelivered
                  ? "girl-happy"
                  : "")
              }
            >

              <svg
                viewBox="0 0 120 190"
                className="message-character"
              >

                {/* Hair */}

                <circle
                  cx="60"
                  cy="42"
                  r="29"
                  fill="#2a0d22"
                />

                {/* Face */}

                <circle
                  cx="60"
                  cy="44"
                  r="24"
                  fill="#f2b48c"
                />

                {/* Hair Front */}

                <path
                  d="
                    M35 42
                    Q38 12 60 13
                    Q84 12 87 42
                    Q78 28 60 30
                    Q44 28 35 42
                  "
                  fill="#2a0d22"
                />

                {/* Eyes */}

                <circle
                  cx="53"
                  cy="44"
                  r="2.5"
                  fill="#2a0d22"
                />

                <circle
                  cx="68"
                  cy="44"
                  r="2.5"
                  fill="#2a0d22"
                />

                {/* Smile */}

                <path
                  className="girl-smile"
                  d="M51 55 Q60 63 69 55"
                  stroke="#c0394f"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* Body */}

                <path
                  d="M38 75 L82 75 L92 130 L28 130 Z"
                  fill="#e8456b"
                />

                {/* Arms */}

                <rect
                  x="22"
                  y="78"
                  width="10"
                  height="50"
                  rx="5"
                  fill="#f2b48c"
                />

                <rect
                  x="88"
                  y="78"
                  width="10"
                  height="50"
                  rx="5"
                  fill="#f2b48c"
                />

                {/* Legs */}

                <rect
                  x="43"
                  y="128"
                  width="13"
                  height="48"
                  rx="6"
                  fill="#e0a07a"
                />

                <rect
                  x="64"
                  y="128"
                  width="13"
                  height="48"
                  rx="6"
                  fill="#f2b48c"
                />

                {/* Phone */}

                <rect
                  x="17"
                  y="88"
                  width="28"
                  height="48"
                  rx="5"
                  fill="#222"
                />

                <rect
                  x="21"
                  y="93"
                  width="20"
                  height="36"
                  rx="3"
                  fill="#fff"
                />

                <text
                  x="31"
                  y="116"
                  textAnchor="middle"
                  fontSize="13"
                  fill="#e8456b"
                >
                  ♥
                </text>

              </svg>


              {/* HEARTS */}

              {messageDelivered && (

                <div className="message-hearts">

                  <span>♥</span>
                  <span>💕</span>
                  <span>💗</span>
                  <span>♥</span>

                </div>

              )}

            </div>

          </div>


          {/* SEND MESSAGE BUTTON */}

          <button
            type="button"
            className="message-send-btn"
            onClick={sendMessage}
          >
            Send Message 💌
          </button>


          {/* READY */}

          <h2 className="reveal" style={{marginTop:"100px"}}>
            Ready for your first call?
          </h2>

          <p className="sub reveal">
            Create your free account — it takes less than a minute.
          </p>

          <a
            href="https://play.google.com/store/apps/details?id=com.lovetales.app"
            className="btn reveal"
            target="_blank"
            rel="noopener noreferrer"
          >
            Create Account
          </a>

        </div>

      </section>


      {/* FOOTER */}

      <footer>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "25px",
            flexWrap: "wrap",
            marginBottom: "14px",
            marginTop: "-40px"
          }}
        >

          {/* Google Play Store */}

          <a
            href="https://play.google.com/store/apps/details?id=com.lovetales.app"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Google Play Store"
            title="Google Play Store"
          >

            <img
              src="https://cdn-icons-png.flaticon.com/512/888/888857.png"
              alt="Google Play Store"
              width="35"
              height="35"
            />

          </a>


          {/* WhatsApp */}

          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            title="WhatsApp"
          >

            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
              alt="WhatsApp"
              width="35"
              height="35"
            />

          </a>


          {/* Instagram */}

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            title="Instagram"
          >

            <img
              src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
              alt="Instagram"
              width="35"
              height="35"
            />

          </a>


          {/* Facebook */}

          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            title="Facebook"
          >

            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
              alt="Facebook"
              width="35"
              height="35"
            />

          </a>


          {/* LinkedIn */}

          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
          >

            <img
              src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
              alt="LinkedIn"
              width="35"
              height="35"
            />

          </a>


          {/* YouTube */}

          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            title="YouTube"
          >

            <img
              src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
              alt="YouTube"
              width="35"
              height="35"
            />

          </a>

        </div>


        <p>
          © 2026 LoveBeat Connect Talk Feel
        </p>

      </footer>

    </div>
  );
}

export default App;