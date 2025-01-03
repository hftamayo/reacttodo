import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { DashBoardHeaderActionsStyles } from '@/shared/utils/twind/styles';

const SearchText: React.FC = () => {
  return (
    <div className="relative md:w-65">
      <span className={DashBoardHeaderActionsStyles.spanSearchAction}>
        <button className={DashBoardHeaderActionsStyles.buttonSearchAction}>
          <FaSearch />
        </button>
      </span>
      <input
        type="text"
        className={DashBoardHeaderActionsStyles.inputSearchAction}
      />
    </div>
  );
};

export default SearchText;
