import * as React from 'react';
import './style.css';
import Grid from './grid';
import dataList from './data.json';

function control(today: Date, limit: number) {
    const rows = document.querySelectorAll('table tbody tr');
    let errorCount = 0;

    rows.forEach((row) => {
        const cells = row.querySelectorAll('td');
        const mailReceivedDate = cells[2]?.textContent || '';
        const solutionSentDate = cells[3]?.textContent || '';

        const isRed = row.classList.contains('red-row');

        if (isRed && solutionSentDate !== 'No Solution Sent') {
            const mailDateObj = new Date(mailReceivedDate);
            const solutionDateObj = new Date(solutionSentDate);

            const differenceInDays = Math.floor(
                (solutionDateObj.getTime() - mailDateObj.getTime()) / (1000 * 60 * 60 * 24)
            );

            if (differenceInDays > limit) {
                errorCount++;
            }
        }
    });

    return errorCount;
}

export default function App() {
    const [today, setToday] = React.useState(new Date().toISOString().split('T')[0]); 
    const [limit, setLimit] = React.useState(10);
    const [errorCount, setErrorCount] = React.useState(0);

    const handleCheck = () => {
        const errors = control(new Date(today), limit);
        setErrorCount(errors);
    };

    return (
        <div>
            <h1>Dgpays Case Study</h1>

            <Grid data={dataList} />

            <div style={{ marginTop: '20px' }}>
                <label>
                    Today:
                    <input
                        type="date"
                        value={today}
                        onChange={(e) => setToday(e.target.value)}
                    />
                </label>
                <label style={{ marginLeft: '10px' }}>
                    Limit:
                    <input
                        type="number"
                        value={limit}
                        onChange={(e) => setLimit(Number(e.target.value))}
                    />
                </label>
                <button style={{ marginLeft: '10px' }} onClick={handleCheck}>
                    Check Errors
                </button>
            </div>

            <p>Number of rows with errors: {errorCount}</p>
        </div>
    );
}
