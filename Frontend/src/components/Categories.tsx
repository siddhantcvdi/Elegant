import living_room from "../assets/living_room.jpg";
import bed_room from "../assets/bed_room.jpg";
import kitchen from '../assets/kitchen.jpg'
import { NavLink } from "react-router-dom";

const Categories = () => {
  return (

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-sm:p-2 mt-5">
      <div className="flex flex-col items-start justify-center bg-white rounded-lg shadow-md p-3">
        <img
          src={living_room}
          alt="Living Room"
          className="w-full h-full mb-4 rounded-md object-cover"
        />
        <h2 className="text-xl font-bold text-gray-800">Living Room</h2>
        <NavLink to={'/bed-room'} className={'hover:underline underline-offset-2'}>Shop Now →</NavLink>

      </div>

      <div className="flex flex-col items-start justify-center bg-white rounded-lg shadow-md p-3">
        <img
          src={bed_room}
          alt="Bedroom"
          className="w-full h-full mb-4 rounded-md object-cover"
        />
        <h2 className="text-xl poppins-semibold text-gray-800">Bedroom</h2>
        <NavLink to={'/bed-room'} className={'hover:underline underline-offset-2'}>Shop Now →</NavLink>
      </div>

      {/* Kitchen */}
      <div className="flex flex-col items-start justify-center bg-white rounded-lg shadow-md p-3">
        <img
          src={kitchen}
          alt="Kitchen"
          className="w-full h-full mb-4 rounded-md object-cover"
        />
        <h2 className="text-xl font-bold text-gray-800">Kitchen</h2>
        <NavLink to={'/bed-room'} className={'hover:underline underline-offset-2'}>Shop Now →</NavLink>

      </div>
    </div>
  );
};

export default Categories;
