import { apiEndpoints, apiBaseUrl } from "./constants";
import "./App.css";
import { Worker, Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { getFilePlugin } from "@react-pdf-viewer/get-file";

function App() {
  const [dataUrl, setDataUrl] = useState("");

  const urlParams = new URLSearchParams(window.location.search);
  const UUID = urlParams.get("uuid");
  const PdfToProduce = urlParams.get("pdfToProduce");

  const getFilePluginInstance = getFilePlugin();

  const { DownloadButton } = getFilePluginInstance;

  useEffect(() => {
    axios
      .post(
        apiBaseUrl + apiEndpoints.getPdf,
        {
          UUID,
          PdfToProduce,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        setDataUrl("data:application/pdf;base64," + response.data.pdf);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      {dataUrl && (
        <div
          style={{
            border: "1px solid rgba(0, 0, 0, 0.3)",
            height: "95vh",
          }}
        >
          <div style={{ padding: "16px" }}>
            <DownloadButton />
          </div>
          <Viewer
            fileUrl={dataUrl}
            defaultScale={SpecialZoomLevel.PageWidth}
            plugins={[getFilePluginInstance]}
          />
        </div>
      )}
    </Worker>
  );
}

export default App;
