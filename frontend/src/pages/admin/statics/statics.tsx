import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  AreaChart,
  Area,
} from "recharts";

import { Card } from "@radix-ui/themes";
import { Icons } from "../components/icons";
import { STATS } from "../dumpData";
import { useEffect, useState } from "react";
import { PageHead } from "../components/PageHead";
import { staticsAPI } from "../../../services/admin/api";

const manwon = (v: number) =>
  v >= 10000 ? `${v / 10000}만` : v.toLocaleString("ko-KR");
const won = (v: number) => v.toLocaleString("ko-KR") + "원";

const MoneyTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "var(--color-background)",
        border: "1px solid var(--border)",
        borderRadius: 8,
        padding: "8px 12px",
        fontSize: 13,
      }}
    >
      <div style={{ color: "var(--muted)", marginBottom: 2 }}>{label}</div>
      <div style={{ fontWeight: 700 }}>{won(payload[0].value)}</div>
    </div>
  );
};

function ChartCard({
  title,
  sub,
  right,
  children,
  sql,
  style,
}: {
  title: string;
  sub?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  sql?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="card"
      style={{
        padding: 20,
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 4,
          gap: 12,
        }}
      >
        <div>
          <h3 style={{ margin: 0, fontSize: 15.5, fontWeight: 680 }}>
            {title}
          </h3>
          {sub && (
            <div
              style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 3 }}
            >
              {sub}
            </div>
          )}
        </div>
        {right}
      </div>
      {sql && (
        <div className="sqlchip" style={{ margin: "10px 0 4px" }}>
          <Icons.chart size={13} /> {sql}
        </div>
      )}
      <div style={{ marginTop: 14 }}>{children}</div>
    </div>
  );
}

const StaticsPage = () => {
  const [rangeData, setRangeData] = useState([])
  const [beanData, setBeanData] = useState([])
  const [topBean, setTopBean] = useState(null)

  useEffect(() => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const endDate = yesterday.toISOString().slice(0, 10);
    const start = new Date(yesterday);
    start.setDate(start.getDate() - 6);
    const startDate = start.toISOString().slice(0, 10);

    staticsAPI.getBeans().then((res) => {
      const beans = Array.isArray(res?.data) ? res.data : [];
      setBeanData(beans)
      setTopBean(beans[0] ?? null)
    })
    staticsAPI.getRange(startDate, endDate).then((res) => {
      setRangeData(Array.isArray(res?.data) ? res.data : [])
    })
  }, [])

  return (
    <div>
      <PageHead
        title="매출 통계"
        sub="원두별·일자별 매출을 집계합니다."
      />
      <Card>
        <ChartCard
          title="일별 매출 추이"
          sub="최근 7일 결제 합계 (어제 기준)"
          children={
            <ResponsiveContainer width="100%" height={236}>
              <AreaChart
                data={rangeData}
                margin={{ top: 6, right: 8, left: 4, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="gRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6b3e22" stopOpacity={0.28} />
                    <stop
                      offset="100%"
                      stopColor="#6b3e22"
                      stopOpacity={0.02}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  vertical={false}
                />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={{ stroke: "var(--border)" }}
                  interval={1}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  width={40}
                  tickFormatter={manwon}
                />
                <Tooltip content={<MoneyTooltip />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#6b3e22"
                  strokeWidth={2.4}
                  fill="url(#gRev)"
                  dot={false}
                  activeDot={{ r: 4 }}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          }
        />

        <ChartCard
          style={{ marginTop: 16 }}
          title="원두별 매출 통계"
          sub={topBean ? `1위 ${topBean.name} · ${won(topBean.revenue)}` : ""}
          children={
            <ResponsiveContainer
              width="100%"
              height={Math.max(220, beanData.length * 38)}
            >
              <BarChart
                data={beanData}
                layout="vertical"
                margin={{ top: 0, right: 56, left: 8, bottom: 0 }}
                barCategoryGap={10}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  tickFormatter={manwon}
                  tickLine={false}
                  axisLine={{ stroke: "var(--border)" }}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={132}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12.5, fill: "var(--text-2)" }}
                />
                <Tooltip
                  content={<MoneyTooltip />}
                  cursor={{ fill: "rgba(107,62,34,.05)" }}
                />
                <Bar
                  dataKey="revenue"
                  radius={[0, 6, 6, 0]}
                  barSize={20}
                  isAnimationActive={false}
                >
                  {beanData?.length >0 && beanData?.map((b) => (
                    <Cell key={b.name} fill={b.color || "#6b3e22"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          }
        />
      </Card>
    </div>
  );
};

export default StaticsPage;
