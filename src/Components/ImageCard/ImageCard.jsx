import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useRef, useState } from "react";

const ImageCard = ({ image, handleSelect, isSelected, images, isDragging }) => {
  const { id, imageURL } = image;
  const colSpan =
    images[0].id === id
      ? "lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:row-end-3"
      : "";
  const inputCheckedClass = isSelected.includes(id.toString())
    ? "opacity-100"
    : "bg-black opacity-0";
  const imageCheckedClass = isSelected.includes(id.toString())
    ? "opacity-50"
    : "opacity-100";

  //Drag
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };


  //handleSelect function
  // Create a ref to capture the checkbox element
  const checkboxRef = useRef(null);

  // Use a useEffect to attach the onChange handler to the checkbox
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.addEventListener("change", handleSelect);
    }

    // Cleanup the event listener when the component unmounts
    return () => {
      if (checkboxRef.current) {
        checkboxRef.current.removeEventListener("change", handleSelect);
      }
    };
  }, [handleSelect]);

  console.log(isDragging);

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`${isDragging ? '' : 'group'} relative border-2 rounded-2xl ${colSpan}`}
      draggable
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
          className="absolute z-10 left-5 top-5"
          type="checkbox"
          value={id}
          onChange={handleSelect}
          name=""
          id=""
        />
        <div className=" absolute z-0  inset-0 "></div>
      </div>
    </div>
  );
};

export default ImageCard;
