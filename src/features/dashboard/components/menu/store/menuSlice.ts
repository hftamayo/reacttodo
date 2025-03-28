import { createSlice } from '@reduxjs/toolkit';
import { MENU_ITEMS } from '../constants/menuItems';
import { RootState } from '@/shared/services/redux/rootReducer';
import { MenuState } from '@/shared/types/menu.type';

const initialState: MenuState = {
  items: MENU_ITEMS,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
});

export const selectAllMenuItems = (state: RootState) => state.menu.items;
export const selectDropDownItems = (state: RootState) =>
  state.menu.items.filter((item) => item.isDropDownItem);
export const selectMainMenuItems = (state: RootState) =>
  state.menu.items.filter((item) => !item.isDropDownItem);

export default menuSlice.reducer;
