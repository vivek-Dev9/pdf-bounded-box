import React, { useState, useRef } from 'react';
import './App.css';

const data = [
  {
    "Text": 'Immaculate Prerna',
    "BoundingBox": {
      "Width": 0.20029661059379578,
      "Height": 0.02143627218902111,
      "Left": 0.16104663908481598,
      "Top": 0.29052969813346863
    }
  },
  {
    "Text": 'Reeves',
    "BoundingBox": {
      "Width": 0.07213091850280762,
      "Height": 0.019042914733290672,
      "Left": 0.4805578887462616,
      "Top": 0.2957749664783478
    }
  },
  {
    "Text": '757575757',
    "BoundingBox": {
      "Width": 0.1008882075548172,
      "Height": 0.011052663438022137,
      "Left": 0.6917912364006042,
      "Top": 0.3616999685764313
    }
  }
];

const App = () => {
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [selectedBox, setSelectedBox] = useState(null);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const [imageFile] = useState('/sample.jpg');

  const handleImageLoad = () => {
    if (imageRef.current) {
      const { width, height } = imageRef.current.getBoundingClientRect();
      setImageDimensions({ width, height });
    }
  };

  const handleTextClick = (box) => {
    setSelectedBox(box);
  };

  const zoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.1, 3));
  };

  const zoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 0.5));
  };

  const rotateImage = () => {
    setRotation((prevRotation) => (prevRotation + 90) % 360);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="app">
      
      <div className="image-container" ref={containerRef} style={{ position: 'relative' }}>
        <div className="controls">
        <button onClick={zoomIn}>+</button>
        <button onClick={zoomOut}>-</button>
        <span>{Math.round(scale * 100)}%</span>
        <button onClick={rotateImage}>⟳ Rotate</button>
        <button onClick={toggleFullscreen}>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</button>
      </div>
      <svg
  width="100%"
  height="auto"
  viewBox={`0 0 ${imageDimensions.width} ${imageDimensions.height}`}
  style={{
    transform: `scale(${scale}) rotate(${rotation}deg)`,
    transformOrigin: 'center',
  }}
>

  <image
    ref={imageRef}
    href={imageFile}
    alt="Document"
    onLoad={handleImageLoad}
    width="100%"
    height="100%"
    preserveAspectRatio="none"
  />

          {selectedBox && (
            <rect
              x={selectedBox.BoundingBox.Left * imageDimensions.width}
              y={selectedBox.BoundingBox.Top * imageDimensions.height}
              width={selectedBox.BoundingBox.Width * imageDimensions.width}
              height={selectedBox.BoundingBox.Height * imageDimensions.height}
              fill="none"
              stroke="red"
              strokeWidth="2"
            />
          )}
        </svg>
      </div>
      <div className="text-sidebar">
        {data.map((item, index) => (
          <div
            key={index}
            onClick={() => handleTextClick(item)}
            className="text-item"
          >
            {item.Text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
