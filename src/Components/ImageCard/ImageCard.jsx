const ImageCard = ({ image, handleSelect, isSelected, images }) => {

  const {id, imageURL} = image;
  const colSpan = images[0].id === id ? 'lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:row-end-3' : '';
  const inputCheckedClass = isSelected.includes(id.toString()) ? 'opacity-100' : 'bg-black opacity-0';
  const imageCheckedClass = isSelected.includes(id.toString()) ? 'opacity-50' : 'opacity-100';

  return (

      <div className={`relative border-2 rounded-2xl ${colSpan}`} draggable>
        <img className={`rounded-2xl ${imageCheckedClass}`} src={imageURL} alt="" />
        <div className={`absolute rounded-2xl ${inputCheckedClass} hover:opacity-50 inset-0  opacity-0  transition-opacity duration-300`}>
          <input className='absolute z-10 left-5 top-5' type="checkbox" value={id} onChange={handleSelect} name="" id="" />
          <div className=" absolute z-0  inset-0 "></div>
        </div>       
      </div>

  );
};

export default ImageCard;
