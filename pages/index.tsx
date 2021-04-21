import styles from '../styles/Home.module.css';
import {useEffect, useState} from "react";
import {storage, database} from '../firebase';
import { v4 as uuidv4 } from 'uuid';

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)


export default function Home() {
  const [imageFilePond, setImageFilePond] = useState([]);
  const [url,setUrl] = useState();
  const [key, setKey] = useState([]);
  const [list, setList] = useState({})
  const [update, setUpdate] = useState(false);

  useEffect(()=>{
      database.ref('images/').get().then((snapshot)=>{
          if(snapshot.exists()){
              const aux = Object.keys(snapshot.val()).map((item)=>{
                  return item
              })
              setKey([...aux]);
              setList(snapshot.val())
              setUpdate(false);
          }
      })
  },[update]);


  const writeDatabase = (url, name) => {
      database.ref(`images/${uuidv4()}`).set({
          url,
          name,
      });
  }

  const server = {
      process: (fieldName, file, metadata, load, error, progress, abort) => {

          const task = storage.ref('images/' + file.name).put(file, {
              contentType: 'image/jpeg',
          });
          task.on(

              "state_changed",
              snapshot => {
                  progress(true,snapshot.bytesTransferred, snapshot.totalBytes)
              },
              error => console.log(error),
              ()=>{
                  storage
                      .ref('images')
                      .child(file.name)
                      .getDownloadURL()
                      .then(res => {
                          setUrl(res);
                          writeDatabase(res, file.name)
                          setUpdate(true);
                      })
              },
          );
      },
      load: url
  };



  return <div>
      <FilePond
          allowReplace={true}
          files={imageFilePond}
          onupdatefiles={setImageFilePond}
          allowMultiple={false}
          server={server}
          name={`files${Math.random()}`}
          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
      <h2>Imagenes almacenadas</h2>
      <div className={styles.imageContainer}>
          {
              key.map((item:string,index)=>{
                  return <div key={index} className={styles.margin}>
                      <img src={list[item]?.url} alt={list[item]?.name} className={styles.imgShow}/>
                  </div>
              })
          }
      </div>
  </div>
}
