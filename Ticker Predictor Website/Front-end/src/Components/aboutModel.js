import React, { useState } from 'react';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';

const AboutModel = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Function to toggle collapse state
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className='mt-4 mb-4 pb-1 pl-4 bg-[#06061d] rounded-lg'>
      <div className="flex justify-between items-center cursor-pointer" onClick={toggleCollapse}>
        <h1 className='text-[#e6e7ec] leading-[34px] font-bold px-7 p-1'>
          About Model
        </h1>
        {/* Arrow icon */}
        <span className="px-7 p-4 text-[#e6e7ec]">
          {isCollapsed ? <IoChevronDown size={20} /> : <IoChevronUp size={20} />}
        </span>
      </div>

      {/* Collapsible content with animation */}
      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isCollapsed ? 'max-h-0' : 'max-h-screen'}`}>
        <p className='text-[#e6e7ec] px-7 p-4' style={{ textAlign: 'justify' }}>
          R² value (Coefficient of Determination) measures the proportion of variance in the dependent variable that is predictable from the independent variables. It ranges from 0 to 1, where 1 indicates a perfect fit, meaning the model explains all the variability in the target variable, while 0 means the model does not explain any variability. A higher R² value suggests a better fit of the model to the data.
        </p>
        <p className='text-[#e6e7ec] px-7 p-4' style={{ textAlign: 'justify' }}>
          MSE (Mean Squared Error) quantifies the average squared difference between the actual and predicted values. A lower MSE indicates that the model's predictions are closer to the true values, making it a critical metric for regression tasks. The square in MSE emphasizes larger errors, penalizing models that have large prediction deviations.
        </p>
        <p className='text-[#e6e7ec] px-7 p-4' style={{ textAlign: 'justify' }}>
          Precision is primarily used in classification tasks and measures the proportion of true positive predictions out of all positive predictions made by the model. High precision means that the model is very accurate when it predicts a positive instance, though it may miss some positives (false negatives). In essence, precision focuses on the reliability of the positive predictions made by the model.
        </p>
        <div className='grid grid-cols-3 gap-[30px] mt-[25px] pb-[15px]'>
          <p className='text-[#e6e7ec] px-7 p-4' style={{ textAlign: 'justify' }}>R2 - Value <p className='text-[35px]'>0.9749</p></p>
          <p className='text-[#e6e7ec] px-7 p-4' style={{ textAlign: 'justify' }}>MSE Value <p className='text-[35px]'>0.0011</p></p>
          <p className='text-[#e6e7ec] px-7 p-4' style={{ textAlign: 'justify' }}>Precision <p className='text-[35px]'>0.9927</p></p>
        </div>
      </div>
    </div>
  );
};

export default AboutModel;
