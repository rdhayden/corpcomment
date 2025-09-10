import { useState } from 'react';
import { MAX_CHAR_COUNT } from '../lib/constants';

type FeedbackFormProps = {
  onAddToList: (text: string) => void;
};

export default function FeedbackForm({ onAddToList }: FeedbackFormProps) {
  const [text, setText] = useState('');

  const charCount = MAX_CHAR_COUNT - text.length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length > MAX_CHAR_COUNT) {
      alert(`Feedback cannot exceed ${MAX_CHAR_COUNT} characters.`);
      return;
    }
    setText(newText);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddToList(text);
    setText('');
  };

  // the placeholder blabla text is a css trick to make the label text show
  // before the user writes anything, if its ommited the label will not be visible
  // and the form is a controlled component, meaning the value of the textarea is
  // controlled by React state
  return (
    <form onSubmit={handleSubmit} className="form">
      <textarea
        onChange={handleChange}
        value={text}
        id="feedback-textarea"
        placeholder="blabla"
        spellCheck="false"
      />
      <label htmlFor="feedback-textarea">
        Enter your feedback here, remember to #hashtag the company
      </label>
      <div>
        <p className="u-italic">{charCount}</p>
        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}
