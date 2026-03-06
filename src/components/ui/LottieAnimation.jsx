import React from 'react';
import Lottie from 'lottie-react';

const LottieAnimation = ({ 
  animationData, 
  loop = true, 
  autoplay = true, 
  className = "w-full h-full",
  style = {} 
}) => {
  if (!animationData) return null;

  return (
    <div className={className} style={style}>
      <Lottie 
        animationData={animationData} 
        loop={loop} 
        autoplay={autoplay}
      />
    </div>
  );
};

export default LottieAnimation;
