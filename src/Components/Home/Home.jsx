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
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

const Home = () => {
  const [images, setImages] = useState([]);
  const [isSelected, setIsSelected] = useState([]);
  const [activeId, setActiveId] = useState('');

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

  const dragImages = [
    "https://i.ibb.co/5smYqjc/image-1.webp",
    "https://i.ibb.co/vZ1PV93/image-2.webp",
    "https://i.ibb.co/Dk9Zd0x/image-3.webp",
    "https://i.ibb.co/Kwf9qy5/image-4.webp",
    "https://i.ibb.co/FwYNLBx/image-5.webp",
    "https://i.ibb.co/LpLk6tb/image-6.webp",
    "https://i.ibb.co/vj8DnTT/image-7.webp",
    "https://i.ibb.co/8PpYc0Q/image-8.webp",
    "https://i.ibb.co/t3Nzy8P/image-9.webp",
    "https://i.ibb.co/ZGjZpLq/image-10.jpg",
    "https://i.ibb.co/Mn5VdYm/image-11.jpg"
  ]

  /**
   * Function for making an array which will store the selected files to be deleted
   **/
  const handleSelect = (e) => {
    e.stopPropagation();
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
  function handleDragStart(e) {
    setActiveId(e.active.id);
  }
  
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
    setActiveId(null);
  };

  const handleDragCancel = (e) => {
    setActiveId(null)
    console.log(e);
  }

  //touch and mouse sensors
  const touchSensor = useSensor(TouchSensor);
  const mouseSensor = useSensor(MouseSensor);
  const sensors = useSensors(touchSensor, mouseSensor);

  //Overlay control
  const handleOverlay = (e) => {
    e.stopPropagation();
  }
  
  console.log(activeId-1);
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
              <h1>PixelVista</h1>
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
        onDragStart={handleDragStart}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={images} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-8 ">
            {images.map((image, index) => (
              <ImageCard
                key={image.id}
                activeId={activeId}
                index={index}
                image={image}
                isSelected={isSelected}
                handleSelect={handleSelect}
              ></ImageCard>
            ))}
          </div>
        </SortableContext>
        <DragOverlay adjustScale={true} className="z-40 pointer-events-none">
        {activeId ? (
            <div   className=" border-2 rounded-2xl pointer-events-none "><img src={dragImages[activeId-1]} alt="" className="rounded-2xl" /></div>

        ) : null}
      </DragOverlay>
        
      </DndContext>
    </div>
  );
};

export default Home;
