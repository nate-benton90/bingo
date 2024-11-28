import React, { useState } from 'react';

const CapybaraPage = () => {
  const [gradientPosition, setGradientPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX / width) * 100; // Calculate x as a percentage
    const y = (clientY / height) * 100; // Calculate y as a percentage
    setGradientPosition({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="min-h-screen flex items-center justify-center"
      style={{
        background: `radial-gradient(circle at ${gradientPosition.x}% ${gradientPosition.y}%, #FFDEE9, #B5FFFC)`,
      }}
    >
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-8">The Capybara Sees You.</h1>
        <img
          src="./capy.gif" // Ensure this path is correct
          alt="Capybara"
          className="rounded-full shadow-lg border-4 border-white"
          style={{ width: '300px', height: '300px' }}
        />
      </div>
    </div>
  );
};

export default CapybaraPage;
