import { useState } from "react";
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
  Spinner,
  Center,
  createListCollection,
  Flex,
} from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { useColorModeValue } from "@/components/ui/color-mode";
import Card from "@/components/ui/Card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useDashboardData } from "@/api/hooks/useDashboardData";
import { useTranslation } from "react-i18next";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

export default function Dashboard() {
  const { t } = useTranslation();
  const { data: dashboardData, isLoading, error } = useDashboardData();
  const [selectedMetric, setSelectedMetric] = useState<
    "country" | "goal" | "source"
  >("country");

  const textColor = useColorModeValue("gray.700", "gray.200");

  const metricCollection = createListCollection({
    items: [
      { label: t("country"), value: "country" },
      { label: t("goal"), value: "goal" },
      { label: t("source"), value: "source" },
    ],
  });

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="100vh">
        <Text color="red.500">{t("dashboardPage.failedToLoad")}</Text>
      </Center>
    );
  }

  const data = dashboardData?.data;

  const getMetricData = () => {
    switch (selectedMetric) {
      case "country":
        return data?.countryDistribution || [];
      case "goal":
        return data?.goalDistribution || [];
      case "source":
        return data?.sourceDistribution || [];
      default:
        return [];
    }
  };

  const metricData = getMetricData();

  const cleanData = (data: any[]) =>
    data?.filter((item) => item._id !== "") || [];

  return (
    <Container maxW="container.xl" py={8}>
      <VStack gap={8} align="stretch">
        <Heading size="lg" color={textColor}>
          {t("menu.dashboard")}
        </Heading>

        <Card>
          <Box p={4}>
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
              <Heading size="md">
                {t("dashboardPage.distributionOverview")}
              </Heading>
              <Box w="200px">
                <SelectRoot
                  collection={metricCollection}
                  value={[selectedMetric]}
                  onValueChange={(e) => setSelectedMetric(e.value[0] as any)}
                >
                  <SelectTrigger>
                    <SelectValueText
                      placeholder={t("dashboardPage.selectMetric")}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {metricCollection.items.map((item) => (
                      <SelectItem item={item} key={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </Box>
            </Flex>
            <Box h="400px">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={cleanData(metricData)}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="_id" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </Card>

        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8}>
          <GridItem>
            <Card>
              <Box p={4} h="full">
                <Heading size="md" mb={4}>
                  {t("dashboardPage.genderDistribution")}
                </Heading>
                <Box h="300px">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={cleanData(data?.genderDistribution || [])}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={100}
                        fill="#8884d8"
                        paddingAngle={20}
                        dataKey="count"
                        nameKey="_id"
                        label
                      >
                        {cleanData(data?.genderDistribution || []).map(
                          (entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          )
                        )}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </Box>
            </Card>
          </GridItem>

          <GridItem>
            <Card>
              <Box p={4} h="full">
                <Heading size="md" mb={4}>
                  {t("dashboardPage.roleDistribution")}
                </Heading>
                <Box h="300px">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={cleanData(data?.roleDistribution || [])}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#82ca9d"
                        dataKey="count"
                        nameKey="_id"
                        label
                      >
                        {cleanData(data?.roleDistribution || []).map(
                          (entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          )
                        )}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </Box>
            </Card>
          </GridItem>
        </Grid>
      </VStack>
    </Container>
  );
}
