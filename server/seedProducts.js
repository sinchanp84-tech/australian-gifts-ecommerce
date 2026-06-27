const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");

    const products = [
      {
        name: "Wallet",
        price: 19.99,
        image: "/images/wallet.jpg",
        category: "Accessories",
        description: "Premium Australian leather wallet",
      },
      {
        name: "Tea Towel",
        price: 12.99,
        image: "/images/teatowel.jpg",
        category: "Home Decor",
        description: "Australian tea towel",
      },
      {
        name: "Australian Flag",
        price: 11.99,
        image: "/images/flag.jpg",
        category: "Souvenirs",
        description: "Australian national flag",
      },
      {
        name: "Coasters",
        price: 13.99,
        image: "/images/coasters.jpg",
        category: "Home Decor",
        description: "Wooden souvenir coasters",
      },
      {
        name: "Sydney Opera House Model",
        price: 21,
        image: "/images/operahouse.jpg",
        category: "Souvenirs",
        description: "Sydney Opera House miniature",
      },
      {
        name: "Kangaroo Plush Toy",
        price: 21,
        image: "/images/kangaroo_plush.jpg",
        category: "Souvenirs",
        description: "Soft kangaroo toy",
      },
      {
        name: "Boomerang",
        price: 18.99,
        image: "/images/boomerang.jpg",
        category: "Souvenirs",
        description: "Traditional Australian boomerang",
      },
      {
        name: "Mug",
        price: 14.99,
        image: "/images/mug.jpg",
        category: "Accessories",
        description: "Australian souvenir mug",
      },
      {
        name: "Keychain",
        price: 8.99,
        image: "/images/keychain.jpg",
        category: "Accessories",
        description: "Australian keychain",
      },
      {
        name: "Didgeridoo",
        price: 65,
        image: "/images/didgeridoo.jpg",
        category: "Aboriginal Art",
        description: "Traditional Aboriginal instrument",
      },
      {
        name: "Koala Plush",
        price: 22,
        image: "/images/koala.jpg",
        category: "Souvenirs",
        description: "Cute koala plush toy",
      },
      {
        name: "Magnet",
        price: 7.99,
        image: "/images/magnet.jpg",
        category: "Accessories",
        description: "Australian fridge magnet",
      },
      {
        name: "Cap",
        price: 16.99,
        image: "/images/cap.jpg",
        category: "Accessories",
        description: "Australian souvenir cap",
      },
      {
  name: "Aboriginal Art Painting",
  price: 49.99,
  image: "/images/aboriginal_painting.jpg",   // ✅ Correct
  category: "Aboriginal Art",
  description: "Beautiful Aboriginal artwork",
},
    ];

  // Delete all existing products
await Product.deleteMany({});

// Insert fresh products
await Product.insertMany(products);

    console.log("Products Added Successfully");
    process.exit();
  })
  .catch((err) => console.log(err));