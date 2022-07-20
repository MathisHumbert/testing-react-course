import { useState } from 'react';

export function replaceCamelWithSpaces(colorName) {
  return colorName.replace(/\B([A-Z])\B/g, ' $1');
}

function App() {
  const [buttonColor, setButtonColor] = useState('MediumVioletRed');
  const [isChecked, setIsChecked] = useState(false);
  const newButtonColor =
    buttonColor === 'MediumVioletRed' ? 'MidnightBlue' : 'MediumVioletRed';

  return (
    <div>
      <button
        style={{ backgroundColor: isChecked ? 'gray' : buttonColor }}
        onClick={() =>
          setButtonColor(
            buttonColor === 'MediumVioletRed'
              ? 'MidnightBlue'
              : 'MediumVioletRed'
          )
        }
        disabled={isChecked}
      >
        Change to {newButtonColor}
      </button>
      <input
        type='checkbox'
        id='disable-button-checkbox'
        value={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
      <label htmlFor='disable-button-checkbox'>Disable button</label>
    </div>
  );
}

export default App;
