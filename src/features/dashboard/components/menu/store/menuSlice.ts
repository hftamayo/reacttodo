import { createSlice, createSelector } from '@reduxjs/toolkit';
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

const selectMenuState = (state: RootState) => state.menu.items;

export const selectAllMenuItems = (state: RootState) => state.menu.items;

export const selectDropDownItems = createSelector([selectMenuState], (items) =>
  items.filter((item) => item.isDropDownItem)
);

export const selectMainMenuItems = createSelector([selectMenuState], (items) =>
  items.filter((item) => !item.isDropDownItem)
);

export default menuSlice.reducer;
