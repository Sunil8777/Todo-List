import React from 'react'

function Todos(props) {
  return (
    <>
      <ul className="space-y-3 mt-3">
        <li className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
          <span className="text-gray-900">{props.text.title}</span>
            <div className="space-x-2">
              
              <button onClick={ () => props.handleDelete(props.text._id)} className="text-green-600 font-semibold hover:text-red-600">Done</button>
          </div>
        </li>
      </ul>
      
  </>
  )
}

export default Todos
