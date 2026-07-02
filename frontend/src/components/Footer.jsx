import React from "react";
import { assets } from "../assets/assets";

function Footer() {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm ">
        <div className="">
          <img src={assets.nova_icon} alt="Logo" className="mb-5 w-32" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quisquam
            incidunt repellendus ipsa veniam cumque ad, nemo hic voluptates
            temporibus laborum dolorum ullam non amet? Odio laudantium, sit at
            facere reprehenderit numquam eius eum enim voluptatibus perferendis
            nihil esse debitis eos excepturi ipsam, atque quidem, mollitia
            aliquam sed voluptatum? Ipsa.
          </p>
        </div>
        <div className="">
          <p className="text-xl mb-5 font-medium">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="">
          <p className="text-xl mb-5 font-medium">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+1-212-456-7890</li>
            <li>contact@forever.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2026@ forever.com - All Right Reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
