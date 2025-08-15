export const LandingStyles = {
  button:
    'text-2xl py-4 px-6 md:px-10 lg:py-6 lg:px-12 bg-white bg-opacity-10 hover:bg-opacity-20 duration-150 rounded-full outline-none',
};

export const MainLayoutStyles = {
  layoutContainer:
    'min-h-screen flex flex-col bg-[var(--cameo-0)] text-[var(--cameo-1000)]',
  layoutHeader:
    'w-full fixed left-0 right-0 z-10 top-0 h-16 bg-[var(--cameo-800)]',
  layoutContent: (isCollapsed: boolean) =>
    `flex-grow transition-transform duration-300 pt-16 bg-[var(--cameo-0)] text-[var(--cameo-1000)] ${isCollapsed ? 'ml-0' : 'ml-64'}`,
  layoutFooter: 'w-full fixed left-0 right-0 z-10 bottom-0',
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
    'w-full px-4 py-1 pl-12 rounded shadow outline-none hidden md:block text-white',
};

export const DashBoardMenuBarStyles = {
  base: 'fixed top-[64px] left-0 w-64 bg-[var(--cameo-300)] h-[calc(100vh-64px)] transition-transform duration-300 ease-in-out',
  collapsed: '-translate-x-full',
  expanded: 'translate-x-0',
  unorderedItem1stLevel: 'mt-3 text-[var(--cameo-950)] font-bold',
  collapseButton: 'w-full bg-gray-800 text-[var(--cameo-950)] py-2',
  toggleEffectButton:
    'w-64 bg-gray-600 fixed h-full px-4 py-2 left-0 top-1/2 transform -translate-y-1/2',
  listItem: 'rounded transition-colors duration-200',
  linkItem:
    'px-3 py-2 flex items-center text-[var(--cameo-950)] hover:bg-[var(--cameo-500)] font-bold',
  menuIcon: 'w-6 h-6 mr-2',
  menuButton:
    'w-full px-3 py-2 flex items-center text-[var(--cameo-950)] hover:bg-[var(--cameo-500)] font-bold',
  mappedItem:
    'rounded hover:bg-[var(--cameo-500)] transition-colors duration-200',
  mappedLink:
    'block px-3 py-2 text-[var(--cameo-950)] hover:text-[var(--cameo-950)] font-bold',
};

export const DashBoardHeaderActionsStyles = {
  toggleButton: 'text-[var(--header-text)] me-4 cursor-pointer',
  spanSearchAction:
    'relative md:absolute inset-y-0-left-0 flex items-center pl-2',
  buttonSearchAction:
    'p-1 focus:outline-none text-[var(--header-text)] md:text-[var(--header-text)]',
};

export const DashBoardHeaderProfileMenuStyles = {
  button: 'text-[var(--header-text)] font-bold group flex items-center',
  icon: 'w-4 h-4 mr-2 text-[var(--cameo-800) font-bold]',
};

export const DashBoardFooterStyles = {
  footer_links:
    'mx-3 font-semibold hover:opacity-80 duration-150 hover:text-teal-500 hover:underline',
  footer_text: 'mx-3 font-semibold text-teal-300 hover:opacity-80',
  footer_text_offline: 'mx-3 font-bold text-red-700 hover:opacity-80',
  footer_text_no_connection: 'mx-3 font-bold text-red-700 hover:opacity-80',
  footer_text_checking: 'mx-3 font-bold text-yellow-500 hover:opacity-80',
};

export const taskBoard = {
  bg: 'flex justify-center w-screen p-4 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)]',
  container:
    'bg-[var(--cameo-100)] max-w-[500px] w-full rounded-md shadow-xl p-4 mt-4',
  heading: 'text-3xl font-bold text-center text-[var(--text-color)] p-2',
  form: 'flex justify-between',
  frmContainer: 'flex items-center space-x-4 w-full',
  input: 'border p-2 w-full text-xl',
  button:
    'border p-4 ml-2 bg-[var(--accent-color)] text-[var(--neutral-light)]',
  count: 'text-center p-2',
  error: 'text-center text-red-500',
};

export const taskRow = {
  li: 'flex items-center justify-between bg-[var(--cameo-200)] p-4 my-2 capitalize',
  liComplete:
    'flex items-center justify-between bg-[var(--cameo-300)] p-4 my-2 capitalize',
  content: 'flex items-center flex-grow',
  text: 'ml-2 cursor-pointer',
  textComplete: 'ml-2 cursor-pointer line-through',
  actions: 'flex items-center space-x-2',
};

export const formStyles = {
  form: 'w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto px-4 sm:px-0',
  header: 'text-center mb-4 sm:mb-6',
  formGrid: 'flex flex-col space-y-3 sm:space-y-4',
  formRow: 'flex flex-col space-y-1 sm:space-y-2',
  label: 'text-xs sm:text-sm font-medium',
  input: 'w-full text-sm sm:text-base px-3 py-2 sm:px-4 sm:py-3',
  checkbox: 'mr-1 sm:mr-2',
  footer:
    'flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-4 sm:mt-6',
  error: 'text-red-500 text-xs sm:text-sm mt-1',

  title: 'text-xl sm:text-2xl md:text-3xl font-bold text-center mb-2',
  description: 'text-center text-lg sm:text-xl font-bold',
  grouptitle: 'font-bold underline text-sm sm:text-base',
  closeButton:
    'absolute top-1 right-1 sm:top-2 sm:right-2 p-1 sm:p-1.5 rounded-full bg-[var(--cameo-400)] hover:bg-[var(--cameo-600)] transition-colors duration-200',
  closeIcon: 'w-3 h-3 sm:w-4 sm:h-4 text-[var(--cameo-1000)]',
  cancelButton:
    'bg-[var(--cameo-400)] text-[var(--cameo-1000)] px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base rounded-md hover:bg-[var(--cameo-600)] transition-colors duration-200 w-full sm:w-auto',
  submitButton:
    'bg-[var(--cameo-400)] text-[var(--cameo-1000)] px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base rounded-md hover:bg-[var(--cameo-600)] transition-colors duration-200 w-full sm:w-auto',
};

export const toasterMessages = {
  errorToaster: 'bg-red-500 text-white p-2 text-lg rounded-md',
  successToaster: 'bg-green-500 text-white p-2 text-lg rounded-md',
  infoToaster: 'bg-blue-500 text-white p-2 text-lg rounded-md',
};
