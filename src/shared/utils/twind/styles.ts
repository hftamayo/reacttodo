export const MainLayoutStyles = {
  layoutContainer: 'min-h-screen grid grid-rows-[auto,1fr,auto]',
  layoutHeader: 'col-span-2 fixed left-0 right-0 z-10 top-0',
  layoutContent: (isCollapsed: boolean) =>
    `flex-grow pt-[64px] transition-transform duration-300 
     ${isCollapsed ? 'ml-0' : 'ml-64'}`,
  layoutFooter: 'col-span-2 fixed left-0 right-0 z-10 bottom-0',
};

export const DashBoardHeader = {
  menuLoggedUser:
    'mb-2 rounded hover:shadow hover:bg-gray-600 hover:text-white py-2',
  menuItemLoggedUser:
    'mb-2 rounded hover:shadow hover:bg-gray-600 hover:text-white py-2',
  firstLevelContainer: 'bg-gray-800 px-4 py-3 flex justify-between',
  secondLevelContainer: 'flex items-center text-xl',
  spacer: 'relative md:absolute inset-y-0-left-0 flex items-center pl-2',
  searchInput:
    'w-full px-4 py-1 pl-12 rounded shadow outline-none hidden md:block',
};

export const DashBoardMenuBarStyles = {
  base: 'fixed top-[64px] left-0 w-64 bg-gray-600 h-[calc(100vh-64px)] transition-transform duration-300 ease-in-out',
  collapsed: '-translate-x-full',
  expanded: 'translate-x-0',
  div2ndLevelContainer: 'sidebar-item text-white w-60 h-full',
  unorderedItem1stLevel: 'mt-3 text-white font-bold',
  unorderedItem2ndLevel: 'mt-3 font-bold',
  unorderedItem3rdLevel: 'ml-6 mt-2',
  collapseButton: 'w-full bg-gray-800 text-white py-2',
  toggleEffectButton:
    'w-64 bg-gray-600 fixed h-full px-4 py-2 left-0 top-1/2 transform -translate-y-1/2', // Move to left edge
  listItem: 'mb-2 rounded hover:shadow hover:bg-teal-600 py-2',
  linkItem: 'px-3',
  menuIcon: 'inline-block w-6 h-6 mr-2 -mt-2',
  menuButton: 'px-3 w-full text-left flex items-center',
  menuIcon2ndLevel: 'inline-block w-6 h-6 mr-2',
  menuIcon3rdLevel: 'ml-auto',
  mappedItem: 'hover:bg-teal-600 hover:text-teal-200 py-2 px-3 rounded',
};

export const DashBoardHeaderActionsStyles = {
  toggleButton: 'text-white me-4 cursor-pointer',
  spanSearchAction:
    'relative md:absolute inset-y-0-left-0 flex items-center pl-2',
  buttonSearchAction: 'p-1 focus:outline-none text-white md:text-black',
  inputSearchAction:
    'w-full px-4 py-1 pl-12 rounded shadow outline-none hidden md:block',
};

export const DashBoardHeaderProfileMenuStyles = {
  button: 'text-white group flex items-center',
  icon: 'w-4 h-4 mr-2 text-gray-600',
};

export const DashBoardFooterStyles = {
  footer_links:
    'mx-3 font-semibold hover:opacity-80 duration-150 hover:text-teal-500 hover:underline',
  footer_text: 'mx-3 font-semibold text-teal-300 hover:opacity-80',
};

export const taskBoard = {
  bg: 'flex justify-center w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]',
  container: 'bg-slate-100 max-w-[500px] w-full rounded-md shadow-xl p-4 mt-4',
  heading: 'text-3xl font-bold text-center text-gray-800 p-2',
  form: 'flex justify-between',
  frmContainer: 'flex items-center space-x-4 w-full',
  input: 'border p-2 w-full text-xl',
  button: 'border p-4 ml-2 bg-purple-500 text-slate-100',
  count: 'text-center p-2',
};

export const taskRow = {
  li: 'flex justify-between bg-slate-200 p-4 my-2 capitalize',
  liComplete: 'flex justify-between bg-slate-400 p-4 my-2 capitalize',
  row: 'flex',
  text: 'ml-2 cursor-pointer',
  textComplete: 'ml-2 cursor-pointer line-through',
  button: 'cursor-pointer flex items-center',
};

export const formSettingsStyles = {
  title: 'text-center text-2xl font-bold',
  description: 'text-center text-xl font-bold',
  grouptitle: 'font-bold underline',
};

export const toasterMessages = {
  errorToaster: 'bg-red-500 text-white p-2 text-lg rounded-md',
  successToaster: 'bg-green-500 text-white p-2 text-lg rounded-md',
  infoToaster: 'bg-blue-500 text-white p-2 text-lg rounded-md',
};
