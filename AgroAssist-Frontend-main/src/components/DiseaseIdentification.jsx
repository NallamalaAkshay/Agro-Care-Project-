import React, { useState } from "react";
import LanguageSelector from "./languageSelector"; // Import the LanguageSelector component

const DiseaseIdentification = () => {
  const [photo, setPhoto] = useState(null); // Initialize as null
  const [load, setLoad] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [lang, setLang] = useState("en"); // Default language is English

  const url = "https://icsi518ml.com/api/DIS/predict/";

  const onClick = () => {
    if (!photo) {
      alert("Please upload an image before submitting.");
      return;
    }

    let form = new FormData();
    form.append("file", photo);
    form.append("dest", lang); // Append selected language to the form data

    setLoad(true);
    fetch(url, {
      method: "POST",
      body: form,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPrediction(data.prediction || "No prediction received");
        setLoad(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoad(false);
      });
  };

  const handleTakePhoto = async () => {
    try {
      const videoStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
  
      const videoElement = document.createElement("video");
      videoElement.srcObject = videoStream;
      videoElement.play();
  
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
  
      const capturePhoto = () => {
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
  
        canvas.toBlob((blob) => {
          setPhoto(new File([blob], "photo.jpg", { type: "image/jpeg" }));
          closeModal(); // Close modal after capturing photo
        }, "image/jpeg");
      };
  
      const closeModal = () => {
        videoStream.getTracks().forEach((track) => track.stop()); // Stop the video stream
        document.body.removeChild(modal);
      };
  
      const modal = document.createElement("div");
      modal.classList.add(
        "fixed",
        "inset-0",
        "bg-black",
        "bg-opacity-50",
        "flex",
        "justify-center",
        "items-center"
      );
      modal.innerHTML = `
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <video class="w-full rounded mb-4"></video>
          <div class="flex justify-between space-x-4">
            <button id="capture-btn" class="px-4 py-2 bg-green-500 text-white rounded">Capture</button>
            <button id="close-btn" class="px-4 py-2 bg-red-500 text-white rounded">Close</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
  
      const videoContainer = modal.querySelector("video");
      videoContainer.srcObject = videoStream;
      videoContainer.play();
  
      const captureBtn = modal.querySelector("#capture-btn");
      captureBtn.addEventListener("click", capturePhoto);
  
      const closeBtn = modal.querySelector("#close-btn");
      closeBtn.addEventListener("click", closeModal);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };
  

  return (
    <>
      <section className="disease-identification">
        <div className="grid place-items-center">
          <div className="container bg-gray-100 p-10 grid place-items-center mt-14">
            <p className="text-2xl font-medium text-green-600 my-12">
              Upload or Take a Photo to Get Disease Prediction
            </p>

            {/* Language Selector */}
            <div className="my-8 w-3/5">
              <LanguageSelector onLanguageSelect={setLang} />
            </div>

            {/* File Input */}
            <p className="font-medium text-lg">Choose Image:</p>
            <div className="m-6 flex space-x-4">
              <button
                onClick={handleTakePhoto}
                className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
              >
                Take Photo
              </button>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setPhoto(file);
                }}
                className="px-4 py-2 bg-gray-200 rounded shadow hover:bg-gray-300"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={onClick}
              type="button"
              className="inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs uppercase rounded shadow-md hover:bg-blue-700 transition duration-150"
            >
              Predict Disease
            </button>

            {/* Uploaded Image Preview */}
            {photo && (
              <>
                <p className="font-medium mt-6">Selected Image:</p>
                <img
                  src={URL.createObjectURL(photo)}
                  alt="Uploaded preview"
                  className="my-4 max-w-xs rounded-md shadow"
                />
              </>
            )}
          </div>
        </div>

        {/* Loading or Prediction Result */}
        <div>
          {load ? (
            <div className="grid place-items-center my-14">
              <p className="text-xl font-medium text-gray-600">Processing...</p>
            </div>
          ) : prediction ? (
            <div className="grid place-items-center my-14 text-center">
              <p className="font-bold my-3 text-lg">Disease Predicted:</p>
              <p className="text-green-700 text-lg">{prediction}</p>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default DiseaseIdentification;
