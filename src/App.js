// MySingleComponent.js
import React, { useEffect, useState } from 'react';

const MySingleComponent = () => {
  const [data, setData] = useState({ boards: [] });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://demo6396395.mockable.io/bcf-boards'
      );
      const fetchedData = await response.json();
      setData(fetchedData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Fetched Data:</h1>
      <ul>
        {data.boards.map((board, index) => (
          <li key={index}>
            <strong>{board.name}</strong>
            <ul>
              {board.bcfs &&
                board.bcfs.map((bcf, bcfIndex) => (
                  <li key={bcfIndex}>
                    <strong>{bcf.name}</strong>
                    <ul>
                      {bcf.bcfBoards &&
                        bcf.bcfBoards.map((bcfBoard, bcfBoardIndex) => (
                          <li key={bcfBoardIndex}>{bcfBoard.name}</li>
                        ))}
                    </ul>
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MySingleComponent;
