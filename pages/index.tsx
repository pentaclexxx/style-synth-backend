export default function Home() {
  return (
    <main className="min-h-screen bg-[url('/bg-home.jpg')] bg-cover bg-top text-gray-900 px-4 sm:px-6 py-12">
      {/* HEADER */}
      <header className="text-center mb-24">
        <h1 className="text-5xl sm:text-6xl font-serif tracking-wide leading-tight text-white text-shadow">
          Style Synth
        </h1>
        <p className="italic mt-3 text-lg sm:text-xl text-white text-shadow">
          Style is generated.<br />Ownership is questioned
        </p>
      </header>

      {/* ABOUT SECTION */}
      <section className="max-w-3xl mx-auto text-center mb-28 bg-white bg-opacity-90 p-6 rounded">
        <h2 className="text-2xl font-bold mb-6">About this project</h2>
        <p className="mb-4">
          Style Synth is a research-driven tool for exploring fashion generated through AI.
        </p>
        <p className="mb-4">
          But beyond aesthetics, it asks a deeper question: when you design with a machine, who holds creative authorship?
        </p>
        <p className="italic mb-4">
          Is it the user crafting the prompt, the algorithm producing the output, or the interface shaping the experience?
        </p>
        <p className="mb-4">
          This is not just about making — it's about uncovering the layered authorship behind what's made.
        </p>
        <a
          href="#"
          className="text-sm underline hover:text-black focus:outline-none focus:ring-2 focus:ring-black"
        >
          © Privacy Info
        </a>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="text-center mb-24">
        <div className="inline-block relative mb-6">
          <img
            src="/tape.png"
            alt="Decorative torn tape above heading"
            className="w-40 mx-auto absolute -top-6 left-1/2 -translate-x-1/2"
          />
          <h2 className="text-2xl font-bold relative z-10 bg-white inline-block px-4">
            How it works
          </h2>
        </div>

        <div className="grid gap-12 md:grid-cols-3 max-w-5xl mx-auto text-sm sm:text-base">
          <div>
            <img
              src="/icon-select.png"
              alt="Icon representing prompt selection"
              className="w-[75px] h-[75px] mx-auto mb-3"
            />
            <p>
              Try both prompt types<br />
              limited and open-ended
            </p>
          </div>
          <div>
            <img
              src="/icon-generate.png"
              alt="Icon representing fashion generation"
              className="w-[75px] h-[75px] mx-auto mb-3"
            />
            <p>Generate a fashion design</p>
          </div>
          <div>
            <img
              src="/icon-reflect.png"
              alt="Icon representing reflection"
              className="w-[75px] h-[75px] mx-auto mb-3"
            />
            <p>
              Reflect on who (or what)<br />
              created the results
            </p>
          </div>
        </div>

        <div className="mt-10">
          <a
            href="/generator"
            role="button"
            className="inline-block bg-black text-white px-6 py-3 rounded-full text-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
          >
            Try It Now →
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-sm text-gray-600 mt-16">
        <p>
          Created as part of an MA dissertation project at King&apos;s College London<br />
          © 2025 – I-Tzu, Yu — All rights reserved
        </p>
      </footer>
    </main>
  );
}