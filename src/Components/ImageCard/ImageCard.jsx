import React from "react";
import PropTypes from "prop-types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useRef } from "react";

const ImageCard = ({ image, index, handleSelect, isSelected }) => {
  const { id, imageURL } = image;

  /***Conditioned Classes */
  var colSpan = index === 0 ? " row-span-2 col-span-2" : "col-span-1";

  //when checkbox is checked then selected element will be changed, these two variables have been used to do it
  const inputCheckedClass = isSelected.includes(id.toString())
    ? "opacity-100"
    : "bg-black opacity-0";
  const imageCheckedClass = isSelected.includes(id.toString())
    ? "opacity-50"
    : "opacity-100";

  //Drag
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: isDragging ? "grabbing" : "grab",
  };

  /**
   * handleSelect function(dnd kit {...listeners} events were interrupt with internal events, using useRef solved that issue)
   */
  const checkboxRef = useRef(null);
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.addEventListener("change", handleSelect);
    }

    return () => {
      if (checkboxRef.current) {
        checkboxRef.current.removeEventListener("change", handleSelect);
      }
    };
  }, [handleSelect]);

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`${
        isDragging ? "" : "group"
      } relative  border-2 rounded-2xl ${colSpan} `}
    >
      <img
        className={`rounded-2xl ${imageCheckedClass}`}
        src={imageURL}
        alt=""
      />
      <div
        className={`absolute rounded-2xl ${inputCheckedClass} group-hover:opacity-50   inset-0  opacity-0  transition-opacity duration-300`}
      >
        <input
          ref={checkboxRef}
          className="absolute z-10 left-5 top-5 h-5 w-5 "
          type="checkbox"
          value={id}
          onChange={handleSelect}
          name=""
          id=""
        />
        <div className="  z-0  inset-0 "></div>
      </div>
    </div>
  );
};

ImageCard.propTypes = {
  image: PropTypes.object,
  handleSelect: PropTypes.func,
  isSelected: PropTypes.array,
  images: PropTypes.array,
  index: PropTypes.any,
};

export default ImageCard;
