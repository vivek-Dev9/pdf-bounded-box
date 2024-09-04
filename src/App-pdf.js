import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './App.css';

// Set the worker path to the CDN URL
pdfjs.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

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
  const [numPages, setNumPages] = useState(null);
  const [pageDimensions, setPageDimensions] = useState({});
  const [selectedBox, setSelectedBox] = useState(null);
  const [pdfFile] = useState('/sample.pdf'); // Use a sample PDF path

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const onPageLoadSuccess = (page) => {
    const { width, height } = page;
    setPageDimensions({ width, height });
  };

  const handleTextClick = (box) => {
    setSelectedBox(box);
  };

  return (
    <div className="app">
      <div className="pdf-container">
        <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              onLoadSuccess={onPageLoadSuccess}
            >
              {selectedBox && (
                <div
                  className="bounding-box"
                  style={{
                    position: 'absolute',
                    left: selectedBox.BoundingBox.Left * pageDimensions.width,
                    top: selectedBox.BoundingBox.Top * pageDimensions.height,
                    width: selectedBox.BoundingBox.Width * pageDimensions.width,
                    height: selectedBox.BoundingBox.Height * pageDimensions.height,
                    border: '2px solid red',
                  }}
                />
              )}
            </Page>
          ))}
        </Document>
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
