import { useEffect, useState } from "react";
import ImageCard from "../ImageCard/ImageCard";
import React from "react";
import { DndContext, closestCenter,TouchSensor, closestCorners } from "@dnd-kit/core";
import { SortableContext, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable";

const Home = () => {
  const [images, setImages] = useState([]);
  const [isSelected, setIsSelected] = useState([]);

  const handleSelect = (e) => {
    // console.log(e.target.checked);
    // console.log(e.target.value);

    const { value, checked } = e.target;

    checked
      ? setIsSelected([...isSelected, value])
      : setIsSelected(isSelected.filter((id) => id !== value));
  };

  const handleDelete = () => {
    setImages(
      images.filter((image) => !isSelected.includes(image.id.toString()))
    );
    setIsSelected([]);
  };

  useEffect(() => {
    fetch("../../../public/images.json")
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
      })
  }, []);

  //Drag
  const [isDragging, setIsDragging] = useState(false);
  const onDragEnd = (e) => {
    const {active, over} = e;
    setIsDragging(false);
    if(active.id === over.id){
        return;
    }
    setImages((images) => {
        const oldIndex = images.findIndex((image) => image.id === active.id);
        const newIndex = images.findIndex((image) => image.id === over.id);
        return arrayMove(images, oldIndex, newIndex)
    })
  };
  const onDragStart = () => {
    setIsDragging(true);
  }
  

  return (
    <div>
      <div className="flex justify-between mb-5">
        <div className="flex justify-center items-center gap-3">
          <input type="checkbox" checked name="" id="" />
          <p className="font-semibold">{isSelected.length} Files Selected</p>
        </div>
        <button onClick={handleDelete} className="text-red-500 font-semibold hover:underline">
          Delete files
        </button>
      </div>
      <hr className="mb-10" />
      <DndContext  collisionDetection={closestCorners} onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <SortableContext items={images} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
            {images.map((image, index) => (
              <ImageCard
                key={image.id}
                index={index}
                images={images}
                image={image}
                isDragging={isDragging}
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
