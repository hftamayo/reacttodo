import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { DashBoardHeaderActionsStyles } from '@/shared/utils/twind/styles';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';

const SearchText: React.FC = () => {
  const { text } = useTranslation('searchTextControl');

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
        title={text}
      />
    </div>
  );
};

export default SearchText;
