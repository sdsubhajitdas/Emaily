import { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export default function ThemeToggler() {
  let storedTheme = window.localStorage.getItem("theme");
  if (!storedTheme) {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    storedTheme = darkThemeMq.matches ? "dark" : "garden";
  }

  const [theme, setTheme] = useState(storedTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("class", theme);
  }, [theme]);

  function toggleTheme() {
    window.localStorage.setItem("theme", theme === "dark" ? "garden" : "dark");
    setTheme((previousTheme) => (previousTheme === "dark" ? "garden" : "dark"));
  }

  return (
    <div className="h-9 w-9 mx-3">
      {theme === "dark" ? (
        <SunIcon onClick={toggleTheme} />
      ) : (
        <MoonIcon onClick={toggleTheme} />
      )}
    </div>
  );
}
