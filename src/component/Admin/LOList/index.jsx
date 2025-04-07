import React, { useState, useEffect } from 'react';
import Wrapper from './style';
import axios from 'axios';

const LOlist = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [loList, setLoList] = useState([]); // Store the full fetched list
  const [filteredLoList, setFilteredLoList] = useState([]); // Store the filtered list

  useEffect(() => {
    loadLO();
  }, []);

  const loadLO = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://mayoor-server.vercel.app/api/learning-outcome`, {
        headers: {
          Authorization: 'Bearer YOUR_ACCESS_TOKEN',
          'year': "2024",
          'classname': "1",
          'section': "1",
          'subject': "1",
          'quarter': "1",
        }
      });
      
      console.log('Fetched LO Data:', response.data); // Log API response
      setLoList(response.data); // Store the original data
      setFilteredLoList(response.data); // Set initially filtered data
    } catch (error) {
      console.error('Error fetching learning outcomes:', error);
    } finally {
      setLoading(false);
    }
  };

  // Search filtering (only filters the data without re-fetching)
  useEffect(() => {
    if (!searchQuery) {
      setFilteredLoList(loList);
    } else {
      const filteredData = loList.filter((item) =>
        item.lo_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLoList(filteredData);
    }
  }, [searchQuery, loList]);

  return (
    <Wrapper>
      <input
        type="text"
        placeholder="Search LO..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />
      <ul className="lo-list">
        {loading ? (
          <p>Loading...</p>
        ) : filteredLoList.length > 0 ? (
          filteredLoList.map((item) => (
            <li key={item.lo_id}>{item.lo_name}</li>
          ))
        ) : (
          <p>No Results Found</p>
        )}
      </ul>
    </Wrapper>
  );
};

export default LOlist;
