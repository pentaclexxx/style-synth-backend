import { useState } from 'react';

export default function ReflectPage() {
  const [form, setForm] = useState({
    role: '',
    familiarity: 5,
    contributions: [] as string[],
    q4: '',
    q5: '',
    q6: '',
    q7: '',
    q8: '',
  });

  const handleChange = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-gray-900">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">Let’s pause and reflect…</h1>
      <p className="text-[11px] sm:text-[12px] md:text-[14px] italic text-gray-400 mb-8">
        Thinking back on your experience with Style Synth, across all the looks you explored: <br />
        Take a moment to consider how the process felt, what shaped your decisions, and what emerged through the tool.
      </p>

      {/* Q1 */}
      <div className="mb-6">
        <p className="font-semibold mb-2">Q1: How would you describe your role in the design process?</p>
        {['I gave the main direction', 'I collaborated with the system', 'I explored possibilities it offered', 'I observed more than directed', 'I’m not sure'].map(option => (
          <label key={option} className="block text-sm mb-1">
            <input
              type="radio"
              name="role"
              value={option}
              checked={form.role === option}
              onChange={() => handleChange('role', option)}
              className="mr-2"
            />
            {option}
          </label>
        ))}
      </div>

      {/* Q2 */}
<div className="mb-12">
  <p className="font-semibold mb-4">Q2: When you saw the final result, what did it feel like to you?</p>

  <div className="relative w-full h-16 mt-0">
    {/* Bubble */}
    <div
      className="absolute top-0 transform -translate-x-1/2 bg-gray-300 text-black text-xs px-2 py-1 rounded-full after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-gray-300"
      style={{
        left: `${(form.familiarity / 10) * 100}%`,
      }}
    >
      {`${Math.round((form.familiarity / 10) * 100)}%`}
    </div>

    {/* Slider with dynamic fill */}
    <input
      type="range"
      min="0"
      max="10"
      value={form.familiarity}
      onChange={(e) => handleChange('familiarity', Number(e.target.value))}
      className="w-full mt-10 slider-thumb-black"
      style={{
        // this sets the fill up to the thumb
        ['--value' as any]: `${(form.familiarity / 10) * 100}%`,
      }}
    />
  </div>

  <div className="flex justify-between text-sm text-gray-600 italic mt-1 -translate-y-1">
    <span>“Felt unfamiliar”</span>
    <span>“Felt entirely mine”</span>
  </div>
</div>

      {/* Q3 */}
<div className="mb-6">
  <p className="font-semibold mb-2">
    Q3: What do you think most contributed to the final look? 
    <span className="text-gray-500 text-sm italic"> (Select all that apply)</span>
  </p>

  {[
    'My choices and ideas',
    'The prompt wording',
    'The tool/interface design',
    'The AI model’s training and outputs',
    'Randomness or surprise',
    'Other',
  ].map(option => (
    <label key={option} className="block text-sm mb-1">
      <input
        type="checkbox"
        name={option}
        value={option}
        checked={form.contributions.includes(option)}
        onChange={(e) => {
          const checked = e.target.checked;
          handleChange(
            'contributions',
            checked
              ? [...form.contributions, option]
              : form.contributions.filter((item) => item !== option)
          );
        }}
        className="mr-2 w-4 h-4 rounded-full border-gray-400 text-black focus:ring-black"
      />
      {option}
    </label>
  ))}
</div>


      {/* Q4–Q8: Text + radio */}
      {[
        { key: 'q4', label: 'Q4: In your own words, how do you think the design came together?' },
        { key: 'q6', label: 'Q6: How did each mode affect the way you expressed your ideas?' },
        { key: 'q7', label: 'Q7: In what ways did the interface affect your creative process?' },
      ].map(({ key, label }) => (
        <div className="mb-6" key={key}>
          <p className="font-semibold mb-2">{label}</p>
          <textarea
            value={form[key as keyof typeof form]}
            onChange={(e) => handleChange(key, e.target.value)}
            className="w-full border rounded p-2"
            rows={3}
          />
        </div>
      ))}

      {/* Q5 */}
      <div className="mb-6">
        <p className="font-semibold mb-2">Q5: How closely did the output match what you were expecting?</p>
        {['Very closely', 'Somewhat', 'Not really', 'It surprised me entirely'].map(option => (
          <label key={option} className="block text-sm mb-1">
            <input
              type="radio"
              name="q5"
              value={option}
              checked={form.q5 === option}
              onChange={() => handleChange('q5', option)}
              className="mr-2"
            />
            {option}
          </label>
        ))}
      </div>

      {/* Q8 */}
      <div className="mb-6">
        <p className="font-semibold mb-2">
          Q8: If this look were shown in a collection, how would you like your involvement to be recognized?
        </p>
        {['As the creative lead', 'As a co-creator', 'As a collaborator with AI', 'No credit needed', 'Other'].map(option => (
          <label key={option} className="block text-sm mb-1">
            <input
              type="radio"
              name="q8"
              value={option}
              checked={form.q8 === option}
              onChange={() => handleChange('q8', option)}
              className="mr-2"
            />
            {option}
          </label>
        ))}
      </div>

      {/* Submit */}
      <div className="text-center mt-10">
        <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-900 transition">
          Submit & Finish →
        </button>
      </div>
    </main>
  );
}
