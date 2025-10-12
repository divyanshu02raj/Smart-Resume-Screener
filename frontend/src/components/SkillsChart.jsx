import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const SkillsChart = ({ skillsAnalysis }) => {
  if (!skillsAnalysis) return null;

  const data = {
    labels: Object.keys(skillsAnalysis),
    datasets: [
      {
        label: "Candidate's Skills",
        data: Object.values(skillsAnalysis).map(category => category.candidate.length),
        backgroundColor: 'rgba(107, 70, 193, 0.4)',
        borderColor: '#6B46C1',
        borderWidth: 2,
        pointBackgroundColor: '#6B46C1',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#6B46C1',
      },
      {
        label: 'Required Skills',
        data: Object.values(skillsAnalysis).map(category => category.required.length),
        backgroundColor: 'rgba(100, 100, 100, 0.3)',
        borderColor: '#6b7280',
        borderWidth: 2,
        pointBackgroundColor: '#6b7280',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#6b7280',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        pointLabels: {
          color: '#E2E8F0',
          font: { size: 14, weight: 'bold' },
        },
        ticks: {
          stepSize: 1,
          backdropColor: 'transparent',
          color: '#A0AEC0',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#E2E8F0',
          font: { size: 14 },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += context.raw;

            const categoryName = context.label;
            const skillsList = skillsAnalysis[categoryName]?.[context.dataset.label === "Candidate's Skills" ? 'candidate' : 'required']?.join(', ');
            if (skillsList) {
                return [label, `Skills: ${skillsList}`];
            }
            return label;
          }
        },
        titleColor: '#fff',
        bodyColor: '#fff',
        backgroundColor: 'rgba(30, 41, 59, 0.8)',
        borderColor: '#6B46C1',
        borderWidth: 1,
        cornerRadius: 6,
        padding: 10,
      }
    },
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Radar data={data} options={options} />
    </div>
  );
};

export default SkillsChart;