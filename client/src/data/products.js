import boomerang from "../assets/images/boomerang.jpg";
import mug from "../assets/images/mug.jpg";
import keychain from "../assets/images/keychain.jpg";
import teatowel from "../assets/images/teatowel.jpg";

import aboriginalPainting from "../assets/images/aboriginal_painting.jpg";
import cap from "../assets/images/cap.jpg";
import coasters from "../assets/images/coasters.jpg";
import didgeridoo from "../assets/images/didgeridoo.jpg";
import flag from "../assets/images/flag.jpg";
import kangarooPlush from "../assets/images/kangaroo_plush.jpg";
import koala from "../assets/images/koala.jpg";
import magnet from "../assets/images/magnet.jpg";
import operahouse from "../assets/images/operahouse.jpg";
import wallet from "../assets/images/wallet.jpg";

const products = [
  {
    id: 1,
    name: "Boomerang",
    price: 25,
    image: boomerang,
    category: "Souvenirs",
    description:
      "Authentic Australian Boomerang souvenir made with traditional craftsmanship.",
    specifications: [
      "Handcrafted",
      "Australian Made",
      "Premium Wood",
      "Traditional Design",
    ],
    rating: 4.8,
    reviews: [
      {
        name: "John",
        comment: "Amazing quality product!",
      },
      {
        name: "Sarah",
        comment: "Perfect souvenir gift.",
      },
    ],
  },

  {
    id: 2,
    name: "Australian Mug",
    price: 18,
    image: mug,
    category: "Home Decor",
    description:
      "Premium ceramic mug featuring iconic Australian artwork.",
    specifications: [
      "Ceramic Material",
      "Dishwasher Safe",
      "Australian Design",
      "Premium Quality",
    ],
    rating: 4.6,
    reviews: [
      {
        name: "David",
        comment: "Very good quality mug.",
      },
      {
        name: "Emma",
        comment: "Beautiful design and finish.",
      },
    ],
  },

  {
    id: 3,
    name: "Kangaroo Keychain",
    price: 12,
    image: keychain,
    category: "Accessories",
    description:
      "Cute kangaroo keychain perfect as a souvenir or gift.",
    rating: 4.7,
    reviews: [
      {
        name: "Michael",
        comment: "Cute and lightweight.",
      },
    ],
  },

  {
    id: 4,
    name: "Tea Towel",
    price: 15,
    image: teatowel,
    category: "Home Decor",
    description:
      "Beautiful Australian themed tea towel for your kitchen.",
    rating: 4.5,
    reviews: [
      {
        name: "Olivia",
        comment: "Looks great in my kitchen.",
      },
    ],
  },

  {
    id: 5,
    name: "Didgeridoo",
    price: 65,
    image: didgeridoo,
    category: "Souvenirs",
    description:
      "Traditional Australian musical instrument handcrafted by artisans.",
    rating: 4.9,
    reviews: [
      {
        name: "James",
        comment: "Authentic and well made.",
      },
    ],
  },

  {
    id: 6,
    name: "Koala Plush Toy",
    price: 22,
    image: koala,
    category: "Accessories",
    description:
      "Soft and adorable koala plush toy loved by all ages.",
  },

  {
    id: 7,
    name: "Australian Flag",
    price: 20,
    image: flag,
    category: "Souvenirs",
    description:
      "High-quality Australian flag suitable for display and gifting.",
  },

  {
    id: 8,
    name: "Aboriginal Painting",
    price: 120,
    image: aboriginalPainting,
    category: "Aboriginal Art",
    description:
      "Handcrafted Aboriginal painting featuring traditional Australian indigenous art.",
  },

  {
    id: 9,
    name: "Sydney Opera House Model",
    price: 55,
    image: operahouse,
    category: "Souvenirs",
    description:
      "Detailed miniature model of Australia's famous Sydney Opera House.",
  },

  {
    id: 10,
    name: "Kangaroo Plush Toy",
    price: 28,
    image: kangarooPlush,
    category: "Accessories",
    description:
      "Cute kangaroo plush toy perfect for children and collectors.",
  },

  {
    id: 11,
    name: "Australian Cap",
    price: 24,
    image: cap,
    category: "Accessories",
    description:
      "Stylish Australian-themed cap for everyday wear.",
  },

  {
    id: 12,
    name: "Fridge Magnet",
    price: 10,
    image: magnet,
    category: "Souvenirs",
    description:
      "Colorful Australian souvenir magnet for your refrigerator.",
  },

  {
    id: 13,
    name: "Leather Wallet",
    price: 35,
    image: wallet,
    category: "Accessories",
    description:
      "Premium leather wallet with durable craftsmanship.",
  },

  {
    id: 14,
    name: "Wooden Coaster Set",
    price: 18,
    image: coasters,
    category: "Home Decor",
    description:
      "Elegant wooden coaster set perfect for home decoration.",
  },
];

export default products;