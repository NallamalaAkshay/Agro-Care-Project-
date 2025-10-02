import React, { useState } from "react";
import LanguageSelector from "./languageSelector"; // Import the LanguageSelector component

const Crop = () => {
  const [load, setLoad] = useState(false);
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");
  const [ph, setPh] = useState("");
  const [rain, setRain] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [prediction, setPrediction] = useState("");
  const [lang, setLang] = useState("en");

  function onSearchSubmit() {
    setLoad(true);
    let url = "https://icsi518ml.com/api/crop-recommendation/predict/";
    let body = JSON.stringify({
      Nitrogen: parseFloat(nitrogen),
      Phosphorous: parseFloat(phosphorus),
      Potassium: parseFloat(potassium),
      Temperature: parseFloat(temperature),
      Humidity: parseFloat(humidity),
      Ph: parseFloat(ph),
      Rainfall: parseFloat(rain),
      dest: lang, // Pass selected language to the API
    });

    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: body,
    })
      .then((response) => response.json())
      .then((data) => {
        setPrediction(data.prediction); // Update the prediction state with the response
        setLoad(false); // Set loading to false after response
      })
      .catch((error) => {
        console.log(error);
        setLoad(false); // Ensure loading is stopped even in case of an error
      });
  }

  return (
    <>
      <section className="">
        <div className="grid place-items-center">
          <div className="container bg-gray-100 p-10 grid place-items-center mt-14">
            <p className="text-2xl font-medium text-green-600 my-12">
              Predict the best crop to plant
              <br />
            </p>

            {/* Language Selector */}
            <div className="my-8 w-3/5">
              <LanguageSelector onLanguageSelect={setLang} />
            </div>

            <input
              onChange={(e) => setTemperature(e.target.value)}
              className="w-3/5 my-2 p-4 required"
              type="text"
              placeholder="Enter the Temperature"
            />
            <input
              onChange={(e) => setHumidity(e.target.value)}
              className="w-3/5 my-2 p-4 required"
              type="text"
              placeholder="Enter the value of Humidity"
            />
            <input
              onChange={(e) => setNitrogen(e.target.value)}
              className="w-3/5 my-2 p-4 required"
              type="text"
              placeholder="Enter the value of Nitrogen"
            />
            <input
              onChange={(e) => setPhosphorus(e.target.value)}
              className="w-3/5 my-2 p-4 required"
              type="text"
              placeholder="Enter the value of Phosphorus"
            />
            <input
              onChange={(e) => setPotassium(e.target.value)}
              className="w-3/5 my-2 p-4 required"
              type="text"
              placeholder="Enter the value of Potassium"
            />
            <input
              onChange={(e) => setPh(e.target.value)}
              className="w-3/5 my-2 p-4 required"
              type="text"
              placeholder="Enter the soil pH value (0-14)"
            />
            <input
              onChange={(e) => setRain(e.target.value)}
              className="w-3/5 my-2 p-4 required"
              type="text"
              placeholder="Enter the rainfall gauge (in mm)"
            />

            <div className="grid place-items-center mt-14">
              <button
                onClick={onSearchSubmit}
                type="button"
                className="inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Get Crop Recommendation
              </button>
            </div>
          </div>
        </div>

        {/* Loading or Prediction Result */}
        <div>
          {load ? (
            <div className="grid place-items-center my-14">loading</div>
          ) : (
            <></>
          )}
          {prediction && (
            <div className="grid place-items-center my-14 text-center">
              <p className="font-bold my-3">Crop Predicted:</p>
              {prediction}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Crop;
