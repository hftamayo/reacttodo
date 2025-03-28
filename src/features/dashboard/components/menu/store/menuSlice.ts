import { createSlice } from '@reduxjs/toolkit';
import { MENU_ITEMS } from '../constants/menuItems';
import { MenuState } from '@/shared/types/menu.type';

const initialState: MenuState = {
  items: MENU_ITEMS,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  selectors: {
    selectDropDownItems: (state) =>
      state.items.filter((item) => item.isDropDownItem),
    selectMainMenuItems: (state) =>
      state.items.filter((item) => !item.isDropDownItem),
  },
});

export const { selectDropDownItems, selectMainMenuItems } = menuSlice.selectors;
export default menuSlice.reducer;
