const AboutModel = () => {
  return (
    <div className="text-[#e6e7ec] text-sm">
      <h1 className="font-bold mb-2">About Model</h1>

      <p className="mb-2 text-justify">
        R² value measures how well the model explains variability (0 to 1).
      </p>

      <p className="mb-2 text-justify">
        MSE measures prediction error. Lower is better.
      </p>

      <p className="mb-3 text-justify">
        Precision measures accuracy of positive predictions.
      </p>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div>
          <p className="text-xs">R²</p>
          <p className="text-lg font-semibold">0.9749</p>
        </div>
        <div>
          <p className="text-xs">MSE</p>
          <p className="text-lg font-semibold">0.0011</p>
        </div>
        <div>
          <p className="text-xs">Precision</p>
          <p className="text-lg font-semibold">0.9927</p>
        </div>
      </div>
    </div>
  );
};

export default AboutModel;