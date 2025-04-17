import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { TbArrowBackUp } from "react-icons/tb";
import axios from "axios";
import Wrapper from "./style";
import { useNavigate } from 'react-router'

const MappingTree = () => {
  const [option, setOption] = useState(null);
    const navigate = useNavigate()


  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");
    const userData = storedUserData ? JSON.parse(storedUserData) : null;

    console.log("Parsed userData:", userData); // Debugging to check if userData is properly loaded

    const fetchData = async () => {
      try {
        if (!userData) {
          console.log("User data not found in sessionStorage.");
          return; // Exit if userData is null
        }

        const headers = {
          Authorization: "Bearer YOUR_ACCESS_TOKEN",
          "Content-Type": "application/json",
          year: 2024,
          subject: userData.subject, // Ensure this field exists
        };

        const response = await axios.get(
          "https://mayoor-server.vercel.app/api/mapping-tree",
          { headers }
        );
        const rawData = response.data;

        // Transform data to include subject name as the root node
        const transformData = (data) => {
          if (!data || data.length === 0) {
            return [
              {
                id: "no_mapping",
                name: "No mapping found",
                children: [],
              },
            ];
          }

          return [
            {
              id: userData.subjectName || "Subject", // Use subjectName if available
              name: userData.subjectName || "Subject",
              children: data.map((ro) => ({
                id: ro.ro_id,
                name: ro.ro_name,
                children: ro.learning_outcomes.length
                  ? ro.learning_outcomes.map((lo) => ({
                    id: lo.lo_id,
                    name: lo.lo_name,
                    children: lo.assessment_criteria.length
                      ? lo.assessment_criteria.map((ac) => ({
                        id: ac.ac_id,
                        name: ac.ac_name,
                        children: [],
                      }))
                      : [{ id: "no_ac", name: "No assessment criteria found", children: [] }],
                  }))
                  : [{ id: "no_lo", name: "No learning outcomes found", children: [] }],
              })),
            },
          ];
        };


        const formattedData = transformData(rawData);

        setOption({
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove",
          },
          series: [
            {
              type: "tree",
              data: formattedData,
              top: "0%",
              left: "20%",
              bottom: "5%",
              right: "30%",
              nodePadding: 0,
              roam: true, // Zoom aur pan allow kar raha hai
              symbolSize: 14,
              bounding: "all", // Chart ko boundary ke andar limit karega
              scaleLimit: { min: 0.5, max: 2 }, // Zoom range set karta hai
              label: {
                position: "left",
                verticalAlign: "middle",
                align: "right",
                fontSize: 12,
                rich: {
                  root: {
                    backgroundColor: "#FF5722",
                    borderRadius: 6,
                    padding: [4, 8],
                    color: "#fff",
                    fontSize: 12,
                    textAlign: "center",
                    width: 100, // Set width to ensure wrapping
                    overflow: "break", // Ensure text wraps within the node
                  },
                  bg: {
                    backgroundColor: "#00796b",
                    borderRadius: 6,
                    padding: [4, 8],
                    color: "#fff",
                    fontSize: 12,
                    textAlign: "center",
                    wordWrap: "break-word"
                  },
                  leaf: {
                    backgroundColor: "#4CAF50",
                    borderRadius: 6,
                    padding: [4, 8],
                    color: "#fff",
                    fontSize: 12,
                    textAlign: "center",
                    wordWrap: "break-word"
                  },
                },
                formatter: (params) =>
                  params.data.id === "subject_english"
                    ? `{root|${params.name}}`
                    : `{bg|${params.name}}`,
              },
              leaves: {
                label: {
                  position: "right",
                  verticalAlign: "middle",
                  align: "left",
                  fontSize: 10,
                  textAlign: "center",
                  rich: {
                    leaf: {
                      backgroundColor: "#8ddca4",
                      borderRadius: 6,
                      padding: [4, 8],
                      color: "#333",
                      fontSize: 12,
                      textAlign: "center",
                      wordWrap: "break-word"
                    },
                  },
                  formatter: (params) => `{leaf|${params.name}}`,
                },
              },
              lineStyle: {
                width: 2,
                curveness: 0.5,
                color: "#555",
              },
              expandAndCollapse: true,
              animationDuration: 550,
              animationDurationUpdate: 750,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);



  return (
    <Wrapper>

      <div className="header">
        <div className="icon">
          <TbArrowBackUp size={30} onClick={() => navigate(-1)} />
        </div>
        <div className="title">
          <h2>Mapping Tree</h2>
        </div>
      </div>

      {option ? (
        <ReactECharts option={option} style={{ height: "700px", width: "100%" }} />
      ) : (
        <p>Loading chart...</p>
      )}
    </Wrapper>
  )
};

export default MappingTree;
