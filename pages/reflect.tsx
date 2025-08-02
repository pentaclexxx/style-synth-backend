import { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

export default function ReflectPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    role: '',
    familiarity: 5,
    contributions: [] as string[],
    q3Other: '',
    q4: '',
    q5: '',
    q6: '',
    q7: '',
    q8: '',
    q8Other: '',
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
  const user_name = localStorage.getItem('user_name');

    if (!user_name || user_name.length > 30) {
        alert('Missing or invalid user name. Please start from the home page.');
        router.push('/');
        return;
      }
    
    // Validation checks
    if (
        !form.role ||
        form.familiarity === null ||
        form.contributions.length === 0 ||
        (form.contributions.includes('Other') && !form.q3Other.trim()) ||
        !form.q4.trim() ||
        !form.q5 ||
        !form.q6.trim() ||
        !form.q7.trim() ||
        (form.q8 === '' || (form.q8 === 'Other' && !form.q8Other.trim()))
      ) {
        alert('Please complete all questions before submitting.');
        return;
      }

    setSubmitting(true);

   // Define the payload explicitly for clarity and debugging
     const payload = {
       user_name,
       q1: form.role,
    q2: form.familiarity,
    q3: form.contributions,
    q3_other: form.q3Other,
    q4: form.q4,
    q5: form.q5,
    q6: form.q6,
    q7: form.q7,
    q8: form.q8,
    q8_other: form.q8 === 'Other' ? form.q8Other : null,
    created_at: new Date().toISOString(),
  };
  
  const { error } = await supabase.from('reflections').insert([payload]);
  
  setSubmitting(false);
  
  if (error) {
    console.error('🚨 Supabase insert error:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      payload, // also log payload to debug what's being sent
    });
    alert(`Submission failed: ${error.message || 'Please try again.'}`);
  } else {
    alert('Thank you for your response!');
    router.push('/');
  }
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
        <p className="font-semibold mb-2 text-sm sm:text-base md:text-lg">
            Q1: How would you describe your role in the design process?</p>
        {['I gave the main direction', 'I collaborated with the system', 'I explored possibilities it offered', 'I observed more than directed', 'I’m not sure'].map(option => (
          <label key={option} className="block text-xs sm:text-sm md:text-base mb-2">
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
     <div className="mb-6">
      <p className="font-semibold mb-2 text-sm sm:text-base md:text-lg">
        Q2: When you saw the final result, what did it feel like to you?</p>

     <div className="relative w-full h-16 mt-0">

       {/* Bubble */}
      <div
      className=" absolute 
    top-0 md:-top-2 lg:-top-3
    transform -translate-x-1/2 
    bg-gray-300 text-black 
    text-xs sm:text-sm lg:text-sm 
    px-2 sm:px-3 lg:px-3 
    py-1 sm:py-1.5 lg:py-1.5 
    rounded-full 
    after:content-[''] after:absolute after:top-full after:left-1/2 
    after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-gray-300"
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
        ['--value' as any]: `${(form.familiarity / 10) * 100}%`,
      }}
    />
  </div>

  <div className="flex justify-between 
                text-xs sm:text-sm md:text-base 
                text-gray-600 italic 
                mt-0 sm:mt-1 md:mt-2
                -translate-y-1 sm:-translate-y-1 md:-translate-y-2">
    <span>“Felt unfamiliar”</span>
    <span>“Felt entirely mine”</span>
  </div>
</div>

      {/* Q3 */}
<div className="mb-6">
  <p className="font-semibold mb-2 text-sm sm:text-base md:text-lg">
    Q3: What do you think most contributed to the final look? 
    <span className="text-gray-500 text-sm sm:text-base md:text-lg italic"> (Select all that apply)</span>
  </p>

  {[
    'My choices and ideas',
    'The prompt wording',
    'The tool/interface design',
    'The AI model’s training and outputs',
    'Randomness or surprise',
  ].map(option => (
    <label key={option} className="block text-xs sm:text-sm md:text-base mb-2">
      <input
        type="checkbox"
        name="contributions"
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

  {/* "Other" with consistent layout + responsive input */}
  <div className="flex items-center gap-2 mb-2 text-xs sm:text-sm md:text-base">
  <input
    type="checkbox"
    name="contributions"
    value="Other"
    checked={form.contributions.includes('Other')}
    onChange={(e) => {
      const checked = e.target.checked;
      handleChange(
        'contributions',
        checked
          ? [...form.contributions, 'Other']
          : form.contributions.filter((item) => item !== 'Other')
      );
    }}
    className="w-4 h-4 rounded-full border-gray-400 text-black focus:ring-black"
  />
  <span>Other:</span>
  <input
    type="text"
    value={form.q3Other}
    onChange={(e) => handleChange('q3Other', e.target.value)}
    placeholder="Please specify..."
    className="flex-grow border rounded p-2 text-xs sm:text-sm md:text-base"
  />
</div>
</div>


      {/* Q4 */}
      <div className="mb-6">
        <p className="font-semibold mb-2 text-sm sm:text-base md:text-lg">
           Q4: In your own words, how do you think the design came together?</p>
        <textarea
          value={form.q4}
          onChange={(e) => handleChange('q4', e.target.value)}
          className="w-full border rounded p-2 resize-y min-h-[80px] sm:min-h-[100px] text-sm sm:text-base"
          rows={3}
        />
     </div>

      {/* Q5 */}
      <div className="mb-6">
        <p className="font-semibold mb-2 text-sm sm:text-base md:text-lg">
            Q5: How closely did the output match what you were expecting?</p>
        {['Very closely', 'Somewhat', 'Not really', 'It surprised me entirely'].map(option => (
          <label key={option} className="block text-xs sm:text-sm md:text-base mb-2">
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

     {/* Q6 */}
     <div className="mb-6">
      <p className="font-semibold mb-2 text-sm sm:text-base md:text-lg">
        Q6: How did each mode affect the way you expressed your ideas?</p>
      <textarea
        value={form.q6}
        onChange={(e) => handleChange('q6', e.target.value)}
        className="w-full border rounded p-2 resize-y min-h-[80px] sm:min-h-[100px] text-sm sm:text-base"
        rows={3}
      />
    </div>
      
      {/* Q7 */}
      <div className="mb-6">
       <p className="font-semibold mb-2 text-sm sm:text-base md:text-lg">
        Q7: In what ways did the interface affect your creative process?</p>
       <textarea
        value={form.q7}
        onChange={(e) => handleChange('q7', e.target.value)}
        className="w-full border rounded p-2 resize-y min-h-[80px] sm:min-h-[100px] text-sm sm:text-base"
        rows={3}
       />
    </div>

      {/* Q8 */}
      <div className="mb-6">
        <p className="font-semibold mb-2 text-sm sm:text-base md:text-lg">
          Q8: If this look were shown in a collection, how would you like your involvement to be recognized?
        </p>

     {[
       'As the creative lead',
       'As a co-creator',
       'As a collaborator with AI',
       'No credit needed',
     ].map(option => (
       <label key={option} className="block text-xs sm:text-sm md:text-base mb-2">
         <input
           type="radio"
           name="q8"
           value={option}
           checked={form.q8 === option}
           onChange={() => handleChange('q8', option)}
           className="mr-2 w-4 h-4 text-black focus:ring-black"
          />
          {option}
        </label>
     ))}

     {/* "Other" radio + input inline and responsive */}
     <div className="flex items-center gap-2 text-xs sm:text-sm md:text-base">
      <input
        type="radio"
        name="q8"
        value="Other"
        checked={form.q8 === 'Other'}
        onChange={() => handleChange('q8', 'Other')}
        className="w-4 h-4 text-black focus:ring-black"
     />
     <span>Other:</span>
     <input
       type="text"
       value={form.q8 === 'Other' ? form.q8Other : ''}
       onChange={(e) => handleChange('q8Other', e.target.value)}
       placeholder="Please specify..."
       className="flex-grow border rounded p-2 text-xs sm:text-sm md:text-base w-full sm:w-2/3 md:w-3/4"
    />
  </div>
</div>

      {/* Submit */}
      <div className="text-center mt-10">
       <button 
         onClick={handleSubmit}
         disabled={submitting}
         className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-900 transition disabled:opacity-50"
       >
        {submitting ? 'Submitting...' : 'Submit & Finish →'}
       </button>
     </div>
     </main>
     );
    }
