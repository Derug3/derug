import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useContext, useEffect, useRef } from "react";
import { mapRecentActivities } from "../../api/graphql/mapper";
import { RECENT_ACTIVITIES_QUERY } from "../../api/graphql/query";
import { TENSOR_LIST_FILTER } from "../../common/constants";
import { CollectionContext } from "../../stores/collectionContext";
import { fetchWhileHasActivities } from "../../utilities/nft-fetching";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";
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
      console.log(recentActivities.map((ra) => ra.price));

      myChart = new Chart(chartContext!, {
        type: "line",
        data: {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
          ],
          datasets: [
            {
              label: "My Dataset",
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
              min: 0,
              max: 0.7,
            },
          },
        },
      });
      return () => {
        myChart.destroy();
      };
    }
  }, [recentActivities]);

  const [firstActivities, {}] = useLazyQuery(RECENT_ACTIVITIES_QUERY, {
    variables: {
      filter: {
        txType: TENSOR_LIST_FILTER,
      },
      limit: 100,
      slug: collection?.symbol,
    },
  });

  useEffect(() => {
    if (!recentActivities || recentActivities.length === 0) {
      void fetchFirstActivities();
    }
  }, []);

  const fetchFirstActivities = async () => {
    try {
      const firstBatchOfListings = await firstActivities({
        variables: {
          limit: 100,
          slug: collection?.symbol,
          filter: {
            txType: TENSOR_LIST_FILTER,
          },
        },
      });
      retrieveAllRecentListings(firstBatchOfListings);
    } catch (error) {
      console.log(error);
    }
  };

  const retrieveAllRecentListings = async (firstBatch: any) => {
    try {
      const collectionRecentListings = await fetchWhileHasActivities(
        mapRecentActivities(firstBatch.data),
        firstBatch.data.recentTransactions.page.endCursor.txKey,
        collection!.symbol,
        firstBatch.data.recentTransactions.page.endCursor.txAt
      );

      setRecentActivities(collectionRecentListings);
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
