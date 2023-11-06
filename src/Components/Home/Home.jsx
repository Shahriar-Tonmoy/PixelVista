import React from "react";
import { useEffect, useState } from "react";
import ImageCard from "../ImageCard/ImageCard";
import {
  DndContext,
  closestCenter,
  TouchSensor,
  MouseSensor,
  useSensors,
  useSensor,
  rectIntersection,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

const Home = () => {
  const [images, setImages] = useState([]);
  const [isSelected, setIsSelected] = useState([]);

  /**
   * loading data from images.json file
   */
  useEffect(() => {
    fetch("./images.json")
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
      });
  }, []);

  /**
   * Function for making an array which will store the selected files to be deleted
   **/
  const handleSelect = (e) => {
    // console.log(e.target.checked);
    // console.log(e.target.value);

    const { value, checked } = e.target;

    checked
      ? setIsSelected([...isSelected, value])
      : setIsSelected(isSelected.filter((id) => id !== value));
  };

  /**
   *Function for deleting the selected files and set the new images array where the deleted (elements of isSelected array) are absent
   */
  const handleDelete = () => {
    setImages(
      images.filter((image) => !isSelected.includes(image.id.toString()))
    );
    setIsSelected([]);
  };

  //Drag

  /**
   * When dragging is finished the indexes are exchanged (between active element and over element) and set them to images
   */
  const onDragEnd = (e) => {
    const { active, over } = e;
    if (active.id === over.id) {
      return;
    }

    setImages((images) => {
      const oldIndex = images.findIndex((image) => image.id === active.id);
      const newIndex = images.findIndex((image) => image.id === over.id);
      return arrayMove(images, oldIndex, newIndex);
    });
  };

  //touch and mouse sensors
  const touchSensor = useSensor(TouchSensor);
  const mouseSensor = useSensor(MouseSensor);
  const sensors = useSensors(touchSensor, mouseSensor);

  return (
    <div>
      <div className="flex justify-between mb-5">
        <div className="flex justify-center items-center gap-3">
          {isSelected.length ? (
            <input type="checkbox" checked name="" id="" />
          ) : (
            ""
          )}
          <p className="font-bold text-xl">
            {isSelected.length ? (
              <p>{isSelected.length} Files Selected</p>
            ) : (
              <h1>Galley</h1>
            )}
          </p>
        </div>
        <button
          onClick={handleDelete}
          className="text-red-500 font-bold text-xl hover:underline"
        >
          {isSelected.length ? <p> Delete files</p> : ""}
        </button>
      </div>
      <hr className="mb-10" />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <SortableContext items={images} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 ">
            {images.map((image, index) => (
              <ImageCard
                key={image.id}
                index={index}
                image={image}
                isSelected={isSelected}
                handleSelect={handleSelect}
              ></ImageCard>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Home;
