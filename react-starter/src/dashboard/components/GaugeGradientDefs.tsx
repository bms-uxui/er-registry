export function GaugeGradientDefs() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: "absolute", pointerEvents: "none" }}
      aria-hidden
    >
      <defs>
        <linearGradient id="gauge-pass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4ADE80" />
          <stop offset="50%" stopColor="#16A34A" />
          <stop offset="100%" stopColor="#14532D" />
        </linearGradient>
        <linearGradient id="gauge-fail" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F3C94A" />
          <stop offset="50%" stopColor="#D9A332" />
          <stop offset="100%" stopColor="#95691A" />
        </linearGradient>
        <linearGradient id="gauge-track" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(16,24,40,0.14)" />
          <stop offset="100%" stopColor="rgba(16,24,40,0.04)" />
        </linearGradient>
        <filter id="gauge-bevel" x="-10%" y="-10%" width="120%" height="130%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.4" result="blur" />
          <feSpecularLighting
            in="blur"
            surfaceScale="4"
            specularConstant="0.85"
            specularExponent="22"
            lightingColor="#ffffff"
            result="spec"
          >
            <fePointLight x="60" y="-40" z="140" />
          </feSpecularLighting>
          <feComposite in="spec" in2="SourceAlpha" operator="in" result="specMasked" />
          <feComposite
            in="SourceGraphic"
            in2="specMasked"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
            result="lit"
          />
          <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="shadowBlur" />
          <feOffset in="shadowBlur" dx="0" dy="1" result="shadowOffset" />
          <feFlood floodColor="#000000" floodOpacity="0.25" result="shadowColor" />
          <feComposite in="shadowColor" in2="shadowOffset" operator="in" result="innerShadow" />
          <feComposite in="innerShadow" in2="SourceAlpha" operator="out" result="outerShadow" />
          <feMerge>
            <feMergeNode in="lit" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}
