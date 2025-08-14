import React from 'react';

export const ContentContainer: React.FC = () => {
  return (
    <div
      className="
      flex-1 
      flex flex-col 
      items-center 
      justify-center 
      px-4 sm:px-6 md:px-8 lg:px-20
      py-8 sm:py-12 md:py-16 lg:py-20
      text-center
    "
    >
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        <h1
          className="
          text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
          font-bold 
          text-gray-900
          leading-tight
        "
        >
          Welcome to React Todo
        </h1>

        <p
          className="
          text-base sm:text-lg md:text-xl lg:text-2xl
          text-gray-600
          max-w-2xl mx-auto
          leading-relaxed
        "
        >
          Organize your tasks efficiently with our modern, responsive todo
          application.
        </p>

        <div
          className="
          flex flex-col sm:flex-row 
          gap-4 sm:gap-6 
          justify-center 
          items-center
          mt-8 sm:mt-12
        "
        >
          <button
            className="
            bg-blue-600 hover:bg-blue-700
            text-white
            px-6 sm:px-8 md:px-10
            py-3 sm:py-4
            text-sm sm:text-base md:text-lg
            font-semibold
            rounded-lg
            transition-colors duration-200
            w-full sm:w-auto
            min-w-[160px]
          "
          >
            Get Started
          </button>

          <button
            className="
            border-2 border-gray-300 hover:border-gray-400
            text-gray-700 hover:text-gray-900
            px-6 sm:px-8 md:px-10
            py-3 sm:py-4
            text-sm sm:text-base md:text-lg
            font-semibold
            rounded-lg
            transition-colors duration-200
            w-full sm:w-auto
            min-w-[160px]
          "
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};
