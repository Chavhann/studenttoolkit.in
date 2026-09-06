export function exportHtmlAsPdf(html: string, title = 'export') {
  const w = window.open('', '_blank', 'width=800,height=600')
  if (!w) return
  w.document.write(`
    <html>
      <head>
        <title>${title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>body{font-family: Arial, Helvetica, sans-serif; padding:20px;} </style>
      </head>
      <body>
        ${html}
      </body>
    </html>
  `)
  w.document.close()
  w.focus()
  setTimeout(() => {
    w.print()
  }, 500)
}
