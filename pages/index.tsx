import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [nameInput, setNameInput] = useState('');

  return (
    <main
      style={{ backgroundImage: "url('/bg-middle.png')" }}
      className="bg-cover bg-no-repeat bg-center text-gray-900 overflow-x-hidden"
    >
      {/* HEADER */}
      <section
        className="relative text-white text-center bg-no-repeat bg-cover bg-bottom px-4 pt-28 sm:pt-40 pb-16 sm:pb-24"
        style={{ backgroundImage: "url('/bg-top.png')" }}
      >
        <div className="relative z-8 pt-6 sm:pt-8 mt-[-36px] flex flex-col items-center text-center">
          <h1
            className="text-[110px] sm:text-[160px] lg:text-[220px] font-normal leading-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            <span className="mr-[20px] sm:mr-[64px] lg:mr-[100px]">Style</span>Synth
          </h1>
          <p
            className="mt-3 sm:mt-4 text-[14px] sm:text-[20px] lg:text-[26px] italic inline-block"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Style is generated.
            <br />
            Ownership is questioned.
          </p>
        </div>
      </section>

      {/* ABOUT */}
      <section
        className="relative w-full text-black px-4 sm:px-6 lg:px-8 py-10 sm:py-16"
        style={{ fontFamily: "'Source Serif Pro', serif" }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-[20px] sm:text-[24px] font-bold mb-5 leading-snug">
            About this project
          </h2>

          <p className="mb-3 text-[14px] sm:text-[17px] leading-relaxed text-gray-700">
            Style Synth is a research-driven tool for exploring fashion generated through AI.
          </p>

          <p className="mb-3 text-[14px] sm:text-[17px] leading-relaxed text-gray-700">
            But beyond aesthetics, it asks a deeper question: when you design with a machine, who holds creative authorship?
          </p>

          <p className="italic font-bold text-[14px] sm:text-[17px] mb-3 leading-relaxed border-l-4 pl-4 border-gray-300">
            Is it the user crafting the prompt, the algorithm producing the output, or the interface shaping the experience?
          </p>

          <p className="mb-5 text-[14px] sm:text-[17px] leading-relaxed text-gray-700">
            This is not just about making — it's about uncovering the layered authorship behind what's made.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-3 mt-4">
            <button
              onClick={() => setShowPrivacy(!showPrivacy)}
              className="text-sm underline flex items-center hover:text-black focus:outline-none focus:ring-2 focus:ring-black"
            >
              <span className="text-base mr-1">ⓘ</span> Privacy Info
            </button>

            {showPrivacy && (
              <div className="text-sm text-gray-700 max-w-md transition-opacity duration-200">
                <h3 className="font-semibold mb-1">Your information stays private</h3>
                <p className="text-gray-500">
                  We collect a few basic details (like name, year, or occupation) to understand who’s participating.
                </p>
                <p className="text-gray-500">
                  All responses are confidential and only used for this academic research.<br />
                  Your information won’t be shared outside the study.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        className="relative text-center px-4 sm:px-6 lg:px-8 py-4 sm:py-10 overflow-hidden"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        {/* Background Image */}
        <img
          src="/bg-bottom.png"
          alt="Torn paper bottom section"
          className="absolute top-0 left-0 w-full h-auto pointer-events-none z-0"
        />

        <div className="relative z-10">
          {/* Tape & Heading */}
          <div className="relative -mb-6 sm:mb-2 inline-block">
            <img
              src="/tape.png"
              alt="Decorative tape with heading"
              className="w-[220px] sm:w-[300px] lg:w-[360px] h-auto mx-auto"
            />
            <h2
              className="absolute inset-0 flex items-center justify-center text-lg sm:text-2xl lg:text-3xl font-semibold tracking-wide"
              style={{ fontFamily: "'Source Serif Pro', serif" }}
            >
              How it works
            </h2>
          </div>

          {/* 3 Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-sm sm:text-base px-4">
            <div>
              <img
                src="/icon-select.png"
                alt="Prompt selection icon"
                className="w-16 sm:w-24 mx-auto mb-3"
              />
              <p className="text-xs sm:text-sm md:text-base" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Try both prompt types<br />limited and open-ended
              </p>
            </div>
            <div>
              <img
                src="/icon-generate.png"
                alt="Fashion generation icon"
                className="w-16 sm:w-24 mx-auto mb-3"
              />
              <p className="text-xs sm:text-sm md:text-base" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Generate a fashion design
              </p>
            </div>
            <div>
              <img
                src="/icon-reflect.png"
                alt="Reflection icon"
                className="w-16 sm:w-24 mx-auto mb-3"
              />
              <p className="text-xs sm:text-sm md:text-base" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Reflect on who (or what)<br />created the results
              </p>
            </div>
          </div>

          {/* CTA Input + Button */}
          <div className="mt-12 flex flex-col items-center gap-4">
          {/* Input field */}
           <input
             type="text"
             placeholder="enter your name here"
             value={nameInput}
             onChange={(e) => setNameInput(e.target.value)}
             className="w-60 sm:w-72 md:w-80 text-sm sm:text-base md:text-lg text-center text-gray-500 border border-black rounded-full px-4 py-2 shadow-sm placeholder-gray-400 placeholder:text-sm sm:placeholder:text-base md:placeholder:text-lg outline-none focus:ring-2 focus:ring-black bg-white bg-opacity-80"
             style={{ fontFamily: 'Roboto, sans-serif' }}
          />

          {/* Button */}
          <button
            onClick={() => {
              const trimmedName = nameInput.trim();
          
              if (!/^[a-zA-Z0-9 ]{2,30}$/.test(trimmedName)) {
                alert('Please enter a valid name (letters/numbers only, 2–30 characters)');
                return;
              }
          
              localStorage.setItem('user_name', trimmedName);
              router.push('/generator');
            }}
            className="inline-block bg-black text-white px-6 py-2 sm:px-7 sm:py-2.5 md:px-6 md:py-2 text-sm sm:text-base md:text-lg rounded-full hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black transition-all"
            style={{ fontFamily: 'Roboto, sans-serif' }}
          >
           Try It Now →
        </button>
       </div>

          {/* FOOTER (included inside section for bg consistency) */}
          <footer className="text-center text-sm text-gray-600 mt-10 pb-6 px-4" style={{ fontFamily: "'Crimson Text', serif" }}>
            <p>
              Created as part of an MA dissertation project at King&apos;s College London<br />
              © 2025 – I-Tzu, Yu — All rights reserved
            </p>
          </footer>
        </div>
      </section>

    </main>
  );
}
