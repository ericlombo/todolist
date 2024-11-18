// import React from 'react';
import tick from '../assets/tick.png';
import not_tick from '../assets/not_tick.png';
import delete_icon from '../assets/delete.png';
import PropTypes from 'prop-types';

const TodoItems = ({ text, isComplete, toggleComplete, deleteTodo }) => {
  return (
    <div className='flex items-center my-3 gap-2'>
      <div className='flex flex-1 items-center cursor-pointer' onClick={toggleComplete}>
        <img
          className='w-7'
          src={isComplete ? tick : not_tick}
          alt={isComplete ? 'Completed' : 'Not Completed'}
        />
        <p className={`ml-4 text-[17px] ${isComplete ? 'line-through text-slate-400' : 'text-slate-700'}`}>
          {text}
        </p>
      </div>
      <div>
        <img
          src={delete_icon}
          alt="Delete"
          className='w-3.5 cursor-pointer'
          onClick={deleteTodo} // Call deleteTodo when the delete icon is clicked
        />
      </div>
    </div>
  );
};

TodoItems.propTypes = {
  text: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  toggleComplete: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired, // Add deleteTodo to propTypes
};

export default TodoItems;

