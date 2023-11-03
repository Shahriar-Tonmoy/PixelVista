import { useEffect, useState } from "react";
import ImageCard from "../ImageCard/ImageCard";

const Home = () => {
    const [images, setImages] = useState([]);
    const [isSelected, setIsSelected] = useState([]);

    const handleSelect = (e) =>{
        // console.log(e.target.checked);
        // console.log(e.target.value);
        
        const {value, checked} =  e.target;
        
        
        checked ? setIsSelected([...isSelected,value]) : setIsSelected(isSelected.filter(id => id !== value))
      }
    
    const handleDelete = ()=>{
        setImages(images.filter(image => !isSelected.includes(image.id.toString())))
        setIsSelected([]);
    }
    
    useEffect(()=>{
        fetch('../../../public/images.json')
        .then(res => res.json())
        .then(data => setImages(data))
    },[])

    return (
        <div>
            <div className="flex justify-between mb-5">
                <div className="flex justify-center items-center gap-3">
                    <input type="checkbox" checked name="" id="" />
                    <p className="font-semibold">{isSelected.length} Files Selected</p>
                </div>
                <button onClick={handleDelete} className="text-red-500 font-semibold">Delete files</button>
            </div>
            <hr className="mb-10" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
                {
                    images.map(image => <ImageCard key={image.id} images={images} image={image}  isSelected={isSelected} handleSelect={handleSelect}></ImageCard>)
                }
            </div>
        </div>
    );
};

export default Home;