function printCotizacion() {
  const doc = new jsPDF();

  doc.autoTable({
    head: [['Name', 'Email', 'Country']],
    body: [
      ['David', 'david@example.com', 'Sweden'],
      ['Castille', 'castille@example.com', 'Spain'],
      // ...
    ],
  })

  doc.save('table.pdf');
}