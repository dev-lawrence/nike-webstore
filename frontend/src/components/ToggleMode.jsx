import { useState, useEffect } from 'react';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightMode';

const ToggleMode = () => {
  const [darkMode, setDarkMode] = useState(false);

  const storedMode = localStorage.getItem('nike.mode');

  // function to enable dark mode
  const enableDarkMode = () => {
    document.body.className = 'dark';
    localStorage.setItem('nike.mode', 'dark');
  };

  // function to enable light mode
  const enableLightMode = () => {
    document.body.className = 'light';
    localStorage.setItem('nike.mode', 'light');
  };

  // handle the media query mode from the system color settings
  const handleMediaQueryChange = (event) => {
    const isMediaMatched = event.matches;
    setDarkMode(isMediaMatched);

    if (event.matches) {
      enableDarkMode();
    } else {
      enableLightMode();
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Initial check
    handleMediaQueryChange(mediaQuery);

    // Add event listener
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Clean up listener
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  useEffect(() => {
    const preferredScheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';

    if (storedMode === 'dark') {
      enableDarkMode();
      setDarkMode(true);
    } else if (storedMode === 'light') {
      enableLightMode();
      setDarkMode(false);
    } else {
      setDarkMode(preferredScheme === 'dark');
    }
  }, [storedMode]);

  //   function to handle toggle mode
  const handleToggleMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      enableDarkMode();
    } else {
      enableLightMode();
    }
  };

  return (
    <>
      <div onClick={handleToggleMode}>
        {darkMode ? (
          <LightModeIcon
            className="icon mode"
            titleAccess="Turn on the light"
          />
        ) : (
          <DarkModeRoundedIcon
            className="icon mode"
            titleAccess="Turn of the light"
          />
        )}
      </div>
    </>
  );
};

export default ToggleMode;
