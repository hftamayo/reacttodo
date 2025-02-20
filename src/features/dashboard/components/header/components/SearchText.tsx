import React, { useState } from 'react';
import { Input } from '@/shared/components/ui/input/Input';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';

export const SearchText: React.FC = () => {
  const { text: textHolder } = useTranslation('searchTextControl');
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (data: any) => {
    console.log(data);
  };

  return (
    <div className="relative md:w-65 flex items-center text-white">
      <Input
        type="text"
        ctrlsize="large"
        placeholder={textHolder}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
};
