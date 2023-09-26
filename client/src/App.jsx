import { useEffect, useState } from "react";
import SearchResult from "./components/SearchResults/SearchResult";
import "./App.css";

export const BASE_URL = "http://localhost:9000";

const App = () => {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);

      try {
        const response = await fetch(BASE_URL);

        const json = await response.json();

        setData(json);
        setFilteredData(json);
        setLoading(false);
      } catch (error) {
        setError("Unable to fetch data");
      }
    };
    fetchFoodData();
  }, []);

  const searchFood = (e) => {
    const searchValue = e.target.value;

    console.log(searchValue);

    if (searchValue === "") {
      setFilteredData(null);
    }

    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filter);
  };

  const filterFood = (type) => {
    if (type === "all") {
      setFilteredData(data);
      setSelectedBtn("all");
      return;
    }

    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filter);
    setSelectedBtn(type);
  };

  const filterBtns = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];

  if (error) return <div>{error}</div>;
  if (loading) return <div>loading.....</div>;

  return (
    <>
      <div className="Container">
        <section className="TopContainer">
          <div className="logo">
          <img src={process.env.PUBLIC_URL + "/logo.svg"} alt="logo" />
          </div>

          <div className="search">
            <input onChange={searchFood} placeholder="Search Food" />
          </div>
        </section>

        <section className="FilterContainer">
          {filterBtns.map((value) => (
            <button
              className={`Button ${selectedBtn === value.type ? "isSelected" : ""}`}
              key={value.name}
              onClick={() => filterFood(value.type)}
            >
              {value.name}
            </button>
          ))}
        </section>
      </div>
      <SearchResult data={filteredData} />
    </>
  );
};

export default App;
