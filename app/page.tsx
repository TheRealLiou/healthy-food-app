"use client";
import { useState } from "react";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import { Input } from "./input";
import { motion } from "framer-motion";
import { LucideSearch } from "lucide-react";

const restaurants = [
  {
    id: 1,
    name: "Green Bites",
    type: "Vegan",
    image: "https://via.placeholder.com/150",
    menu: [
      { name: "Vegan Salad", price: 8.99, description: "Fresh greens with organic toppings" },
      { name: "Tofu Wrap", price: 7.99, description: "Whole wheat wrap with marinated tofu" }
    ]
  },
  {
    id: 2,
    name: "Keto King",
    type: "Keto",
    image: "https://via.placeholder.com/150",
    menu: [
      { name: "Keto Chicken Bowl", price: 10.99, description: "Grilled chicken with avocado and greens" },
      { name: "Egg Muffins", price: 6.99, description: "Baked eggs with cheese and bacon" }
    ]
  },
  {
    id: 3,
    name: "Healthy Haven",
    type: "Gluten-Free",
    image: "https://via.placeholder.com/150",
    menu: [
      { name: "Quinoa Bowl", price: 9.99, description: "Quinoa, chickpeas, and veggies" },
      { name: "Gluten-Free Pancakes", price: 8.49, description: "Made with almond flour and honey" }
    ]
  }
];

export default function HealthyFoodApp() {
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cart, setCart] = useState([]);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const estimatedTime = Math.floor(Math.random() * (45 - 20 + 1)) + 20;

  const filteredRestaurants = restaurants.filter(
    (r) => (!selectedFilter || r.type === selectedFilter) && r.name.toLowerCase().includes(search.toLowerCase())
  );

 type MenuItem = {
  name: string;
  price: number;
  description: string;
};

const addToCart = (item: MenuItem) => {

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const handleCheckout = () => {
    setOrderConfirmed(true);
    setCart([]);
  };

  return (
    <div className="p-4">
      {!orderConfirmed ? (
        !selectedRestaurant ? (
          <>
            <div className="flex items-center gap-2 mb-4">
              <Input
                placeholder="Search restaurants..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />
              <LucideSearch className="w-6 h-6" />
            </div>

            <div className="flex gap-2 mb-4">
              {["Vegan", "Keto", "Gluten-Free", "Protein Snacks"].map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  onClick={() => setSelectedFilter(selectedFilter === filter ? null : filter)}
                >
                  {filter}
                </Button>
              ))}
            </div>

            <motion.div className="grid grid-cols-1 gap-4">
              {filteredRestaurants.map((restaurant) => (
                <Card key={restaurant.id} className="p-2 cursor-pointer" onClick={() => setSelectedRestaurant(restaurant)}>
                  <CardContent className="flex items-center gap-4">
                    <img src={restaurant.image} alt={restaurant.name} className="w-16 h-16 rounded-xl" />
                    <div>
                      <h2 className="text-lg font-semibold">{restaurant.name}</h2>
                      <p className="text-sm text-gray-500">{restaurant.type} Options</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </>
        ) : (
          <div>
            <Button onClick={() => setSelectedRestaurant(null)} className="mb-4">Back</Button>
            <h2 className="text-xl font-bold mb-4">{selectedRestaurant.name} - Menu</h2>
            <motion.div className="grid grid-cols-1 gap-4">
              {selectedRestaurant.menu.map((item, index) => (
                <Card key={index} className="p-2">
                  <CardContent>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                    <p className="text-sm font-bold">${item.price.toFixed(2)}</p>
                    <Button onClick={() => addToCart(item)} className="mt-2">Add to Cart</Button>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        )
      ) : (
        <div className="text-center p-4">
          <h2 className="text-2xl font-bold">Order Confirmed! 🎉</h2>
          <p className="text-lg mt-2">Estimated delivery time: {estimatedTime} minutes</p>
        </div>
      )}
    </div>
  );
}
