import React from 'react';
import StatCard from './StatCard';
import ResultsSummary from './ResultsSummary'; // We will rename this to CandidateList soon
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useState, useMemo } from 'react';

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
        
        // THE FIX: Send the entire 'batch' object. The backend will know how to handle it.
        const response = await axios.post('http://localhost:5001/api/screen/report', { batch }, config);

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
            {/* Batch Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{batch.jobTitle}</h2>
                    <p className="text-sm text-gray-500 dark:text-text-secondary">
                        {batch.candidates.length} candidates screened on {new Date(batch.createdAt).toLocaleDateString()}
                    </p>
                </div>
                 <button onClick={handleDownloadReport} disabled={isDownloading} className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center gap-2">
                    {/* Download Icon */}
                    <span className="hidden sm:inline">{isDownloading ? 'Generating...' : 'Download Report'}</span>
                </button>
            </div>
            {error && <div className="text-red-500">{error}</div>}

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard title="Total Resumes" value={summaryStats.total} />
                <StatCard title="Top Tier (≥80)" value={summaryStats.topTier} />
                <StatCard title="Top Candidate" value={summaryStats.topCandidate} />
            </div>

            {/* Candidate List */}
            <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Candidate Ranking</h3>
                <ResultsSummary results={batch.candidates} />
            </div>
        </div>
    );
};

export default BatchCard;