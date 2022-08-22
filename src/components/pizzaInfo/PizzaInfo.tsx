import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const PizzaInfo:React.FC = () => {
    const [pizzaValue, setPizzaValue] = React.useState<{
      imageUrl: string;
      title: string;
      price: number;
    }>();
  const { id } = useParams();
  const navigate = useNavigate()
  React.useEffect(() => {
    async function fetchPizzaInfo() {
        try {
            const { data } = await axios.get(
                `https://62c5bbc4a361f725128d123e.mockapi.io/items/${id}`
            );
            setPizzaValue(data);
        } catch (error) {
            alert("Піца не знайдена. Спробуйте пізніше.");
            navigate("/");
        }
      
    }
    fetchPizzaInfo();
  }, [id, navigate]);

  if(!pizzaValue){
    return <>Загрузка...</>
  }

  return pizzaValue && (
  <div className="container">
    <img src={pizzaValue.imageUrl} width="260px" alt='pizza'/>
    <h1>{pizzaValue.title}</h1>
    <h3>{pizzaValue.price} ₴</h3>
  </div>
  );
};

export default PizzaInfo;
