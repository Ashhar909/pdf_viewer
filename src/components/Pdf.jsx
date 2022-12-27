import React, { useState} from 'react'
import { Document,Page } from 'react-pdf/dist/esm/entry.webpack';

const Pdf = (props) => {
  const [numPages, setNumPages] = useState(null);
  const [, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({numPages}){
    setNumPages(numPages);
    setPageNumber(1);
  }
  return (
    <div>
          <Document file={`/pdf/${props.id}.pdf`} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(
              new Array(numPages),
              (el,index) => (
                <Page height={1000}
                  key={`page_${index+1}`}
                  pageNumber={index+1}
                />
              )
            )}
          </Document>
        </div>
  )
}

export default Pdf