import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useState} from "react";
import {storage} from '../firebase/index';




export default function Home() {
  const [image, setImage] = useState(null);
  const [listImages, setListImages] = useState<string[]>([]);

  const handleChange = (e) =>{
      if(e.target.files[0]){
        setImage(e.target.files[0])
      }
  };

  const handleUpload = () =>{
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
        "state_changed",
        snapshot => {},
        error => console.log(error),
        ()=>{
          storage
              .ref('images')
              .child(image.name)
              .getDownloadURL()
              .then(res => {
                  listImages.push(res)
                  setListImages([...listImages]);
              })
        }
    );
  }


  return <div>
    <input type='file' onChange={handleChange}/> <br/>
    <button onClick={handleUpload}>Upload</button>
      {
          listImages.map((src,index)=>{
              return <div key={index}>
                  <img src={src} alt="test" width={250}/>
              </div>
          })
      }
  </div>
}
