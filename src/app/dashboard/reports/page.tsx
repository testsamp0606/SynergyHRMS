"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { employeeGrowthData, diversityData } from "@/lib/data"
import { Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, LabelList } from "recharts"
import { Header } from "@/components/layout/header"

export default function ReportsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
       <Header title="Reports & Analytics" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
             <Card>
                <CardHeader>
                    <CardTitle>Turnover Rate</CardTitle>
                    <CardDescription>Quarterly employee turnover.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold">3.2%</p>
                    <p className="text-xs text-muted-foreground">-0.5% from last quarter</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Avg. Time to Hire</CardTitle>
                    <CardDescription>Average days to fill an open position.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold">28 Days</p>
                     <p className="text-xs text-muted-foreground">+2 days from last quarter</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Gender Diversity</CardTitle>
                    <CardDescription>Current male to female ratio.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold">55% / 45%</p>
                     <p className="text-xs text-muted-foreground">Male / Female</p>
                </CardContent>
            </Card>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Employee Growth</CardTitle>
              <CardDescription>Headcount over the last 6 months.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={employeeGrowthData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <ChartTooltip
                            cursor={{stroke: 'hsl(var(--accent))', strokeWidth: 2, strokeDasharray: "3 3"}}
                            content={<ChartTooltipContent />}
                        />
                        <Line type="monotone" dataKey="count" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: "hsl(var(--primary))" }} />
                    </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Workforce Diversity</CardTitle>
              <CardDescription>Breakdown of workforce demographics.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Pie data={diversityData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={2} >
                        <LabelList
                            dataKey="name"
                            className="fill-background"
                            stroke="none"
                            fontSize={12}
                        />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
