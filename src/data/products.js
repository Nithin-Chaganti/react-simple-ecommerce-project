import headphonesImage from "../assets/headphones.jpg";
import smartwatchImage from "../assets/smartwatch.webp";
import laptopStandImage from "../assets/laptop-stand.jpg";
import mechanicalKeyboardImage from "../assets/mechanical-keyboard.jpg";
import usbCHubImage from "../assets/usb-c-hub.jpg";
import wirelessMouseImage from "../assets/wireless-mouse.jpg";
import monitorStandImage from "../assets/monitor-stand.jpg";
import webcamImage from "../assets/hd-cam.jpg";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    image: headphonesImage,
    description:
      "Premium wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
  },

  {
    id: 2,
    name: "Smart Watch",
    price: 249.99,
    image: smartwatchImage,
    description:
      "Feature-rich smartwatch with fitness tracking, heart rate monitor, and smartphone notifications.",
  },

  {
    id: 3,
    name: "Laptop Stand",
    price: 49.99,
    image: laptopStandImage,
    description:
      "Ergonomic aluminum laptop stand that improves posture and workspace organization.",
  },

  {
    id: 4,
    name: "Mechanical Keyboard",
    price: 129.99,
    image: mechanicalKeyboardImage,
    description:
      "RGB backlit mechanical keyboard with tactile switches for gaming and productivity.",
  },

  {
    id: 5,
    name: "USB-C Hub",
    price: 39.99,
    image: usbCHubImage,
    description:
      "Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader.",
  },

  {
    id: 6,
    name: "Wireless Mouse",
    price: 29.99,
    image: wirelessMouseImage,
    description:
      "Ergonomic wireless mouse with precision tracking and long battery life.",
  },

  {
    id: 7,
    name: "Monitor Stand",
    price: 79.99,
    image: monitorStandImage,
    description:
      "Adjustable monitor stand for better posture and desk organization.",
  },

  {
    id: 8,
    name: "HD Webcam",
    price: 89.99,
    image: webcamImage,
    description:
      "1080p HD webcam with built-in microphone for meetings and streaming.",
  },

  
];

export function getProducts() {
  return products;
}

export function getProductById(id) {
  return products.find((p) => p.id === Number(id));
}