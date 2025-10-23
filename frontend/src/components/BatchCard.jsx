import React from 'react';
import StatCard from './StatCard';
import ResultsSummary from './ResultsSummary';
import ScoreDistributionChart from './ScoreDistributionChart'; 
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useState, useMemo } from 'react';
import API_BASE_URL from '../apiConfig';

const BatchCard = ({ batch }) => {
    const { user } = useAuth();
    const [isDownloading, setIsDownloading] = useState(false);
    const [error, setError] = useState('');

    const summaryStats = useMemo(() => {
        if (!batch.candidates || batch.candidates.length === 0) {
            return { total: 0, topTier: 0, topCandidate: 'N/A' };
        }
        const results = batch.candidates;
        const topTierCount = results.filter(r => r.screeningResult.match_score >= 80).length;
        const sorted = [...results].sort((a, b) => b.screeningResult.match_score - a.screeningResult.match_score);
        const top = sorted[0]?.screeningResult.candidate_name || 'N/A';
        return { total: results.length, topTier: topTierCount, topCandidate: top };
    }, [batch]);

    const handleDownloadReport = async () => {
    if (!user?.token || !batch) return;
    setIsDownloading(true);
    setError('');
    try {
        const config = { headers: { Authorization: `Bearer ${user.token}` }, responseType: 'blob' };
        
        const response = await axios.post(`${API_BASE_URL}/api/screen/report`, { batch }, config);

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${batch.jobTitle || 'Screening'}_report.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (err) {
        setError("Could not generate report.");
        console.error(err);
    } finally {
        setIsDownloading(false);
    }
};
    
    return (
        <div className="bg-white dark:bg-surface border border-gray-200 dark:border-border rounded-xl shadow-lg p-6 space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{batch.jobTitle}</h2>
                    <p className="text-sm text-gray-500 dark:text-text-secondary">
                        {batch.candidates.length} candidates screened on {new Date(batch.createdAt).toLocaleDateString()}
                    </p>
                </div>
                 <button onClick={handleDownloadReport} disabled={isDownloading} className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center gap-2">
                    <span className="hidden sm:inline">{isDownloading ? 'Generating...' : 'Download Report'}</span>
                </button>
            </div>
            {error && <div className="text-red-500 dark:text-red-400">{error}</div>}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <div className="lg:col-span-2">
                     <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Candidate Ranking</h3>
                     <ResultsSummary results={batch.candidates} />
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Batch Analytics</h3>
                        <div className="space-y-4">
                            <StatCard title="Total Resumes" value={summaryStats.total} />
                            <StatCard title="Top Tier (≥80)" value={summaryStats.topTier} />
                            <StatCard title="Top Candidate" value={summaryStats.topCandidate} />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Score Distribution</h3>
                        <div className="bg-gray-100 dark:bg-background rounded-lg p-4">
                            <ScoreDistributionChart results={batch.candidates} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BatchCard;