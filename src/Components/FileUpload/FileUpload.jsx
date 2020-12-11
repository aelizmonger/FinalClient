import React, { useState } from "react";
import { render } from "react-dom";
import { storage } from "../../Firebase/config";
//import ProgressBar from "./Progress";

const FileUpload = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            setUrl(url);
          });
      }
    );
  };

  console.log("image: ", image);

  return (
      <div className="PhotoForm">
       <div className="ImageTitle">
        <h2>Your Tickets</h2>
           <p>Upload your event tickets!</p>
         </div>
         
         <div className="UploadPhoto">
      <progress value={progress} max="100" />
      <br />
      <br />
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      <br />
      {url}
       <br />
       <img src={url}/> 
       </div>
       </div>
  );
};
// const FileUpload = () => {
//   const [file, setfile] = useState(null);
//   const [error, setError] = useState(null);

//   const types = ["image/png", "image/jpeg"];

//   const handleChange = (e) => {
//     let selected = e.target.files[0];

//     if (selected && types.includes(selected.type)) {
//       setfile(selected);
//       setError("");
//     } else {
//       setfile(null);
//       setError("Please select an image file (png or jpeg)");
//     }
//   };

//   return (
//     <>
//       <div className="PhotoForm">
//         <div className="ImageTitle">
//           <h2>Tickets!</h2>
//           <p>Log your stellar photos here</p>
//         </div>

//         <form className="imageForm">
//           <label className="imageLabel">
//             <input type="file" onChange={handleChange} />
//             <span className="add-image">+</span>
//           </label>
//           <div className="output">
//             {error && <div className="error">{error}</div>}
//             {file && <div>{file.name}</div>}
//             {file && <ProgressBar file={file} setfile={setfile} />}
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

render(<FileUpload />, document.querySelector("#root"));
export default FileUpload;