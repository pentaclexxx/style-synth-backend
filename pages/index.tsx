import { useState } from 'react';

export default function Home() {
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <main className="relative min-h-screen bg-[url('/bg-middle.png')] bg-cover bg-no-repeat bg-center text-gray-900 overflow-x-hidden">

    {/* HEADER SECTION */}
<section className="relative text-white text-center min-h-[600px]">
  <img
    src="/bg-top.png"
    alt="Torn black paper background"
    className="absolute top-[-40px] left-0 w-full h-auto pointer-events-none z-0"
  />
  <div className="relative z-10 px-4 pt-[50px] sm:pt-[140px] lg:pt-[180px]">
    <h1
      className="text-[70px] sm:text-[100px] lg:text-[140px] font-normal leading-tight"
      style={{ fontFamily: "'Instrument Serif', serif" }}
    >
      <span className="mr-[2rem] sm:mr-[4rem]">Style</span>Synth
    </h1>
    <p
      className="mt-4 sm:mt-6 text-[18px] sm:text-[24px] lg:text-[28px] italic"
      style={{ fontFamily: "'Instrument Serif', serif" }}
    >
      Style is generated.
      <br />
      Ownership is questioned.
    </p>
  </div>
</section>


      {/* ABOUT SECTION */}
      <section
        className="relative w-full text-black px-4 sm:px-6 py-12 sm:py-20 mt-10 sm:mt-24"
        style={{ fontFamily: "'Source Serif Pro', serif" }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">About this project</h2>
          <p className="mb-4">
            Style Synth is a research-driven tool for exploring fashion generated through AI.
          </p>
          <p className="mb-4">
            But beyond aesthetics, it asks a deeper question: when you design with a machine, who holds creative authorship?
          </p>
          <p className="italic font-bold mb-4">
            Is it the user crafting the prompt, the algorithm producing the output, or the interface shaping the experience?
          </p>
          <p className="mb-6">
            This is not just about making — it's about uncovering the layered authorship behind what's made.
          </p>

          <div className="flex items-start gap-4 mt-6 text-left">
            <button
              onClick={() => setShowPrivacy(!showPrivacy)}
              className="text-sm underline flex items-center hover:text-black focus:outline-none focus:ring-2 focus:ring-black"
            >
              <span className="text-lg mr-1">ⓘ</span> Privacy Info
            </button>

            {showPrivacy && (
              <div className="text-sm text-gray-700 max-w-md transition-opacity duration-200">
                <h3 className="font-bold mb-1">Your information stays private</h3>
                <p className="text-gray-500">
                  We collect a few basic details (like name, year, or occupation) to understand who’s participating.
                </p>
                <p className="text-gray-500">
                  All responses are confidential and only used for this academic research.
                  <br />
                  Your information won’t be shared outside the study.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section
        className="relative text-center px-4 sm:px-6 pt-20 pb-32"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        <img
          src="/bg-bottom.png"
          alt="Torn paper bottom section"
          className="absolute top-0 left-0 w-full h-auto object-cover pointer-events-none z-0"
        />
        <div className="relative z-10">
          <div className="relative mb-12 inline-block">
            <img
              src="/tape.png"
              alt="Decorative tape with heading"
              className="w-[220px] sm:w-[300px] lg:w-[360px] h-auto mx-auto"
            />
            <h2
              className="absolute inset-0 flex items-center justify-center text-xl sm:text-3xl lg:text-4xl font-semibold tracking-[0.05em]"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              How it works
            </h2>
          </div>

          <div className="grid gap-6 sm:gap-10 md:grid-cols-3 max-w-5xl mx-auto text-sm sm:text-base">
            <div>
              <img
                src="/icon-select.png"
                alt="Prompt selection icon"
                className="w-[80px] sm:w-[100px] h-auto mx-auto mb-3"
              />
              <p style={{ fontFamily: 'Roboto, sans-serif' }}>
                Try both prompt types<br />limited and open-ended
              </p>
            </div>
            <div>
              <img
                src="/icon-generate.png"
                alt="Fashion generation icon"
                className="w-[80px] sm:w-[100px] h-auto mx-auto mb-3"
              />
              <p style={{ fontFamily: 'Roboto, sans-serif' }}>
                Generate a fashion design
              </p>
            </div>
            <div>
              <img
                src="/icon-reflect.png"
                alt="Reflection icon"
                className="w-[80px] sm:w-[100px] h-auto mx-auto mb-3"
              />
              <p style={{ fontFamily: 'Roboto, sans-serif' }}>
                Reflect on who (or what)<br />created the results
              </p>
            </div>
          </div>

          <div className="mt-10">
            <a
              href="/generator"
              className="inline-block bg-black text-white px-6 py-3 rounded-full text-base hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              Try It Now →
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-sm text-gray-600 mt-16 pb-10">
        <p style={{ fontFamily: 'Roboto, sans-serif' }}>
          Created as part of an MA dissertation project at King&apos;s College London<br />
          © 2025 – I-Tzu, Yu — All rights reserved
        </p>
      </footer>
    </main>
  );
}
