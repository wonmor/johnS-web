'use client'

import { SetStateAction, useState } from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export default function Photography() {
  const [selectedService, setSelectedService] = useState("wedding");

  const handleServiceChange = (option: { value: SetStateAction<string>; }) => {
    setSelectedService(option.value);
    console.log("changed");
  };

  const getServiceContent = () => {
    let content = null;
    let price = "";

    if (selectedService === "wedding") {
      content = <img src="recapitulate.jpg" alt="Recapitulate" width="800" height="533" />;
      price = "$500";
    } else if (selectedService === "graduation") {
      content = (
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/kXdBd7LIEE8"
          title="Graduation Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      );
      price = "$250";
    } else if (selectedService === "people") {
      content = <img src="people.jpg" alt="People" width="800" height="600" />;
      price = "$150";
    }

    return { content, price };
  };

  const options = [
    { value: 'wedding', label: 'Wedding' },
    { value: 'graduation', label: 'Graduation' },
    { value: 'people', label: 'People' }
  ];

  return (
    <div className="m-10 flex justify-center items-center">
      <div className="w-1/2">
        <p className="text-2xl mb-10">
          With incomparable quality, I offer a wide range of photography services.
          <br />
          <br />
          <span className="text-lg font-light">From weddings to portraits, I do it all.</span>
        </p>
        <Dropdown
          options={options}
          value={selectedService}
          onChange={handleServiceChange}
          placeholder="Select a service"
        />
        {selectedService && (
          <div>
            <p className="text-lg font-light my-5">
              {selectedService.charAt(0).toUpperCase() + selectedService.slice(1)} photo: 
              <span className="inline-block ml-2 px-3 py-1 bg-gray-800 text-white rounded-lg">
                {getServiceContent().price}
              </span>
            </p>
            <div className="service-content">{getServiceContent().content}</div>
          </div>
        )}
        <p className="text-lg font-light mt-4">
          For purchases, please contact me at <a className="text-blue-200 hover:underline" href="mailto:johnseong@havit.space">johnseong@havit.space</a>.
        </p>
      </div>
    </div>
  );
}
