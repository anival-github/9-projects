/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */

import virtualkeyBoard from './virtualKeyboard/virtualKeyboard'
import './virtualKeyboard/virtualKeyboard.css'

export default function Input({
  setSearchTerm,
  searchTerm,
}) {
  return (
    <input
      className='useKeyboardInput'
      type="text"
      placeholder="Search..."
      onFocus={
        () => virtualkeyBoard(setSearchTerm, searchTerm)
      }
      onChange={(event) => {
        setSearchTerm(event.target.value);
      }} />
  );
}
