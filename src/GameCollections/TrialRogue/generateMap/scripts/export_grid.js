export function gridToCSV(grid) {
  return grid.map(row => row.join(',')).join('\n');
}

export function gridToTSV(grid) {
  return grid.map(row => row.join('\t')).join('\n');
}

export function downloadText(filename, text) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

