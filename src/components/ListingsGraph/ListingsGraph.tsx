import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useContext, useEffect, useRef } from "react";
import { CollectionContext } from "../../stores/collectionContext";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";
import dayjs from "dayjs";
import { splitTimestamps } from "../../common/helpers";
import { getRecentActivities } from "../../api/tensor";
const ListingsGraph = () => {
  const { collection, setRecentActivities, recentActivities } =
    useContext(CollectionContext);

  const chartRef = useRef<HTMLCanvasElement | null>(null);
  let myChart: any = null;
  useEffect(() => {
    if (recentActivities) {
      if (myChart) {
        myChart.destroy();
      }
      Chart.register(
        CategoryScale,
        LineController,
        LineElement,
        PointElement,
        LinearScale,
        Title
      );

      const chartContext = chartRef.current!.getContext("2d");
      const sorted = recentActivities.sort((a, b) => a.price - b.price);
      myChart = new Chart(chartContext!, {
        type: "line",
        data: {
          labels: recentActivities.map((ra) =>
            dayjs.unix(ra.dateExecuted).toDate().getMonth()
          ),
          datasets: [
            {
              data: recentActivities?.map((ra) => ra.price),
              fill: false,
              borderColor: "rgb(9, 194, 246)",
              tension: 0.1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              min: sorted[0].price,
              max: sorted[sorted.length - 1].price * 2,
            },
          },
        },
      });
      return () => {
        myChart.destroy();
      };
    }
  }, [recentActivities]);

  useEffect(() => {
    if (!recentActivities || recentActivities.length === 0) {
      void fetchFirstActivities();
    }
  }, []);

  const fetchFirstActivities = async () => {
    try {
      if (collection?.symbol)
        setRecentActivities(await getRecentActivities(collection?.symbol));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {recentActivities && recentActivities.length > 0 ? (
        <canvas ref={chartRef} />
      ) : (
        <p>No listings data for collection</p>
      )}
    </>
  );
};

export default ListingsGraph;
