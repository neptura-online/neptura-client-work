import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="min-h-screen bg-zinc-100 flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-2xl lg:max-w-4xl text-center">
        {/* CAVE */}
        <div
          className="
            relative mx-auto
            mb-10 sm:mb-14
            w-65 h-42.5
            sm:w-[320px] sm:h-53
            lg:w-140 lg:h-88
            flex items-center justify-center
          "
        >
          {/* CAVE SHAPE */}
          <svg
            viewBox="0 0 300 180"
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              d="M20 160C20 80 80 20 150 20C220 20 280 80 280 160Z"
              fill="#18181B"
            />
          </svg>

          {/* CAVE CONTENT */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            {/* FLOATING 404 */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 lg:gap-6">
              <span className="error-num floating text-white">4</span>

              <span className="error-num floating-delay text-(--yellow-emarketing)">
                0
              </span>

              <span className="error-num floating text-white">4</span>
            </div>

            {/* SUBTEXT INSIDE CAVE */}
            <span
              className="
                mt-2 sm:mt-3
                text-[10px] sm:text-xs lg:text-sm
                tracking-widest uppercase
                text-white  
              "
            >
              Page not found
            </span>
          </div>
        </div>

        <p className="text-base sm:text-lg lg:text-xl text-zinc-800">
          It appears you have strayed from the path.
        </p>

        <Link
          to="/"
          className="
            mt-3 sm:mt-4
            inline-flex items-center gap-2
            text-sm sm:text-base
            text-zinc-900 font-medium
            hover:underline
          "
        >
          ← Return home
        </Link>
      </div>

      {/* FLOATING + DEPTH */}
      <style>{`
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }

        .floating {
          animation: float 5s ease-in-out infinite;
        }

        .floating-delay {
          animation: float 5s ease-in-out infinite;
          animation-delay: 0.7s;
        }

        .error-num {
          font-size: 48px;
          font-weight: 800;
          line-height: 1;
          text-shadow:
            0 2px 0 rgba(0,0,0,0.35),
            0 6px 14px rgba(0,0,0,0.45);
        }

        @media (min-width: 640px) {
          .error-num {
            font-size: 68px;
          }
        }

        @media (min-width: 1024px) {
          .error-num {
            font-size: 120px;
          }
        }
      `}</style>
    </section>
  );
};

export default NotFound;
