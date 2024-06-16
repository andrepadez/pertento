import html2canvas from 'html2canvas';

export const useDataExport = (data, categories, chartRef) => {
  const exportCSV = () => {
    const header = { date: 'date' };
    categories.forEach((category) => {
      header[category] = category;
    });

    const csv = [header, ...data]
      .map((row) => {
        return Object.values(row).join(',');
      })
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.csv';
    link.click();
  };

  const exportPNG = async () => {
    console.log('exportToPng', chartRef);
    const originalCanvas = await html2canvas(chartRef.current);
    let padding = 50; // Set padding value

    // Create a new canvas with padding
    let canvas = document.createElement('canvas');
    canvas.width = originalCanvas.width + padding * 2;
    canvas.height = originalCanvas.height + padding * 2;

    // Get context and set background color
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF'; // Set your desired background color
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the original canvas onto the new canvas
    ctx.drawImage(originalCanvas, padding, padding);

    let imgData = canvas.toDataURL('image/png');
    let link = document.createElement('a');
    link.href = imgData;
    link.download = 'image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return { exportCSV, exportPNG };
};
