"use client";

import Header from "@/components/qa/Header";
import React, { useState, useEffect } from "react";

const page = () => {
  const [analyistData, setAnalyistData] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch data from /AI analyst
  useEffect(() => {
    const fetchAIAnalyst = async () => {
      try {
        const res = await axios.get("/ai-analyst");
        setAnalyistData(res.data);
        console.log("Fetched AI analyst:", res.data);
      } catch (err) {
        console.error("Error fetching AI analyst:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAIAnalyst();
  }, []);

  return (
    <div>
      <Header />
      <div className="flex justify-center items-center h-[80vh]">
        <h1 className="text-2xl font-bold">
          مرحبًا بك في صفحة محلل الذكاء الاصطناعي
        </h1>
      </div>
    </div>
  );
};

export default page;
