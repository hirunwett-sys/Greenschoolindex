'use client';

import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Legend,
    Tooltip,
} from 'recharts';
import { JSX } from 'react';

interface RadarChartComponentProps {
    data: {
        dimension: string;
        score: number;
        fullMark: number;
    }[];
}

interface TooltipPayload { value: number; payload: { dimension: string } }
const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) => {
    if (active && payload && payload.length) {
        return (
        <div className="bg-white px-4 py-3 rounded-lg shadow-xl border-2 border-primary/20">
            <p className="font-display font-semibold text-gray-900 mb-1">
            {payload[0].payload.dimension}
            </p>
            <p className="font-body text-primary text-lg font-bold">
            {payload[0].value}%
            </p>
        </div>
        );
    }
    return null;
};

const CustomLabel = ({ x, y, textAnchor, radius, payload }: { x: number; y: number; textAnchor: 'start' | 'middle' | 'end' | 'inherit'; radius: number; payload: { value: string } }) => {
    return (
        <g className="recharts-layer recharts-polar-angle-axis-tick">
        <text
            radius={radius}
            stroke="none"
            x={x}
            y={y}
            className="recharts-text recharts-polar-angle-axis-tick-value"
            textAnchor={textAnchor}
        >
            <tspan
            x={x}
            dy="0.355em"
            className="font-display font-semibold"
            fill="#1f2937"
            fontSize="14"
            >
            {payload.value}
            </tspan>
        </text>
        </g>
    );
    };

    export default function RadarChartComponent({
    data,
    }: RadarChartComponentProps): JSX.Element {
    return (
        <div className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
            {/* Grid with gradient effect */}
            <defs>
                <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#039a8a" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#007a6d" stopOpacity={0.3} />
                </linearGradient>
                
                {/* Glow effect */}
                <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
                </filter>
            </defs>

            {/* Multi-layer grid for depth */}
            <PolarGrid 
                stroke="#007a6d" 
                strokeOpacity={0.15}
                strokeWidth={1.5}
            />
            
            {/* Angle axis with custom labels */}
            <PolarAngleAxis
                dataKey="dimension"
                tick={CustomLabel}
                tickLine={false}
            />
            
            {/* Radius axis with percentage labels */}
            <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ 
                fill: '#9ca3af', 
                fontSize: 11,
                fontWeight: 600
                }}
                tickCount={6}
                axisLine={{ stroke: '#d1d5db', strokeWidth: 1 }}
            />

            {/* Main radar area */}
            <Radar
                name="คะแนน"
                dataKey="score"
                stroke="#007a6d"
                strokeWidth={3}
                fill="url(#radarGradient)"
                fillOpacity={0.6}
                filter="url(#glow)"
                dot={{
                r: 6,
                fill: '#007a6d',
                stroke: '#fff',
                strokeWidth: 2,
                }}
                activeDot={{
                r: 8,
                fill: '#039a8a',
                stroke: '#fff',
                strokeWidth: 3,
                }}
            />

            {/* Tooltip */}
            <Tooltip content={<CustomTooltip />} />

            {/* Legend with custom styling */}
            <Legend
                wrapperStyle={{
                paddingTop: '30px',
                fontSize: '14px',
                fontWeight: 600,
                fontFamily: 'inherit',
                }}
                iconType="circle"
                iconSize={10}
            />
            </RadarChart>
        </ResponsiveContainer>

        {/* Score indicators below chart */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {data.map((item, index) => {
            const getScoreColor = (score: number) => {
                if (score >= 80) return 'from-green-500 to-emerald-600';
                if (score >= 60) return 'from-lime-500 to-green-600';
                if (score >= 40) return 'from-yellow-500 to-orange-500';
                if (score >= 20) return 'from-orange-500 to-red-500';
                return 'from-red-500 to-rose-600';
            };

            return (
                <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-3 border-2 border-gray-100 hover:border-primary/30 hover:shadow-md transition-all duration-300"
                >
                <div className="flex items-center justify-between mb-2">
                    <span className="font-body text-xs text-gray-600 truncate pr-1">
                    {item.dimension}
                    </span>
                    <div
                    className={`w-2 h-2 rounded-full bg-gradient-to-br ${getScoreColor(
                        item.score
                    )}`}
                    ></div>
                </div>
                <div className="flex items-baseline">
                    <span className="font-display text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {item.score}
                    </span>
                    <span className="font-body text-xs text-gray-500 ml-1">%</span>
                </div>
                {/* Mini progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div
                    className={`bg-gradient-to-r ${getScoreColor(
                        item.score
                    )} h-1.5 rounded-full transition-all duration-1000`}
                    style={{ width: `${item.score}%` }}
                    ></div>
                </div>
                </div>
            );
            })}
        </div>
        </div>
    );
}