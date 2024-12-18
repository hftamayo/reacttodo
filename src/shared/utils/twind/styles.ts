export const taskRow = {
  li: 'flex justify-between bg-slate-200 p-4 my-2 capitalize',
  liComplete: 'flex justify-between bg-slate-400 p-4 my-2 capitalize',
  row: 'flex',
  text: 'ml-2 cursor-pointer',
  textComplete: 'ml-2 cursor-pointer line-through',
  button: 'cursor-pointer flex items-center',
};

export const taskBoard = {
  boardContainer: 'flex items-center justify-center min-h-screen',
  bg: 'h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]',
  container:
    'bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4',
  heading: 'text-3xl font-bold text-center text-gray-800 p-2',
  form: 'flex justify-between',
  frmContainer: 'flex items-center space-x-4 w-full',
  input: 'border p-2 w-full text-xl',
  button: 'border p-4 ml-2 bg-purple-500 text-slate-100',
  count: 'text-center p-2',
};

export const toasterMessages = {
  errorToaster: 'bg-red-500 text-white p-2 text-lg rounded-md',
  successToaster: 'bg-green-500 text-white p-2 text-lg rounded-md',
  infoToaster: 'bg-blue-500 text-white p-2 text-lg rounded-md',
};
