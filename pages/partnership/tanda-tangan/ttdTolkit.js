// import React, { useEffect, useRef } from "react";

// export default function App() {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const container = containerRef.current;
//     let PSPDFKit;

//     (async function () {
//       PSPDFKit = await import("pspdfkit");
//       await PSPDFKit.load({
//         container,
//         document: "/example.pdf",
//         baseUrl: `${window.location.protocol}//${window.location.host}/`,
//       });

//       const annotations = await instance.getAnnotations(0);
//       const annotation = annotations.get(0);
//       await instance.delete(annotation);
//     })();

//     return () => PSPDFKit && PSPDFKit.unload(container);
//   }, []);

//   return (
//     <>
//       <div ref={containerRef} style={{ height: "100vh" }} />
//       <style global jsx>
//         {`
//           * {
//             margin: 0;
//             padding: 0;
//           }
//         `}
//       </style>
//     </>
//   );
// }
