// import { addDoc, collection } from "firebase/firestore";
// import { useState } from "react";
// import { db } from "../../lib/Firebase";


// const UploadCars = () => {
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const cars = [
//     {
//       name: "Toyota Corolla",
//       brand: "Toyota",
//       category: "Sedan",
//       pricePerDay: 45,
//       seats: 5,
//       transmission: "Automatic",
//       fuel: "Petrol",
//       year: 2024,
//       image:
//         "https://images.unsplash.com/photo-1623869675781-80aa31012a5a",
//       description:
//         "A comfortable and reliable sedan, perfect for city driving and long-distance trips.",
//       available: true,
//     },

//     {
//       name: "Honda Civic",
//       brand: "Honda",
//       category: "Sedan",
//       pricePerDay: 55,
//       seats: 5,
//       transmission: "Automatic",
//       fuel: "Petrol",
//       year: 2024,
//       image:
//         "https://images.unsplash.com/photo-1552519507-da3b142c6e3d",
//       description:
//         "A stylish and comfortable sedan with excellent fuel economy and modern features.",
//       available: true,
//     },

//     {
//       name: "Toyota Camry",
//       brand: "Toyota",
//       category: "Sedan",
//       pricePerDay: 65,
//       seats: 5,
//       transmission: "Automatic",
//       fuel: "Petrol",
//       year: 2023,
//       image:
//         "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb",
//       description:
//         "A premium sedan offering a smooth ride, spacious interior, and excellent comfort.",
//       available: true,
//     },

//     {
//       name: "Honda Accord",
//       brand: "Honda",
//       category: "Sedan",
//       pricePerDay: 60,
//       seats: 5,
//       transmission: "Automatic",
//       fuel: "Petrol",
//       year: 2023,
//       image:
//         "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6",
//       description:
//         "A refined sedan with modern technology, comfortable seating, and strong performance.",
//       available: true,
//     },

//     {
//       name: "Toyota Yaris",
//       brand: "Toyota",
//       category: "Economy",
//       pricePerDay: 35,
//       seats: 5,
//       transmission: "Automatic",
//       fuel: "Petrol",
//       year: 2024,
//       image:
//         "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2",
//       description:
//         "An economical and compact car ideal for affordable city transportation.",
//       available: true,
//     },

//     {
//       name: "Suzuki Swift",
//       brand: "Suzuki",
//       category: "Economy",
//       pricePerDay: 30,
//       seats: 5,
//       transmission: "Automatic",
//       fuel: "Petrol",
//       year: 2024,
//       image:
//         "https://images.unsplash.com/photo-1542362567-b07e54358753",
//       description:
//         "A compact and fuel-efficient car that is easy to drive around busy city streets.",
//       available: true,
//     },

//     {
//       name: "Toyota Fortuner",
//       brand: "Toyota",
//       category: "SUV",
//       pricePerDay: 100,
//       seats: 7,
//       transmission: "Automatic",
//       fuel: "Diesel",
//       year: 2023,
//       image:
//         "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b",
//       description:
//         "A powerful seven-seat SUV suitable for families, road trips, and adventures.",
//       available: true,
//     },

//     {
//       name: "Toyota Land Cruiser",
//       brand: "Toyota",
//       category: "SUV",
//       pricePerDay: 180,
//       seats: 7,
//       transmission: "Automatic",
//       fuel: "Diesel",
//       year: 2023,
//       image:
//         "https://images.unsplash.com/photo-1594502184342-2e12f877aa73",
//       description:
//         "A luxurious and capable SUV designed for comfortable long journeys and off-road driving.",
//       available: true,
//     },

//     {
//       name: "Kia Sportage",
//       brand: "Kia",
//       category: "SUV",
//       pricePerDay: 75,
//       seats: 5,
//       transmission: "Automatic",
//       fuel: "Petrol",
//       year: 2024,
//       image:
//         "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6",
//       description:
//         "A modern SUV with a spacious cabin, advanced technology, and comfortable driving experience.",
//       available: true,
//     },

//     {
//       name: "Hyundai Tucson",
//       brand: "Hyundai",
//       category: "SUV",
//       pricePerDay: 70,
//       seats: 5,
//       transmission: "Automatic",
//       fuel: "Petrol",
//       year: 2024,
//       image:
//         "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6",
//       description:
//         "A practical and stylish SUV with excellent comfort and modern safety features.",
//       available: true,
//     },

//     {
//       name: "Hyundai Elantra",
//       brand: "Hyundai",
//       category: "Sedan",
//       pricePerDay: 50,
//       seats: 5,
//       transmission: "Automatic",
//       fuel: "Petrol",
//       year: 2024,
//       image:
//         "https://images.unsplash.com/photo-1619767886558-efdc259cde1a",
//       description:
//         "A modern sedan with excellent fuel economy, stylish design, and comfortable seating.",
//       available: true,
//     },

//     {
//       name: "Kia Picanto",
//       brand: "Kia",
//       category: "Economy",
//       pricePerDay: 32,
//       seats: 5,
//       transmission: "Automatic",
//       fuel: "Petrol",
//       year: 2023,
//       image:
//         "https://images.unsplash.com/photo-1502877338535-766e1452684a",
//       description:
//         "A small and economical city car perfect for short trips and everyday transportation.",
//       available: true,
//     },

//     {
//       name: "BMW 3 Series",
//       brand: "BMW",
//       category: "Luxury",
//       pricePerDay: 120,
//       seats: 5,
//       transmission: "Automatic",
//       fuel: "Petrol",
//       year: 2024,
//       image:
//         "https://images.unsplash.com/photo-1555215695-3004980ad54e",
//       description:
//         "A premium sedan offering luxury, performance, technology, and an exciting driving experience.",
//       available: true,
//     },

//     {
//       name: "BMW 5 Series",
//       brand: "BMW",
//       category: "Luxury",
//       pricePerDay: 150,
//       seats: 5,
//       transmission: "Automatic",
//       fuel: "Petrol",
//       year: 2024,
//       image:
//         "https://images.unsplash.com/photo-1556189250-72ba954cfc2b",
//       description:
//         "A sophisticated luxury sedan designed for business trips and premium travel.",
//       available: true,
//     },

//     {
//       name: "BMW X5",
//       brand: "BMW",
//       category: "Luxury SUV",
//       pricePerDay: 170,
//       seats: 5,
//       transmission: "Automatic",
//       fuel: "Petrol",
//       year: 2024,
//       image:
//         "https://images.unsplash.com/photo-1551830820-330a71b99659",
//       description:
//         "A premium SUV combining powerful performance, luxury, technology, and spacious seating.",
//       available: true,
//     },

//     {
//       name: "Mercedes C-Class",
//       brand: "Mercedes",
//       category: "Luxury",
//       pricePerDay: 130,
//       seats: 5,
//       transmission: "Automatic",
//       fuel: "Petrol",
//       year: 2024,
//       image:
//         "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8",
//       description:
//         "A premium sedan offering elegant styling, advanced technology, and a comfortable interior.",
//       available: true,
//     },

//     {
//       name: "Mercedes E-Class",
//       brand: "Mercedes",
//       category: "Luxury",
//       pricePerDay: 160,
//       seats: 5,
//       transmission: "Automatic",
//       fuel: "Petrol",
//       year: 2024,
//       image:
//         "https://images.unsplash.com/photo-1563720223185-11003d516935",
//       description:
//         "A luxurious executive sedan providing exceptional comfort and refined performance.",
//       available: true,
//     },

//     {
//       name: "Mercedes GLE",
//       brand: "Mercedes",
//       category: "Luxury SUV",
//       pricePerDay: 190,
//       seats: 7,
//       transmission: "Automatic",
//       fuel: "Petrol",
//       year: 2023,
//       image:
//         "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2",
//       description:
//         "A spacious luxury SUV suitable for families, business travel, and long-distance journeys.",
//       available: true,
//     },

//     {
//       name: "Audi A4",
//       brand: "Audi",
//       category: "Luxury",
//       pricePerDay: 110,
//       seats: 5,
//       transmission: "Automatic",
//       fuel: "Petrol",
//       year: 2024,
//       image:
//         "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6",
//       description:
//         "A stylish premium sedan with excellent handling, comfort, and advanced technology.",
//       available: true,
//     },

//     {
//       name: "Audi Q7",
//       brand: "Audi",
//       category: "Luxury SUV",
//       pricePerDay: 180,
//       seats: 7,
//       transmission: "Automatic",
//       fuel: "Petrol",
//       year: 2023,
//       image:
//         "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6",
//       description:
//         "A spacious seven-seat luxury SUV designed for comfortable family and business travel.",
//       available: true,
//     },

//     {
//       name: "Ford Mustang",
//       brand: "Ford",
//       category: "Sports",
//       pricePerDay: 140,
//       seats: 4,
//       transmission: "Automatic",
//       fuel: "Petrol",
//       year: 2024,
//       image:
//         "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd",
//       description:
//         "An iconic sports car delivering powerful performance and classic American styling.",
//       available: true,
//     },

//     {
//       name: "Chevrolet Camaro",
//       brand: "Chevrolet",
//       category: "Sports",
//       pricePerDay: 135,
//       seats: 4,
//       transmission: "Automatic",
//       fuel: "Petrol",
//       year: 2023,
//       image:
//         "https://images.unsplash.com/photo-1552519507-da3b142c6e3d",
//       description:
//         "A powerful sports coupe with aggressive styling and an exciting driving experience.",
//       available: true,
//     },

//     {
//       name: "Porsche 911",
//       brand: "Porsche",
//       category: "Sports",
//       pricePerDay: 300,
//       seats: 2,
//       transmission: "Automatic",
//       fuel: "Petrol",
//       year: 2024,
//       image:
//         "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
//       description:
//         "A legendary sports car offering exceptional performance, precision, and luxury.",
//       available: true,
//     },

//     {
//       name: "Nissan Patrol",
//       brand: "Nissan",
//       category: "SUV",
//       pricePerDay: 150,
//       seats: 7,
//       transmission: "Automatic",
//       fuel: "Petrol",
//       year: 2023,
//       image:
//         "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b",
//       description:
//         "A large and powerful SUV offering excellent comfort, spacious seating, and strong performance.",
//       available: true,
//     },

//     {
//       name: "Nissan X-Trail",
//       brand: "Nissan",
//       category: "SUV",
//       pricePerDay: 70,
//       seats: 5,
//       transmission: "Automatic",
//       fuel: "Petrol",
//       year: 2024,
//       image:
//         "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6",
//       description:
//         "A practical family SUV with comfortable seating and excellent everyday usability.",
//       available: true,
//     },

//     {
//       name: "Tesla Model 3",
//       brand: "Tesla",
//       category: "Electric",
//       pricePerDay: 100,
//       seats: 5,
//       transmission: "Automatic",
//       fuel: "Electric",
//       year: 2024,
//       image:
//         "https://images.unsplash.com/photo-1560958089-b8a1929cea89",
//       description:
//         "A modern electric sedan offering excellent acceleration, technology, and a quiet driving experience.",
//       available: true,
//     },

//     {
//       name: "Tesla Model Y",
//       brand: "Tesla",
//       category: "Electric SUV",
//       pricePerDay: 120,
//       seats: 5,
//       transmission: "Automatic",
//       fuel: "Electric",
//       year: 2024,
//       image:
//         "https://images.unsplash.com/photo-1560958089-b8a1929cea89",
//       description:
//         "A practical electric SUV offering modern technology, spacious seating, and excellent performance.",
//       available: true,
//     },

//     {
//       name: "Range Rover Sport",
//       brand: "Land Rover",
//       category: "Luxury SUV",
//       pricePerDay: 220,
//       seats: 5,
//       transmission: "Automatic",
//       fuel: "Petrol",
//       year: 2023,
//       image:
//         "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf",
//       description:
//         "A premium SUV combining luxury, powerful performance, and excellent all-terrain capability.",
//       available: true,
//     },

//     {
//       name: "Jeep Wrangler",
//       brand: "Jeep",
//       category: "Off-Road",
//       pricePerDay: 125,
//       seats: 5,
//       transmission: "Automatic",
//       fuel: "Petrol",
//       year: 2023,
//       image:
//         "https://images.unsplash.com/photo-1542362567-b07e54358753",
//       description:
//         "A rugged off-road vehicle perfect for adventure trips and challenging terrain.",
//       available: true,
//     },

//     {
//       name: "Toyota Hiace",
//       brand: "Toyota",
//       category: "Van",
//       pricePerDay: 90,
//       seats: 12,
//       transmission: "Manual",
//       fuel: "Diesel",
//       year: 2023,
//       image:
//         "https://images.unsplash.com/photo-1570125909232-eb263c188f7e",
//       description:
//         "A spacious passenger van ideal for group travel, family trips, and transportation services.",
//       available: true,
//     },
//   ];

//   const uploadCars = async () => {
//     try {
//       setLoading(true);
//       setMessage("");

//       const carsCollection = collection(db, "cars");

//       for (const car of cars) {
//         await addDoc(carsCollection, car);
//       }

//       setMessage("30 rental cars uploaded successfully!");
//     } catch (error) {
//       console.error(error);
//       setMessage(`Error: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         flexDirection: "column",
//         gap: "20px",
//       }}
//     >
//       <h1>Upload Rental Cars</h1>

//       <button
//         onClick={uploadCars}
//         disabled={loading}
//         style={{
//           padding: "12px 25px",
//           fontSize: "16px",
//           border: "none",
//           borderRadius: "8px",
//           cursor: loading ? "not-allowed" : "pointer",
//         }}
//       >
//         {loading ? "Uploading..." : "Upload 30 Cars"}
//       </button>

//       {message && (
//         <p>
//           {message}
//         </p>
//       )}
//     </div>
//   );
// };

// export default UploadCars;



import { useState } from "react";

import {
  Box,
  Container,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Paper,
} from "@mui/material";

import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../lib/Firebase";


// =====================================================
// 30 DIFFERENT RENTAL CARS
// =====================================================

const cars = [
  {
    name: "Toyota Corolla",
    category: "Sedan",
    price: 50,
    year: 2024,
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "15 km/l",
    location: "Islamabad",
    available: true,
    image:
      "https://images.unsplash.com/photo-1623869675781-80aa31012a5a?auto=format&fit=crop&w=1200&q=80",
    description:
      "Toyota Corolla is a comfortable and reliable sedan that is perfect for city driving, family trips, and long journeys.",
  },

  {
    name: "Honda Civic",
    category: "Sedan",
    price: 60,
    year: 2024,
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "14 km/l",
    location: "Lahore",
    available: true,
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
    description:
      "Honda Civic offers a smooth driving experience, modern interior, and excellent comfort for everyday rental use.",
  },

  {
    name: "Toyota Camry",
    category: "Sedan",
    price: 75,
    year: 2023,
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "13 km/l",
    location: "Karachi",
    available: true,
    image:
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1200&q=80",
    description:
      "Toyota Camry is a premium sedan offering excellent comfort, spacious seating, and a smooth ride.",
  },

  {
    name: "Honda Accord",
    category: "Sedan",
    price: 70,
    year: 2023,
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "13 km/l",
    location: "Islamabad",
    available: true,
    image:
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=80",
    description:
      "Honda Accord is a stylish and spacious sedan suitable for business trips, family travel, and city driving.",
  },

  {
    name: "Nissan Altima",
    category: "Sedan",
    price: 55,
    year: 2023,
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "14 km/l",
    location: "Rawalpindi",
    available: true,
    image:
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80",
    description:
      "Nissan Altima provides a comfortable interior and dependable performance for daily rental journeys.",
  },

  {
    name: "Hyundai Elantra",
    category: "Sedan",
    price: 48,
    year: 2024,
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "16 km/l",
    location: "Peshawar",
    available: true,
    image:
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=80",
    description:
      "Hyundai Elantra is an economical and stylish sedan that is ideal for affordable daily car rental.",
  },

  {
    name: "Kia Sportage",
    category: "SUV",
    price: 80,
    year: 2024,
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "12 km/l",
    location: "Lahore",
    available: true,
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80",
    description:
      "Kia Sportage is a practical SUV with a spacious cabin and excellent comfort for family journeys.",
  },

  {
    name: "Hyundai Tucson",
    category: "SUV",
    price: 85,
    year: 2024,
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "12 km/l",
    location: "Islamabad",
    available: true,
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80",
    description:
      "Hyundai Tucson combines modern design, comfortable seating, and dependable performance for rental trips.",
  },

  {
    name: "Toyota RAV4",
    category: "SUV",
    price: 90,
    year: 2023,
    seats: 5,
    transmission: "Automatic",
    fuel: "Hybrid",
    mileage: "18 km/l",
    location: "Karachi",
    available: true,
    image:
      "https://images.unsplash.com/photo-1568844293986-8c8e6c1e8b5e?auto=format&fit=crop&w=1200&q=80",
    description:
      "Toyota RAV4 is a reliable SUV with good fuel economy and plenty of space for passengers and luggage.",
  },

  {
    name: "Honda CR-V",
    category: "SUV",
    price: 95,
    year: 2023,
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "13 km/l",
    location: "Islamabad",
    available: true,
    image:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
    description:
      "Honda CR-V offers a spacious interior, comfortable ride, and excellent practicality for family travel.",
  },

  {
    name: "Ford Explorer",
    category: "SUV",
    price: 110,
    year: 2023,
    seats: 7,
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "10 km/l",
    location: "Lahore",
    available: true,
    image:
      "https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=1200&q=80",
    description:
      "Ford Explorer is a large SUV with seven seats, making it a great choice for families and groups.",
  },

  {
    name: "Jeep Wrangler",
    category: "SUV",
    price: 130,
    year: 2023,
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "9 km/l",
    location: "Islamabad",
    available: true,
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
    description:
      "Jeep Wrangler is designed for adventure and offers strong performance for road trips and outdoor journeys.",
  },

  {
    name: "Toyota Land Cruiser",
    category: "SUV",
    price: 200,
    year: 2024,
    seats: 7,
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "8 km/l",
    location: "Islamabad",
    available: true,
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80",
    description:
      "Toyota Land Cruiser is a premium large SUV offering luxury, power, and excellent comfort for long journeys.",
  },

  {
    name: "BMW X5",
    category: "Luxury",
    price: 120,
    year: 2024,
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "10 km/l",
    location: "Lahore",
    available: true,
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
    description:
      "BMW X5 is a luxury SUV offering powerful performance, premium comfort, and advanced technology.",
  },

  {
    name: "BMW X3",
    category: "Luxury",
    price: 105,
    year: 2023,
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "11 km/l",
    location: "Karachi",
    available: true,
    image:
      "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=1200&q=80",
    description:
      "BMW X3 is a compact luxury SUV with a comfortable interior and sporty driving experience.",
  },

  {
    name: "Mercedes-Benz C-Class",
    category: "Luxury",
    price: 150,
    year: 2024,
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "11 km/l",
    location: "Islamabad",
    available: true,
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80",
    description:
      "Mercedes-Benz C-Class provides premium luxury, refined performance, and a comfortable driving experience.",
  },

  {
    name: "Mercedes-Benz E-Class",
    category: "Luxury",
    price: 175,
    year: 2024,
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "10 km/l",
    location: "Lahore",
    available: true,
    image:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
    description:
      "Mercedes-Benz E-Class is a premium sedan designed for executive travel and luxury rental experiences.",
  },

  {
    name: "Mercedes-Benz G-Class",
    category: "Luxury",
    price: 220,
    year: 2023,
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "7 km/l",
    location: "Islamabad",
    available: true,
    image:
      "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=1200&q=80",
    description:
      "Mercedes-Benz G-Class combines iconic design, luxury, and powerful SUV performance.",
  },

  {
    name: "Audi A6",
    category: "Luxury",
    price: 145,
    year: 2024,
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "11 km/l",
    location: "Karachi",
    available: true,
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80",
    description:
      "Audi A6 offers elegant styling, premium comfort, and smooth performance for business and personal trips.",
  },

  {
    name: "Audi Q7",
    category: "Luxury",
    price: 160,
    year: 2023,
    seats: 7,
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "9 km/l",
    location: "Lahore",
    available: true,
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
    description:
      "Audi Q7 is a spacious luxury SUV with seven seats and a premium interior.",
  },

  {
    name: "Lexus RX",
    category: "Luxury",
    price: 155,
    year: 2024,
    seats: 5,
    transmission: "Automatic",
    fuel: "Hybrid",
    mileage: "17 km/l",
    location: "Islamabad",
    available: true,
    image:
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=80",
    description:
      "Lexus RX delivers a quiet and comfortable luxury driving experience with excellent hybrid efficiency.",
  },

  {
    name: "Porsche 911",
    category: "Sports",
    price: 200,
    year: 2024,
    seats: 2,
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "8 km/l",
    location: "Islamabad",
    available: true,
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    description:
      "Porsche 911 is a high-performance sports car offering an exciting driving experience.",
  },

  {
    name: "Porsche Cayenne",
    category: "Sports",
    price: 190,
    year: 2023,
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "9 km/l",
    location: "Lahore",
    available: true,
    image:
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=80",
    description:
      "Porsche Cayenne combines sports-car performance with SUV comfort and practicality.",
  },

  {
    name: "Ford Mustang",
    category: "Sports",
    price: 140,
    year: 2023,
    seats: 4,
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "9 km/l",
    location: "Karachi",
    available: true,
    image:
      "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80",
    description:
      "Ford Mustang is an iconic sports car with powerful performance and an exciting driving experience.",
  },

  {
    name: "Chevrolet Camaro",
    category: "Sports",
    price: 135,
    year: 2023,
    seats: 4,
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "9 km/l",
    location: "Lahore",
    available: true,
    image:
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=80",
    description:
      "Chevrolet Camaro is a sporty coupe with strong performance and an attractive design.",
  },

  {
    name: "Audi R8",
    category: "Sports",
    price: 250,
    year: 2022,
    seats: 2,
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "7 km/l",
    location: "Islamabad",
    available: true,
    image:
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80",
    description:
      "Audi R8 is a premium performance car designed for an unforgettable driving experience.",
  },

  {
    name: "Lamborghini Huracan",
    category: "Sports",
    price: 350,
    year: 2022,
    seats: 2,
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "6 km/l",
    location: "Islamabad",
    available: true,
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1200&q=80",
    description:
      "Lamborghini Huracan is an exotic supercar with outstanding performance and aggressive styling.",
  },

  {
    name: "Ferrari 488",
    category: "Sports",
    price: 400,
    year: 2021,
    seats: 2,
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "6 km/l",
    location: "Lahore",
    available: true,
    image:
      "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1200&q=80",
    description:
      "Ferrari 488 is a high-performance Italian sports car offering exceptional speed and luxury.",
  },

  {
    name: "McLaren 720S",
    category: "Sports",
    price: 450,
    year: 2022,
    seats: 2,
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "6 km/l",
    location: "Karachi",
    available: true,
    image:
      "https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=1200&q=80",
    description:
      "McLaren 720S is an exotic supercar with incredible acceleration and advanced performance technology.",
  },

  {
    name: "Tesla Model 3",
    category: "Electric",
    price: 100,
    year: 2024,
    seats: 5,
    transmission: "Automatic",
    fuel: "Electric",
    mileage: "450 km range",
    location: "Islamabad",
    available: true,
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80",
    description:
      "Tesla Model 3 is an efficient electric sedan with modern technology, excellent acceleration, and a comfortable interior.",
  },

  {
    name: "Tesla Model S",
    category: "Electric",
    price: 140,
    year: 2023,
    seats: 5,
    transmission: "Automatic",
    fuel: "Electric",
    mileage: "550 km range",
    location: "Lahore",
    available: true,
    image:
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80",
    description:
      "Tesla Model S is a premium electric sedan offering long range, high performance, and advanced technology.",
  },
];


// =====================================================
// UPLOAD COMPONENT
// =====================================================

function UploadCars() {
  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");


  // ===================================================
  // UPLOAD ALL CARS
  // ===================================================

  const uploadCars = async () => {
    setLoading(true);

    setMessage("");

    setError("");

    try {
      const carsRef =
        collection(db, "cars");


      // Upload every car

      for (const car of cars) {
        await addDoc(carsRef, {
          ...car,

          createdAt:
            serverTimestamp(),
        });
      }


      setMessage(
        `${cars.length} cars uploaded successfully!`
      );
    } catch (error) {
      console.error(
        "Upload cars error:",
        error
      );

      setError(
        error.message ||
          "Failed to upload cars."
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <Box
      sx={{
        minHeight: "100vh",

        backgroundColor:
          "#f8fafc",

        py: {
          xs: 5,
          md: 8,
        },
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: {
              xs: 3,
              md: 5,
            },

            borderRadius: 3,

            textAlign: "center",
          }}
        >

          {/* =========================
              TITLE
          ========================= */}

          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,

              color: "#111827",

              mb: 2,
            }}
          >
            Upload Cars
          </Typography>


          {/* =========================
              DESCRIPTION
          ========================= */}

          <Typography
            sx={{
              color: "#6b7280",

              mb: 4,
            }}
          >
            Upload 30 different rental
            cars to your Firestore
            cars collection.
          </Typography>


          {/* =========================
              SUCCESS MESSAGE
          ========================= */}

          {message && (
            <Alert
              severity="success"
              sx={{
                mb: 3,

                textAlign: "left",
              }}
            >
              {message}
            </Alert>
          )}


          {/* =========================
              ERROR MESSAGE
          ========================= */}

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,

                textAlign: "left",
              }}
            >
              {error}
            </Alert>
          )}


          {/* =========================
              CAR COUNT
          ========================= */}

          <Box
            sx={{
              mb: 3,

              p: 2,

              backgroundColor:
                "#f3f4f6",

              borderRadius: 2,
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,

                color: "#111827",
              }}
            >
              {cars.length} Cars Ready
            </Typography>
          </Box>


          {/* =========================
              UPLOAD BUTTON
          ========================= */}

          <Button
            fullWidth
            variant="contained"
            onClick={uploadCars}
            disabled={loading}
            sx={{
              py: 1.5,

              backgroundColor:
                "#111827",

              textTransform:
                "none",

              fontWeight: 700,

              fontSize: "1rem",

              borderRadius: 2,

              "&:hover": {
                backgroundColor:
                  "#374151",
              },
            }}
          >
            {loading ? (
              <>
                <CircularProgress
                  size={22}
                  color="inherit"
                  sx={{
                    mr: 1,
                  }}
                />

                Uploading...
              </>
            ) : (
              `Upload ${cars.length} Cars`
            )}
          </Button>

        </Paper>
      </Container>
    </Box>
  );
}

export default UploadCars;