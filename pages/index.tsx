import Head from 'next/head';
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
  const [list, setList] = useState([]);


  // useEffect(()=>{
  //     database.ref('images/').get().then((snapshot)=>{
  //         if(snapshot.exists()){
  //             setList(snapshot.val())
  //         }
  //     })
  // });


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
                      })
              },
          );
      },
      load: url
  };

  return <div>
      <FilePond
          files={imageFilePond}
          onupdatefiles={setImageFilePond}
          allowMultiple={false}
          maxFiles={1}
          server={server}
          name={`files${Math.random()}`}
          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />

      <h1>HAJSD</h1>
  </div>
}
