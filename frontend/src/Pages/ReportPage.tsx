import { useEffect, useState } from "react";
import { Container, Typography, Paper, Box } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { getVacations } from "../Services/vacationService";

/*
  Report Page (Admin Only)

  This page displays a vacations likes report using a bar chart.
  It is designed to be:
  - clear
  - readable
  - visually clean
  - aligned with the project requirements
*/
function ReportPage() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  /*
    Load vacations and prepare chart data.

    We sort by likes descending so the most popular vacations
    appear first in the chart.
  */
  const loadData = async () => {
    const vacations = await getVacations();

    const formatted = vacations
      .map((v: any) => ({
        name: v.destination,
        likes: v.likes,
      }))
      .sort((a: any, b: any) => b.likes - a.likes);

    setData(formatted);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f8fbff 0%, #eef6fb 100%)",
        py: 5,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          sx={{
            p: 4,
            borderRadius: 4,
            boxShadow: 3,
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{
              mb: 4,
              fontWeight: 800,
              color: "#17324d",
            }}
          >
            Vacations Popularity Report
          </Typography>

          <ResponsiveContainer width="100%" height={450}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 20, left: 10, bottom: 70 }}
            >
              {/* Background grid lines for easier reading */}
              <CartesianGrid strokeDasharray="3 3" />

              {/* X axis shows destination names */}
              <XAxis
                dataKey="name"
                angle={-25}
                textAnchor="end"
                interval={0}
                height={80}
              />

              {/* Y axis shows likes count */}
              <YAxis />

              {/* Tooltip shown on hover */}
              <Tooltip />

              {/* Bar color chosen to match the application's clean blue theme */}
              <Bar
                dataKey="likes"
                fill="#29b6f6"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Container>
    </Box>
  );
}

export default ReportPage;