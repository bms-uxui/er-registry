import { useNavigate } from "react-router";
import mophLogo from "../assets/logo_MOPH.png";
import heroImg from "../assets/hero.png";
import providerIdLogo from "../assets/provider-id-logo.png";
import { INK, INK_SOFT, MUTED } from "../dashboard/tokens";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #FFFBF5 0%, #FFF1DC 100%)",
      }}
    >
      {/* ── Abstract blob gradient atmosphere ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-160 h-160 opacity-75"
          style={{
            top: "-180px",
            left: "-160px",
            background: "linear-gradient(135deg, #FFFFFF 0%, #FFA500 100%)",
            borderRadius: "58% 42% 38% 62% / 55% 45% 55% 45%",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute w-140 h-140 opacity-70"
          style={{
            top: "40%",
            right: "-180px",
            background:
              "radial-gradient(circle at 30% 30%, #FFFFFF 0%, #FFA500 75%)",
            borderRadius: "62% 38% 48% 52% / 45% 55% 45% 55%",
            filter: "blur(90px)",
          }}
        />
        <div
          className="absolute w-170 h-170 opacity-65"
          style={{
            bottom: "-240px",
            left: "-200px",
            background: "linear-gradient(45deg, #FFFFFF 0%, #FFA500 100%)",
            borderRadius: "48% 52% 62% 38% / 58% 48% 52% 42%",
            filter: "blur(110px)",
          }}
        />
      </div>

      {/* soft whitening veil */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.55) 80%)",
        }}
      />

      {/* ── Hero illustration — bottom-right, off-set, overflows viewport ── */}
      <div
        className="animate-fade-up absolute pointer-events-none hidden lg:block"
        style={{
          bottom: "-160px",
          right: "-60px",
          width: "min(34vw, 520px)",
          animationDelay: "220ms",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 55%, rgba(251,201,90,0.45) 0%, rgba(251,201,90,0) 65%)",
            filter: "blur(20px)",
          }}
        />
        <img
          src={heroImg}
          alt=""
          className="relative w-full h-auto object-contain select-none"
          draggable={false}
          style={{
            filter: "drop-shadow(0 30px 40px rgba(201,123,26,0.25))",
            imageRendering: "auto",
          }}
        />
      </div>

      {/* ── Layout ── */}
      <div className="relative min-h-screen flex flex-col">
        <div className="flex-1 flex items-center">
          <div className="w-full max-w-360 mx-auto px-8 py-10">
            {/* ── Login card ── */}
            <div
              className="animate-fade-up mx-auto w-full max-w-md rounded-3xl px-10 py-12 flex flex-col items-center text-center relative z-10 overflow-hidden"
              style={{
                background:
                  "linear-gradient(155deg, rgba(255,255,255,0.85) 0%, rgba(255,250,240,0.68) 48%, rgba(255,240,218,0.55) 100%)",
                backdropFilter: "blur(32px) saturate(1.55)",
                WebkitBackdropFilter: "blur(32px) saturate(1.55)",
                border: "1px solid rgba(255,255,255,0.95)",
                boxShadow: [
                  "inset 0 2px 0 rgba(255,255,255,1)",
                  "inset 1.5px 0 0 rgba(255,255,255,0.8)",
                  "inset -1.5px 0 0 rgba(255,255,255,0.6)",
                  "inset 0 -2px 0 rgba(201,123,26,0.1)",
                  "inset 0 60px 80px -40px rgba(255,255,255,0.6)",
                  "0 1px 2px rgba(16,24,40,0.04)",
                  "0 14px 30px -10px rgba(16,24,40,0.10)",
                  "0 34px 60px -20px rgba(201,123,26,0.18)",
                  "0 56px 90px -40px rgba(16,24,40,0.25)",
                ].join(", "),
                animationDelay: "0ms",
              }}
            >
              {/* top glossy sheen */}
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-2/5 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 100%)",
                }}
              />
              {/* subtle warm radial glow behind logo */}
              <div
                aria-hidden
                className="absolute pointer-events-none"
                style={{
                  top: "-20%",
                  left: "50%",
                  width: "90%",
                  height: "60%",
                  transform: "translateX(-50%)",
                  background:
                    "radial-gradient(circle, rgba(251,201,90,0.28) 0%, rgba(251,201,90,0) 70%)",
                  filter: "blur(8px)",
                }}
              />
              {/* diagonal edge highlight */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.15) 100%)",
                  mixBlendMode: "screen",
                }}
              />

              <div className="relative w-full flex flex-col items-center">
              <img
                src={mophLogo}
                alt="กระทรวงสาธารณสุข"
                className="w-40 h-40 object-contain select-none"
                draggable={false}
                style={{ filter: "drop-shadow(0 8px 20px rgba(16,24,40,0.12))" }}
              />

              <div className="mt-5 text-[14px]" style={{ color: INK_SOFT }}>
                ยินดีต้อนรับสู่
              </div>

              <h1
                className="mt-2 text-[34px] font-bold leading-tight"
                style={{ color: INK, letterSpacing: "-0.01em" }}
              >
                <span style={{ color: "#FCA500" }}>ER</span>{" "}
                <span style={{ color: INK }}>Registry</span>
              </h1>

              <p className="mt-2 text-[14px]" style={{ color: INK_SOFT }}>
                ระบบรายงานข้อมูลการวัดผลแผนกห้องฉุกเฉิน
              </p>

              <div className="w-full mt-10">
                <div className="text-[13px] mb-3" style={{ color: INK_SOFT }}>
                  ลงชื่อเข้าใช้งานด้วยระบบ Provider ID
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/er-registry-dashboard")}
                  className="group w-full rounded-full px-5 py-3.5 flex items-center justify-center cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#F5FBF6] active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]/30"
                  style={{
                    background:
                      "linear-gradient(180deg, #FFFFFF 0%, #FDFEFD 60%, #F7FAF8 100%)",
                    border: "1.5px solid #15803D",
                    boxShadow: [
                      "inset 0 2px 0 rgba(255,255,255,1)",
                      "inset 1.5px 0 0 rgba(255,255,255,0.95)",
                      "inset -1.5px 0 0 rgba(255,255,255,0.95)",
                      "inset 0 -2px 0 rgba(21,128,61,0.08)",
                      "inset 0 -12px 20px -14px rgba(21,128,61,0.08)",
                      "inset 0 40px 40px -30px rgba(255,255,255,1)",
                      "0 1px 2px rgba(16,24,40,0.05)",
                      "0 10px 18px -10px rgba(16,24,40,0.08)",
                      "0 22px 36px -18px rgba(21,128,61,0.18)",
                    ].join(", "),
                  }}
                >
                  <img
                    src={providerIdLogo}
                    alt="Provider ID"
                    className="h-10 w-auto object-contain select-none"
                    draggable={false}
                  />
                </button>
              </div>

              <div
                className="mt-12 text-[11px] tracking-wider"
                style={{ color: MUTED }}
              >
                BANGKOK MEDICAL SOFTWARE CO.,LTD.
              </div>
              </div>
            </div>

          </div>
        </div>

        {/* version footer */}
        <div
          className="relative py-4 text-center text-[11px]"
          style={{ color: MUTED }}
        >
          Version 68.09.17.001
        </div>
      </div>
    </div>
  );
}

