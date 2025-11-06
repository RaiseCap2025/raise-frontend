import React, { useEffect, useState } from 'react';
import { QueryAPI } from '../../api/endpoints/snowflakeQuery.api';
import { Box, Typography, TextField, Button } from '@mui/material';
import GenericChart from '../../components/ui/GenericChart/GenericChart';
import dayjs from 'dayjs';
import Loader from '../../components/common/Loader/Loader';

interface CostData {
  startTime: string;
  computePoolName: string;
  estimatedCost: number;
}

const CostCalculator: React.FC = () => {
  const [data, setData] = useState<CostData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>(
    dayjs().subtract(7, 'day').format('YYYY-MM-DD')
  );
  const [endDate, setEndDate] = useState<string>(dayjs().format('YYYY-MM-DD'));

  const fetchData = async () => {
    setLoading(true);
    try {
      const sqlQuery = `
        SELECT
          APPLICATION_NAME,
          COMPUTE_POOL_NAME,
          START_TIME,
          SUM(CREDITS_USED) AS COMPUTE_CREDITS,
          SUM(CREDITS_USED) * 2 AS ESTIMATED_COST
        FROM SNOWFLAKE.ACCOUNT_USAGE.SNOWPARK_CONTAINER_SERVICES_HISTORY
        WHERE START_TIME >= '${startDate}' AND START_TIME <= '${endDate}'
        GROUP BY APPLICATION_NAME, COMPUTE_POOL_NAME, START_TIME
        ORDER BY START_TIME
      `;

      const payload = {
        timeout: 60,
        warehouse: 'SNOW_CAP_SPC',
        database: 'SNOW_CAPGE_SPC',
        schema: 'SNOW_CAP_RAISE',
        statement: sqlQuery,
      };

      const response = await QueryAPI.query(JSON.stringify(payload));
      const rows: string[][] = response.data?.data || [];
      const columns = response.data?.resultSetMetaData?.rowType || [];

      const startTimeIndex = columns.findIndex((col: { name: string; }) => col.name === 'START_TIME');
      const poolNameIndex = columns.findIndex((col: { name: string; }) => col.name === 'COMPUTE_POOL_NAME');
      const costIndex = columns.findIndex((col: { name: string; }) => col.name === 'ESTIMATED_COST');

      const formatted = rows.map(row => {
        const timestamp = new Date(parseInt(row[startTimeIndex], 10) * 1000)
          .toISOString()
          .split('T')[0];
        return {
          startTime: timestamp,
          computePoolName: row[poolNameIndex],
          estimatedCost: parseFloat(row[costIndex]),
        };
      });

      setData(formatted);
    } catch (error) {
      console.error('Error fetching cost data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Group data by date for chart
  const poolNames = Array.from(new Set(data.map(d => d.computePoolName)));
  const groupedData: { [date: string]: { [pool: string]: number } } = {};

  data.forEach(d => {
    if (!groupedData[d.startTime]) {
      groupedData[d.startTime] = {};
    }
    groupedData[d.startTime][d.computePoolName] = d.estimatedCost;
  });

  const chartData = Object.entries(groupedData).map(([date, pools]) => ({
    startTime: date,
    ...pools,
  }));

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Cost Calculator Dashboard
      </Typography>

      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="contained" onClick={fetchData}>
          Refresh
        </Button>
      </Box>

      {loading ? (
        <Loader message="Loading Data..." /> 
      ) : (
        <>

          <GenericChart
            data={chartData}
            xKey="startTime"
            yKeys={poolNames}
            chartType="bar" // Options: line, stackedLine, area, stackedArea, bar, stackedBar, pie
            colors={['#8884d8', '#82ca9d', '#ffc658']}
            xAxisLabel="Date"
            yAxisLabel="Estimated Cost ($)"
            axisLabelStyle={{ fontSize: 16, fill: '#444', fontWeight: 'bold' }}
          />
          <br />
          <br />
          <GenericChart
            data={chartData}
            xKey="startTime"
            yKeys={poolNames}
            chartType="line"
            colors={['#8884d8', '#82ca9d', '#ffc658']}
            xAxisLabel="Date"
            yAxisLabel="Estimated Cost ($)"
            axisLabelStyle={{ fontSize: 16, fill: '#444', fontWeight: 'bold' }}
          />
        </>
      )}
    </Box>
  );
};

export default CostCalculator;