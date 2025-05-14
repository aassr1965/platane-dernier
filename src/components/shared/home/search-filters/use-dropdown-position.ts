import { RefObject } from "react";
export const useDropdownPosition = (
  ref: RefObject<HTMLDivElement | null> | RefObject<HTMLElement>
) => {
  const getDropdownPosition = () => {
    if (!ref.current) return { top: 0, left: 0 };

    const rect = ref.current.getBoundingClientRect();
    const dropdownWidth = 240; // Width of dropdown (w-60 = 15rem = 240px)

    // Calculate the initial position
    let left = rect.left + window.scrollX;
    const top = rect.bottom + window.scrollY;

    // Check if the dropdown goes off the right side of the screen
    if (left + dropdownWidth > window.innerWidth) {
      // Align to right edge of button instead
      left = rect.right + window.scrollX - dropdownWidth;

      if (left < 0) {
        // Align to left edge of button instead
        left = window.innerWidth - dropdownWidth - 16;
      }
    }
    // Check if the dropdown goes off the left side of the screen
    if (left < 0) {
      left = 16; // Align to left edge of screen
    }
    return { top, left };
  };
  return { getDropdownPosition };
};
