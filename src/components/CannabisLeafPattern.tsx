export const CannabisLeafPattern = ({ className = "" }: { className?: string }) => (
  <div className={`absolute inset-0 opacity-10 ${className}`}>
    <svg viewBox="0 0 800 600" className="w-full h-full object-cover">
      {/* Cannabis leaf 1 */}
      <g transform="translate(100,150) scale(0.8)">
        <path d="M50,100 Q30,80 20,50 Q30,20 50,10 Q70,20 80,50 Q70,80 50,100 Z" fill="currentColor"/>
        <path d="M50,100 Q20,90 10,60 Q20,30 50,20 Q80,30 90,60 Q80,90 50,100 Z" fill="currentColor"/>
        <path d="M50,100 Q15,85 5,50 Q15,15 50,5 Q85,15 95,50 Q85,85 50,100 Z" fill="currentColor"/>
        <path d="M50,100 Q35,110 25,140 Q35,170 50,180 Q65,170 75,140 Q65,110 50,100 Z" fill="currentColor"/>
        <path d="M50,100 Q25,115 15,150 Q25,185 50,195 Q75,185 85,150 Q75,115 50,100 Z" fill="currentColor"/>
        <path d="M50,100 Q40,125 35,160 Q40,195 50,205 Q60,195 65,160 Q60,125 50,100 Z" fill="currentColor"/>
        <path d="M50,100 Q45,130 42,170 Q45,210 50,220 Q55,210 58,170 Q55,130 50,100 Z" fill="currentColor"/>
        <line x1="50" y1="100" x2="50" y2="250" stroke="currentColor" strokeWidth="3"/>
      </g>
      
      {/* Cannabis leaf 2 */}
      <g transform="translate(600,300) scale(1.2) rotate(45)">
        <path d="M50,100 Q30,80 20,50 Q30,20 50,10 Q70,20 80,50 Q70,80 50,100 Z" fill="currentColor"/>
        <path d="M50,100 Q20,90 10,60 Q20,30 50,20 Q80,30 90,60 Q80,90 50,100 Z" fill="currentColor"/>
        <path d="M50,100 Q15,85 5,50 Q15,15 50,5 Q85,15 95,50 Q85,85 50,100 Z" fill="currentColor"/>
        <path d="M50,100 Q35,110 25,140 Q35,170 50,180 Q65,170 75,140 Q65,110 50,100 Z" fill="currentColor"/>
        <path d="M50,100 Q25,115 15,150 Q25,185 50,195 Q75,185 85,150 Q75,115 50,100 Z" fill="currentColor"/>
        <path d="M50,100 Q40,125 35,160 Q40,195 50,205 Q60,195 65,160 Q60,125 50,100 Z" fill="currentColor"/>
        <path d="M50,100 Q45,130 42,170 Q45,210 50,220 Q55,210 58,170 Q55,130 50,100 Z" fill="currentColor"/>
        <line x1="50" y1="100" x2="50" y2="180" stroke="currentColor" strokeWidth="2"/>
      </g>
      
      {/* Additional decorative leaves */}
      <g transform="translate(300,50) scale(0.6) rotate(-30)">
        <path d="M50,100 Q30,80 20,50 Q30,20 50,10 Q70,20 80,50 Q70,80 50,100 Z" fill="currentColor"/>
        <path d="M50,100 Q20,90 10,60 Q20,30 50,20 Q80,30 90,60 Q80,90 50,100 Z" fill="currentColor"/>
        <path d="M50,100 Q35,110 25,140 Q35,170 50,180 Q65,170 75,140 Q65,110 50,100 Z" fill="currentColor"/>
        <line x1="50" y1="100" x2="50" y2="160" stroke="currentColor" strokeWidth="2"/>
      </g>
      
      <g transform="translate(500,100) scale(0.5) rotate(60)">
        <path d="M50,100 Q30,80 20,50 Q30,20 50,10 Q70,20 80,50 Q70,80 50,100 Z" fill="currentColor"/>
        <path d="M50,100 Q20,90 10,60 Q20,30 50,20 Q80,30 90,60 Q80,90 50,100 Z" fill="currentColor"/>
        <path d="M50,100 Q35,110 25,140 Q35,170 50,180 Q65,170 75,140 Q65,110 50,100 Z" fill="currentColor"/>
        <line x1="50" y1="100" x2="50" y2="160" stroke="currentColor" strokeWidth="2"/>
      </g>
    </svg>
  </div>
);