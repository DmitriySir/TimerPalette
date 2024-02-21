import React from "react";
import { observer } from "mobx-react";
import colorStore from "../../store/colorStore";
import { CompactPicker } from "react-color";
import { FaTimes } from "react-icons/fa";
import "./Palette.css"

const Palette = observer(() => {
  const pickerRef = React.useRef(null);

  const handleClick = (event) => {
    if (!pickerRef.current || !pickerRef.current.contains(event.target)) {
      colorStore.setShowPicker(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleColorChange = (color) => {
    if (colorStore.selectedColor !== null) {
      const updatedColors = [...colorStore.colors];
      updatedColors[colorStore.selectedColor] = color.hex;
      colorStore.colors = updatedColors;
      colorStore.setSelectedColor(null);
    } else {
      colorStore.addColor(color.hex);
    }
    colorStore.setShowPicker(false);
  };

  const handleColorClick = (index) => {
    colorStore.setSelectedColor(index);
    colorStore.setShowPicker(true);
  };

  const handleDeleteColor = (event, index) => {
    event.stopPropagation();
    const updatedColors = colorStore.colors.filter((_, i) => i !== index);
    colorStore.colors = updatedColors;
  };

  return (
    <div className="palette__container"> {}
      <button onClick={() => handleColorClick(colorStore.colors.length)} className="button__rainbow">Добавить цвет</button>
      <div>
        {colorStore.selectedColor !== null && (
          <span
            className="selected__color"
            style={{ backgroundColor: colorStore.colors[colorStore.selectedColor] }}
            onClick={() => handleColorClick(colorStore.selectedColor)}
          >
            {colorStore.colors[colorStore.selectedColor]}
          </span>
        )}
      </div>
      {colorStore.showPicker && (
        <div ref={pickerRef}>
          <CompactPicker
            className="color__picker"
            color={colorStore.selectedColor !== null ? colorStore.colors[colorStore.selectedColor] : "#ffffff"}
            onChange={handleColorChange}
          />
        </div>
      )}

      <ul className="color__list"> {}
        {colorStore.colors.map((color, index) => (
          <li
            key={index}
            className="color__item"
            style={{ backgroundColor: color }}
            onClick={() => handleColorClick(index)}
            onMouseEnter={() => colorStore.setHoveredIndex(index)}
            onMouseLeave={() => colorStore.setHoveredIndex(null)}
          >
            {color}
            {colorStore.hoveredIndex === index && (
              <span className="delete__icon" onClick={(event) => handleDeleteColor(event, index)}>
                <FaTimes />
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Palette;