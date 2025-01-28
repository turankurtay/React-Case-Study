import * as React from 'react';

type Data = {
    name: string;
    mailReceivedDate: string;
    solutionSentDate?: string;
    isBackgroundColorRed?: boolean;
};

interface GridProps {
    data: Data[];
}

const Grid: React.FC<GridProps> = ({ data }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Mail Received Date</th>
                    <th>Solution Sent Date</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr
                        key={index}
                        style={{
                            backgroundColor: row.isBackgroundColorRed ? 'red' : 'white',
                        }}
                    >
                        <td>{row.name}</td>
                        <td>{row.mailReceivedDate}</td>
                        <td>{row.solutionSentDate || 'No Solution Sent'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Grid;
