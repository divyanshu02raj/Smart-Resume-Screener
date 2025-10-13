import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useTheme } from '../context/ThemeContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const ScoreDistributionChart = ({ results }) => {
    const { theme } = useTheme();

    const distribution = results.reduce((acc, result) => {
        const score = result.screeningResult.match_score;
        if (score >= 80) acc.topTier++;
        else if (score >= 50) acc.promising++;
        else acc.needsReview++;
        return acc;
    }, { topTier: 0, promising: 0, needsReview: 0 });

    const data = {
        labels: ['Top Tier (≥80)', 'Promising (50-79)', 'Needs Review (<50)'],
        datasets: [{
            data: [distribution.topTier, distribution.promising, distribution.needsReview],
            backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
            borderColor: theme === 'dark' ? '#161B22' : '#FFFFFF',
            borderWidth: 4,
            hoverOffset: 8,
        }],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: theme === 'dark' ? '#8b949e' : '#6B7280',
                    font: { size: 12 },
                    boxWidth: 15,
                    padding: 20,
                },
            },
        },
    };

    return (
        <div className="relative h-64">
            <Doughnut data={data} options={options} />
        </div>
    );
};

export default ScoreDistributionChart;