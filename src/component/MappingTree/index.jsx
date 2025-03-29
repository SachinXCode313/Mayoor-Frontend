import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import axios from 'axios';

const MappingTree = () => {
  const [option, setOption] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      setUserData(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          Authorization: "Bearer YOUR_ACCESS_TOKEN",
          "Content-Type": "application/json",
          year: 2024,
          subject: 1,
        };
        console.log(userData.subjectName)
        console.log(userData.subject)
        const response = await axios.get('https://mayoor-server.vercel.app/api/mapping-tree',{headers});
        const rawData = response.data;

        const transformData = (data) => {
          return data.map((ro) => ({
            name: ro.ro_name,
            children: ro.learning_outcomes.map((lo) => ({
              name: lo.lo_name,
              children: lo.assessment_criteria.map((ac) => ({
                name: ac.ac_name,
              })),
            })),
          }));
        };

        const formattedData = transformData(rawData);

        setOption({
          tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove',
          },
          series: [
            {
              type: 'tree',
              data: formattedData,
              top: '1%',
              left: '7%',
              bottom: '1%',
              right: '20%',
              symbolSize: 7,
              label: {
                position: 'left',
                verticalAlign: 'middle',
                align: 'right',
                fontSize: 9,
              },
              leaves: {
                label: {
                  position: 'right',
                  verticalAlign: 'middle',
                  align: 'left',
                },
              },
              emphasis: {
                focus: 'descendant',
              },
              expandAndCollapse: true,
              animationDuration: 550,
              animationDurationUpdate: 750,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return option ? <ReactECharts option={option} style={{ height: '500px', width: '100%' }} /> : <p>Loading chart...</p>;
};

export default MappingTree;
