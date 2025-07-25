// components/Fleet.tsx
'use client'

import Image from 'next/image'
import clsx from 'clsx'

export default function Fleet() {
  return (
    <section className="bg-gradient-to-b from-[#C7E9FF] to-white py-32 px-4 text-center">
         <div className="text-center mb-36">
          <div className="inline-flex items-center gap-2 py-2">
            <img src="/svg/awl-wave-purple.svg" alt="AWL Logo" className="w-10 h-10" />
            <span className="text-md font-light italic font-gantari">Des véhicules adaptés à chaque mission</span>
          </div>
          <h2 className="font-gasoek text-4xl text-center mb-5">
          Notre Flotte
          </h2>
          <p className="font-gantari text-lg max-w-2xl mx-auto font-medium">
          Nous utilisons des véhicules utilitaires légers (-3,5 T) adaptés à tous les types de <br /> livraison, du petit colis au transport de véhicules.          </p>
        </div>

      {/* SVG LAYOUT WITH OVERLAY TEXT */}
      <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto relative mb-32">
        {/* First Vehicle - Kangoo */}
        <div className="relative">
          <svg width="406" height="542" viewBox="0 0 406 542" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <defs>
              <clipPath id="kangoo-clip">
                <path d="M405 512C405 528.569 391.569 542 375 542H30C13.4315 542 0 528.569 0 512V362.149C0 349.224 8.27833 337.752 20.5447 333.678L365.545 219.103C384.965 212.654 405 227.111 405 247.574V512Z" />
              </clipPath>
            </defs>
            
            {/* Background shape */}
            <path d="M0 30C0 13.4315 13.4315 0 30 0H375.439C392.008 0 405.439 13.4315 405.439 30V163.219C405.439 176.155 397.147 187.635 384.866 191.7L39.4265 306.033C20.0123 312.459 0 298.002 0 277.552V30Z" fill="#0C91DF"/>
            
            {/* Dynamic image with clip-path */}
            <foreignObject x="-47" y="206" width="532" height="349" clipPath="url(#kangoo-clip)">
              <img
                src="/images/kangoo.jpg"
                alt="Kangoo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </foreignObject>
            
            {/* Decorative elements */}
            <path opacity="0.07" d="M131.005 165.969L117.954 226.793L133.313 227.208L125.096 265.505L49.6299 249.313L54.8689 213.912L72.7656 217.752L77.3305 196.476L67.5686 194.382L71.3408 161.546L94.9609 158.236L131.005 165.969Z" fill="white"/>
          </svg>
          
          <div className="absolute inset-0 flex flex-col justify-start p-6 text-white">
            <div className=" rounded-lg py-2 px-2 text-left">
              <p className="font-bold text-xl mb-2"><span className="font-black italic">1/ K</span>angoo</p>
              <p className="text-sm leading-relaxed">
                Compact, agile et économique, le Kangoo est parfait pour les livraisons rapides en zone urbaine. Il convient aux petits colis et aux trajets courts.
              </p>
            </div>
          </div>
        </div>

        {/* Second Vehicle - Fourgon 12 m3 */}
        <div className="relative">
          <svg width="407" height="542" viewBox="0 0 407 542" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <defs>
              <clipPath id="fourgon12-clip">
                <path d="M406.398 30C406.398 13.4315 392.967 0 376.398 0L30.9584 0C14.3899 0 0.958442 13.4315 0.958442 30L0.958442 204.685C0.958442 217.558 9.17147 228.996 21.3694 233.111L366.809 349.639C386.255 356.198 406.398 341.734 406.398 321.212L406.398 30Z" />
              </clipPath>
            </defs>
            
            {/* Background shape */}
            <path d="M1.00205 511.562C1.002 528.131 14.4335 541.562 31.0021 541.562L376.442 541.563C393.011 541.563 406.442 528.131 406.442 511.563L406.443 405.763C406.443 392.901 398.245 381.471 386.062 377.347L40.6219 260.411C21.1707 253.827 1.00286 268.292 1.00279 288.827L1.00205 511.562Z" fill="#11103B"/>
            
            {/* Dynamic image with clip-path */}
            <foreignObject x="-46" y="0" width="532" height="371" clipPath="url(#fourgon12-clip)">
              <img
                src="/images/fourgon12.jpg"
                alt="Fourgon 12 m³"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </foreignObject>
            
            {/* Decorative elements */}
            <path opacity="0.07" d="M42.0731 329.617L25.4829 296.179C31.6368 290.673 37.6868 286.057 43.6331 282.332C49.6603 278.58 55.3815 275.787 60.797 273.954C72.3553 270.041 82.1486 269.564 90.177 272.521C98.2862 275.452 104.092 282.09 107.594 292.436C109.127 296.962 109.847 300.953 109.755 304.407C109.744 307.834 109.138 310.968 107.937 313.807C106.709 316.565 105.021 319.298 102.875 322.007C100.783 324.607 98.394 327.398 95.7095 330.379L96.4483 332.561L118.689 319.221L131.249 356.321L55.9579 381.809L41.0519 344.963C49.6205 336.477 56.0391 329.889 60.3078 325.201C64.5766 320.513 66.3558 317.253 65.6457 315.421C65.2352 314.208 64.1813 313.89 62.4839 314.464C61.2715 314.875 59.5897 315.894 57.4385 317.524C55.3408 319.045 52.9478 320.891 50.2594 323.062C47.6519 325.206 44.9231 327.391 42.0731 329.617Z" fill="white"/>
          </svg>
          
          <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">        
            <div className=" rounded-lg py-2 px-2 text-left">
              <p className="font-bold text-xl mb-2"><span className="font-black italic">2/ F</span>ourgon 12 m³</p>
              <p className="text-sm leading-relaxed">
                Idéal pour transporter du mobilier, des cartons ou des palettes. Le 12 m³ allie capacité et maniabilité pour les livraisons classiques.
              </p>
            </div>
          </div>
        </div>

        {/* Third Vehicle - Fourgon 20 m3 */}
        <div className="relative">
          <svg width="406" height="540" viewBox="0 0 406 540" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <defs>
              <clipPath id="fourgon20-clip">
                <path d="M0 510C0 526.569 13.4315 540 30 540H375C391.569 540 405 526.569 405 510V410.186C405 397.223 396.674 385.726 384.357 381.683L39.3575 268.421C19.9568 262.052 0 276.505 0 296.924L0 510Z" />
              </clipPath>
            </defs>
            
            {/* Background shape */}
            <path d="M405.44 30C405.44 13.4314 392.009 0 375.44 0H30.0004C13.4319 0 0.000434279 13.4315 0.000434279 30V211.521C0.000434279 224.457 8.29284 235.937 20.574 240.001L366.014 354.335C385.428 360.761 405.44 346.304 405.44 325.854V30Z" fill="black"/>
            
            {/* Dynamic image with clip-path */}
            <foreignObject x="-47" y="256" width="532" height="371" clipPath="url(#fourgon20-clip)">
              <img
                src="/images/fourgon20.jpg"
                alt="Fourgon 20 m³"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </foreignObject>
            
            {/* Decorative elements */}
            <path opacity="0.07" d="M335.998 252.998C340.944 255.98 344.599 259.688 346.964 264.122C349.413 268.575 349.939 274.055 348.542 280.563C347.343 286.153 345.014 290.498 341.557 293.596C338.183 296.712 333.927 298.854 328.789 300.02C323.753 301.122 318.132 301.487 311.928 301.116C305.724 300.744 299.284 299.843 292.61 298.411C287.353 297.283 282.017 295.92 276.599 294.321C271.248 292.824 265.923 291.201 260.625 289.454L275.037 251.57C279.262 254.658 283.233 257.3 286.952 259.494C290.67 261.688 293.781 263.054 296.284 263.591C299.371 264.253 301.129 263.583 301.559 261.581C301.917 259.912 300.72 258.171 297.967 256.359C295.232 254.463 290.553 252.674 283.932 250.991L286.51 238.977C293.471 239.074 298.296 238.756 300.984 238.024C303.69 237.208 305.186 236.133 305.473 234.798C305.634 234.047 305.417 233.433 304.821 232.956C304.326 232.413 303.62 232.044 302.702 231.847C300.533 231.381 297.261 231.377 292.886 231.835C288.595 232.311 283.898 233.049 278.796 234.049L281.469 200.847C290.165 198.96 298.286 198.127 305.831 198.35C313.376 198.572 320.278 199.355 326.535 200.697C332.96 202.076 338.567 204.414 343.358 207.711C348.167 210.924 351.676 214.906 353.886 219.657C356.096 224.408 356.557 229.787 355.268 235.794C354.122 241.134 351.824 245.135 348.372 247.798C345.004 250.48 340.879 252.213 335.998 252.998Z" fill="white"/>
          </svg>
          
          <div className="absolute inset-0 flex flex-col justify-start p-6 text-white">        
            <div className=" rounded-lg py-2 px-2 text-left">
              <p className="font-bold text-xl mb-2"><span className="font-black italic">3/ F</span>ourgon 20 m³</p>
              <p className="text-sm leading-relaxed">
                Pensé pour les charges plus volumineuses, il est parfait pour les matériaux de construction ou les tournées professionnelles plus chargées.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Text */}
      <div className="">
        <h3 className="text-2xl font-bold mb-4">Des véhicules contrôlés, des livraisons maîtrisées</h3>
        <p className="text-black/80 mb-8  mx-auto">
          Notre flotte est entretenue régulièrement et conduite par des professionnels formés <br /> pour garantir ponctualité et sécurité.
        </p>
      </div>
    </section>
  )
}
