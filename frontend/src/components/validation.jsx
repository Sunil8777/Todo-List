import React from 'react';

function Validation(props) {
  return (
    props.data != null && (
      <p className={`relative bottom-5 ${props.data.invalid ? 'text-red-600' : 'text-green-500'}`}>
        {props.data.message}
      </p>
    )
  );
}

export default Validation;
