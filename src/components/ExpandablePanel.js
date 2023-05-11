import { useState } from 'react';
import { GoChevronDown, GoChevronLeft } from 'react-icons/go';
import className from 'classnames';

const ExpandablePanel = ({ children, header, ...rest }) => {
  const [expanded, setExpanded] = useState(false);
  const handleClick = () => {
    setExpanded(!expanded);
  };

  const classes = className('mb-2 border rounded', rest.className);

  return (
    <div className={classes}>
      <div className="flex p-2 justify-between items-center cursor-pointer"
           onClick={handleClick}>
        <div className="flex flex-row items-center justify-between">
          {header}
        </div>

        <div className="cursor-pointer">
          {expanded ? <GoChevronLeft/> : <GoChevronDown/>}
        </div>
      </div>

      {expanded && <div className="p-2 border-t">
        {children}
      </div>}
    </div>
  );
};

export default ExpandablePanel;
