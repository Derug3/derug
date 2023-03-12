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
import dayjs from "dayjs";
import { splitTimestamps } from "../../common/helpers";
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
      const recentAct = splitTimestamps(collectionRecentListings).map((ra) => {
        return ra.sort((a, b) => a.price - b.price)[0];
      });
      setRecentActivities(recentAct);
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
