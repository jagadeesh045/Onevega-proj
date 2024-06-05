import React, { useEffect, useState } from 'react';

const MySingleComponent = () => {
  const [boardsData, setBoardsData] = useState({ boards: [] });
  const [promptsData, setPromptsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBoardsData = async () => {
      try {
        const response = await fetch('https://demo6396395.mockable.io/bcf-boards');
        if (!response.ok) {
          throw new Error(`Error fetching boards data: ${response.statusText}`);
        }
        const data = await response.json();
        setBoardsData(data);
      } catch (error) {
        console.error('Boards Data Fetch Error:', error);
        setError(error.message);
      }
    };

    const fetchPromptsData = async () => {
      try {
        const response = await fetch('https://demo6396395.mockable.io/prompts');
        if (!response.ok) {
          throw new Error(`Error fetching prompts data: ${response.statusText}`);
        }
        const data = await response.json();
        setPromptsData(data);
      } catch (error) {
        console.error('Prompts Data Fetch Error:', error);
        setError(error.message);
      }
    };

    const fetchData = async () => {
      try {
        await Promise.all([fetchBoardsData(), fetchPromptsData()]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Fetched Data:</h1>
      <div>
        <h2>Boards</h2>
        <ul>
          {boardsData.boards.map((board) => (
            <li key={board.id}>
              <strong>{board.name}</strong>
              <ul>
                {board.bcfs?.map((bcf) => (
                  <li key={bcf.id}>
                    <strong>{bcf.name}</strong>
                    <ul>
                      {bcf.bcfBoards?.map((bcfBoard) => (
                        <li key={bcfBoard.id}>{bcfBoard.name}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Prompts</h2>
        <ul>
          {promptsData.map((prompt) => (
            <li key={prompt.id}>
              <strong>{prompt.name}</strong> - {new Date(prompt.createdAt).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MySingleComponent;
