import React from 'react';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const CanvasToPDF = ({rootElementId , downloadFileName}) => {

    const downloadPdfDocument = () => {
        const input = document.getElementById(rootElementId);
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                
                pdf.addImage(imgData, 'png', 0, 0, 210, 160);
                pdf.save(`${downloadFileName}.pdf`);
            })
    }

    return <button onClick={downloadPdfDocument}>Download Pdf</button>

}

export default CanvasToPDF;