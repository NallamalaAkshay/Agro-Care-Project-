import React, { useState } from "react";
import axios from "axios";
import LanguageSelector from "./languageSelector"; // Import LanguageSelector component

const Fertilizer = () => {
  const [load, setLoad] = useState(false);
  const [temperature, setTemperature] = useState("");
  const [soilType, setSoilType] = useState("");
  const [cropType, setCropType] = useState("");
  const [humidity, setHumidity] = useState("");
  const [moisture, setMoisture] = useState("");
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");

  const [prediction, setPrediction] = useState("");
  const [lang, setLang] = useState("en"); // Default language is English

  const fetchData = async () => {
    setLoad(true); // Start loading
    try {
      const result = await axios.post("https://icsi518ml.com/api/FRS/predict/", {
        data: {
          temperature: parseFloat(temperature),
          humidity: parseFloat(humidity),
          moisture: parseFloat(moisture),
          soil: soilType,
          crop: cropType,
          nitrogen: parseFloat(nitrogen),
          potassium: parseFloat(potassium),
          phosphorous: parseFloat(phosphorus),
        },
        dest: lang, // Language code
      });
      console.log(lang)

      // Update prediction state with the response
      setPrediction(result.data.Prediction || "No prediction received");
    } catch (error) {
      console.error("Error fetching data:", error);
      setPrediction("Error fetching data");
    } finally {
      setLoad(false); // Stop loading
    }
  };

  const onSearchSubmit = () => {
    if (!temperature || !humidity || !moisture || !soilType || !cropType) {
      alert("Please fill out all required fields.");
      return;
    }
    fetchData();
  };

  return (
    <>
      <section className="fertilizer-recommendation">
        <div className="grid place-items-center my-14">
          <div className="container bg-gray-100 p-10 grid place-items-center mt-14">
            <p className="text-2xl font-medium text-green-600 my-12">
              Predict the Fertilizer for your crop
            </p>

            {/* Language Selector */}
            <div className="my-8 w-3/5">
              <LanguageSelector onLanguageSelect={setLang} />
            </div>

            {/* Soil Type Selector */}
            <div className="flex flex-row my-2 w-3/5">
              <label className="mr-4">Select a Soil Type:</label>
              <select
                onChange={(e) => setSoilType(e.target.value)}
                className="border-2 border-green-600 p-2 rounded-sm w-64"
              >
                <option value="">Select Soil Type</option>
                <option value="Clayey">Clayey</option>
                <option value="Sandy">Sandy</option>
                <option value="Loamy">Loamy</option>
                <option value="Black">Black</option>
                <option value="Red">Red</option>
              </select>
            </div>

            {/* Crop Type Selector */}
            <div className="flex flex-row my-2 w-3/5">
              <label className="mr-4">Select a Crop Type:</label>
              <select
                onChange={(e) => setCropType(e.target.value)}
                className="border-2 border-green-600 p-2 rounded-sm w-64"
              >
                <option value="">Select Crop Type</option>
                <option value="Wheat">Wheat</option>
                <option value="Maize">Maize</option>
                <option value="Sugarcane">Sugarcane</option>
                <option value="Cotton">Cotton</option>
                <option value="Ground Nuts">Groundnut</option>
                <option value="Oil seeds">Oilseed</option>
                <option value="Tobacco">Tobacco</option>
                <option value="Millets">Millets</option>
                <option value="Pulses">Pulses</option>
                <option value="Barley">Barley</option>
                <option value="Paddy">Paddy</option>
              </select>
            </div>

            {/* Input Fields */}
            <input
              onChange={(e) => setMoisture(e.target.value)}
              className="w-3/5 my-2 p-4"
              type="text"
              placeholder="Enter moisture value"
            />
            <input
              onChange={(e) => setNitrogen(e.target.value)}
              className="w-3/5 my-2 p-4"
              type="text"
              placeholder="Enter nitrogen value"
            />
            <input
              onChange={(e) => setPhosphorus(e.target.value)}
              className="w-3/5 my-2 p-4"
              type="text"
              placeholder="Enter phosphorous value"
            />
            <input
              onChange={(e) => setPotassium(e.target.value)}
              className="w-3/5 my-2 p-4"
              type="text"
              placeholder="Enter potassium value"
            />
            <input
              onChange={(e) => setTemperature(e.target.value)}
              className="w-3/5 my-2 p-4"
              type="text"
              placeholder="Enter temperature"
            />
            <input
              onChange={(e) => setHumidity(e.target.value)}
              className="w-3/5 my-2 p-4"
              type="text"
              placeholder="Enter humidity"
            />


            {/* Submit Button */}
            <div className="grid place-items-center mt-14">
              <button
                onClick={onSearchSubmit}
                type="button"
                className="inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs uppercase rounded shadow-md hover:bg-blue-700 transition duration-150"
              >
                Get Fertilizer Recommendation
              </button>
            </div>
          </div>
        </div>

        {/* Loading and Prediction Display */}
        <div>
          {load ? (
            <div className="grid place-items-center my-14">Loading...</div>
          ) : prediction ? (
            <div className="grid place-items-center my-14 text-center">
              <p className="font-bold my-3">Fertilizer Predicted:</p>
              <strong className="border m-2 p-2">{prediction}</strong>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default Fertilizer;
