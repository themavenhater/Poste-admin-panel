import React from 'react';
import clsx from 'clsx';


function Status(props) {
  return (
    <div className={clsx("inline text-12 p-4 rounded truncate text-white mr-1", props.color)}>
      {props.name}
    </div>
  );
}

Status.defaultProps = {
  color: 'bg-black',
  name: 'untrouvable'
}

export default Status;
