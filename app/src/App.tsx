import { useCallback, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { blobSasTokenClient } from './apis'
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob'
import { BlobSasPermissions } from './apis/nswag'
interface Images {
  src: string;
  name: string;
}
function App() {
  const [imgSrcs, setImgSrcs] = useState<Images[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [containerClient, setContainerClient] = useState<ContainerClient | null>(null)

  const callApi = useCallback(async (isInit?:boolean) => {
    try {
      const response = await blobSasTokenClient.getSASToken(undefined, undefined, BlobSasPermissions.All);
      if(response) {
        const blobService = new BlobServiceClient(response);
        const containerClient = blobService.getContainerClient("");
        setContainerClient(containerClient);

        if(isInit) {
          loadBlobFile(containerClient);
        } else {
          console.log('Your sas token is refresh successfully, please do the action again');
        }
      }
    }
    catch (error) {
      console.log('error', error);
    }
  },[]);


  const loadBlobFile = async (containerClient: ContainerClient) => {
    if(!containerClient) {
      return;
    }
    try {
      setIsLoading(true);
      const items = containerClient.listBlobsByHierarchy("/", { prefix: "policy/key_123/" });
      setImgSrcs([]);
      for await (const item of items) {
        if (item.kind === "blob") {
          const client = containerClient.getBlockBlobClient(item.name);
          const response = await client.download();
          const blob = await response.blobBody;
          if (blob) {
            setImgSrcs((img) => [...img, {
              src: URL.createObjectURL(blob),
              name: item.name
            }]);
          }
          console.log(
            `\tBlobItem: name - ${item.name}, last modified - ${item.properties.lastModified}`,
          );
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log('error', error);
      setIsLoading(false);
    }
    
  };

  // useEffect(() => {
  //   callApi(true);
  // },[])

  const checkResetSASToken = useCallback((response:any) => {
    if(response.code === 'AuthenticationFailed' && response.statusCode.toString() === '403') {
      callApi(false);
    } return;
  },[callApi])

  const uploadFile = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    if(!containerClient) return;
    console.log("containerClient in upload",containerClient)
    const file = event.target.files![0];
    try {
      const blobClient = containerClient.getBlockBlobClient(`policy/key_123/${file.name}`);
      const { requestId } = await blobClient.uploadData(file);
      if (!requestId) {
        return;
      }
      const srcStr = await blobToString(file);
      setImgSrcs((img) => [...img, {
        src: srcStr as string,
        name: `policy/key_123/${file.name}`
      }]);
    } catch (error) {
      checkResetSASToken(error);
    }
    event.target.value = '';
  },[checkResetSASToken, containerClient])

  const deleteFile = useCallback(async (image: Images) => {
    if(!containerClient) return;
    try {
      const blobClient = containerClient.getBlockBlobClient(image.name);
      await blobClient.delete();
      setImgSrcs(currentItems => currentItems.filter(item => item.src !== image.src && item.name !== image.name));
    } catch (error) {
      checkResetSASToken(error);
      console.log('error', error);
    }
  },[checkResetSASToken, containerClient])

  const blobToString = async (blob: File) => {
    const fileReader = new FileReader();
    return new Promise((resolve, reject) => {
      fileReader.onloadend = (ev:any) => {
        resolve(ev.target.result);
      };
      fileReader.onerror = reject;
      fileReader.readAsDataURL(blob);
    })
  }

  return (
    <>
      <div>
        <button onClick={() => callApi(true)}>Load image</button>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <input type='file' onChange={(e) => {uploadFile(e)}}/>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        {!isLoading &&
          imgSrcs.map((item, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'  }}>
              <div key={index} style={{ width: '100%', height: '200px', padding: '10px' }}>
                <img src={item.src} width={'100%'} height={'100%'}/>
              </div>
              <button onClick={() => deleteFile(item)}>Delete</button>
            </div>
          ))}
      </div>
    </>
  )
}

export default App
