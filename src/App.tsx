import { useEffect, useState } from 'react'

import './App.css'

type Rate = {
    ccyNbr: string;
    ccyNbrEng: string;
    rtbBid: string;
    rthOfr: string;
    rtcOfr: string;
    rthBid: string;
    rtcBid: string;
    ratTim: string;
    ratDat: string;
    ccyExc: string;
};

function App() {
    const [rates, setRates] = useState<Rate[]>();

    useEffect(()=>{
        fetch('https://fx.cmbchina.com/api/v1/fx/rate')
        .then(response => response.json())
        .then(data => {
            
            data.body.forEach((rate:any) => {
                console.log(rate);
            });
            setRates(data.body);
            
        })
        .catch(error => console.error('Error fetching rates:', error));
    }, []);
    return (
        <div className='app p-2 gap-2 flex flex-col justify-center'>
            <div>CMBC Rates</div>
            <table className=' border-[1px]'>
                <thead>
                    <tr>
                        <th className='border-[1px]'>Currency</th>
                        <th className='border-[1px]'>bank's selling rate</th>
                        <th className='border-[1px]'>bank's buying rate</th>
                        <th className='border-[1px]'>reference midpoint</th>
                        <th className='border-[1px]'>time(UTC+8)</th>
                    </tr>
                </thead>
                <tbody>
                    {rates?.map((rate, index) => (
                        <tr key={index} className='border-[1px]'>
                            <td className={`border-[1px] ${index==1?"font-bold":""}`}>{rate.ccyNbrEng}</td>
                            <td className={`border-[1px] ${index==1?"font-bold":""}`}>{rate.rthOfr}</td>
                            <td className={`border-[1px] ${index==1?"font-bold":""}`}>{rate.rthBid}</td>
                            <td className={`border-[1px] ${index==1?"font-bold":""}`}>{rate.rtbBid}</td>
                            <td className={`border-[1px] ${index==1?"font-bold":""}`}>{rate.ratTim}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    )
}

export default App
