import { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

export default function GeneratorPage() {
  const router = useRouter();

  const [mode, setMode] = useState<'guided' | 'open'>('guided');
  const [garment, setGarment] = useState('');
  const [style, setStyle] = useState('');
  const [colors, setColors] = useState('');
  const [season, setSeason] = useState('');
  const [silhouette, setSilhouette] = useState('');
  const [mood, setMood] = useState('');
  const [openPrompt, setOpenPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [promptUsed, setPromptUsed] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    let prompt = '';

    if (mode === 'guided') {
      if ([garment, style, colors, season, silhouette, mood].some(v => !v)) {
        alert('Please complete all guided prompt fields.');
        return;
      }
      prompt = `${mood}, ${style} ${garment} with a ${silhouette} silhouette, in ${colors}, for ${season}.`;
    } else {
      if (!openPrompt.trim()) {
        alert('Please enter a prompt.');
        return;
      }
      prompt = openPrompt.trim();
    }

    try {
      setIsLoading(true);
      
      const user_name = localStorage.getItem('user_name');
      if (!user_name || user_name.length > 30) {
       alert('User name missing or invalid. Please start from the home page.');
       router.push('/');
       return;
    }

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Failed to generate');
      }

      const data = await response.json();

      if (!data.image) {
        throw new Error('No image returned from backend');
      }
     
      setImageUrl(data.image);
      setPromptUsed(prompt);

    // Send to Supabase
    const { error } = await supabase.from('user_entries').insert([
      {
        user_name,
        mode,
        full_prompt: prompt,
        raw_prompt: mode === 'guided'
          ? `${mood}, ${style}, ${garment}, ${silhouette}, ${colors}, ${season}`
          : openPrompt.trim(),
        image_url: data.image,
        created_at: new Date().toISOString(),
      },
    ]);
    if (error) {
      console.error('Supabase insert error:', error);
      alert('Failed to record your result. Please try again.');
    }
    
    } catch (err) {
      alert('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReflectClick = () => {
    router.push('/reflect');
  };

  const categories = [
    {
      label: 'Garment Type',
      value: garment,
      onChange: setGarment,
      options: ['Dress', 'Jacket', 'Jeans', 'Skirt', 'Suit', 'Hoodie'],
      id: 'garment',
    },
    {
      label: 'Style',
      value: style,
      onChange: setStyle,
      options: ['Minimalist', 'Streetwear', 'Heritage Revival', 'Avant-garde', 'Cyberpunk', 'Bohemian'],
      id: 'style',
    },
    {
      label: 'Colors',
      value: colors,
      onChange: setColors,
      options: ['Monochrome', 'Earth tones', 'Pastels', 'Bold Colors', 'Metallic'],
      id: 'colors',
    },
    {
      label: 'Season',
      value: season,
      onChange: setSeason,
      options: ['Spring', 'Summer', 'Autumn', 'Winter'],
      id: 'season',
    },
    {
      label: 'Silhouette',
      value: silhouette,
      onChange: setSilhouette,
      options: ['Fitted', 'Oversized', 'Layered', 'Draped', 'Structured'],
      id: 'silhouette',
    },
    {
      label: 'Mood',
      value: mood,
      onChange: setMood,
      options: ['Bold', 'Romantic', 'Mysterious', 'Rebellious', 'Melancholic'],
      id: 'mood',
    },
  ];

  return (
    <main className="min-h-screen px-4 py-10 text-gray-900">
      <h1 className="text-3xl font-bold mb-2 max-w-5xl mx-auto">Generate with Style Synth</h1>

      <p className="text-left text-[10px] sm:text-[14px] md:text-[15px] text-gray-400 italic max-w-5xl mx-auto mb-6">
        You’re welcome to explore both prompt modes as many times as you like. <br />
        Feel free to switch between Guided and Open Prompt at any point. <br />
        There’s no single right way to use the tool — just follow your instincts and curiosity.
      </p>

      {/* Prompt type tabs */}
      <div className="flex flex-row justify-start gap-2 max-w-5xl mx-auto mt-8 -mb-px transition-all duration-300">
        <button
          type="button"
          onClick={() => setMode('guided')}
          aria-pressed={mode === 'guided'}
          className={`text-sm sm:text-base md:text-lg px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-t-md transition-colors duration-300 ${
            mode === 'guided'
              ? 'bg-black text-white border-b-transparent'
              : 'bg-white text-black border border-gray-400 ring-1 ring-gray-300'
          }`}
        >
          Guided Prompt →
        </button>
        <button
          type="button"
          onClick={() => setMode('open')}
          aria-pressed={mode === 'open'}
          className={`text-sm sm:text-base md:text-lg px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-t-md transition-colors duration-300 ${
            mode === 'open'
              ? 'bg-black text-white border-b-transparent'
              : 'bg-white text-black border border-gray-400 ring-1 ring-gray-300'
          }`}
        >
          Open Prompt →
        </button>
      </div>

      {/* Prompt form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGenerate();
        }}
        className="max-w-5xl mx-auto border border-t-0 p-6 shadow rounded-b-md bg-white transition-all"
      >
        {mode === 'guided' ? (
          <div className="grid md:grid-cols-6 gap-4">
            {categories.map(({ label, value, onChange, options, id }) => (
              <div key={id} className="flex flex-col hover:bg-gray-50 rounded-md transition">
                <label htmlFor={id} className="text-xs sm:text-sm md:text-base font-medium mb-1">{label}</label>
                <select
                  id={id}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  className="border border-gray-300 rounded text-sm sm:text-base md:text-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="">Select an option</option>
                  {options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        ) : (
          <textarea
            name="prompt"
            aria-label="Prompt text area"
            className="w-full border rounded p-4 h-40 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter your prompt here"
            value={openPrompt}
            onChange={e => setOpenPrompt(e.target.value)}
          />
        )}

        <div className="text-center mt-10">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-black text-white text-base sm:text-lg md:text-base px-5 sm:px-6 md:px-6 py-2 sm:py-2.5 md:py-2 rounded-full hover:bg-gray-900 disabled:opacity-50 transition"
          >
            {isLoading ? 'Generating...' : 'Generate Design →'}
          </button>
        </div>
      </form>

      {/* Output image */}
      <div className="w-full max-w-6xl h-[400px] mx-auto border border-dashed bg-gray-50 rounded-md flex items-center justify-center text-gray-500 mt-10">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Generated design"
            className="max-h-full mx-auto"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/fallback.png';
            }}
          />
        ) : (
          <p>Design will appear here...</p>
        )}
      </div>

      {promptUsed && (
        <p className="text-xs text-center italic mt-2 text-gray-400">
          Prompt: {promptUsed}
        </p>
      )}

      {/* Footer */}
      <div className="text-center mt-10">
        <p className="font-semibold text-lg sm:text-xl md:text-2xl mb-2">
          All done?
       </p>
       <button
          onClick={handleReflectClick}
          className="inline-block bg-black text-white text-base sm:text-lg md:text-base px-5 sm:px-6 md:px-6 py-2 sm:py-2.5 md:py-2 rounded-full hover:bg-gray-900 disabled:opacity-50 transition"
        >
         Reflect on who created this →
      </button>
    </div>
    </main>
  );
}
