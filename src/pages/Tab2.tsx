import React, {useState} from 'react';
import {usePhotoGallery, Photo} from '../hooks/usePhotoGallery';
import {camera, trash, close} from 'ionicons/icons' //trash, close 
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonGrid, IonRow, IonCol, IonImg, IonActionSheet } from '@ionic/react'; // IonGrid, IonRow, IonCol, IonImg



const Tab2: React.FC = () => {
  const {photos, takePhoto, deletePhoto} = usePhotoGallery();
  const [photoToDelete, setPhotoToDelete] = useState<Photo>();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab Two</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            {photos.map((photo, index) => (
              <IonCol size="6" key={index}>
                <IonImg onClick={() => setPhotoToDelete(photo)}src={photo.base64 ?? photo.webviewPath} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        <IonFab vertical='bottom' horizontal='center' slot='fixed'>
          <IonFabButton onClick={() => takePhoto()}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>
        <IonActionSheet
        isOpen={!!photoToDelete}
        buttons={[{
          text: 'Delete',
          role: 'destructive',
          icon: trash,
          handler: () => {
            if (photoToDelete){
              deletePhoto(photoToDelete);
              setPhotoToDelete(undefined);
            }
          }
        }, {
          text: 'Cancel',
          icon: close,
          role: 'cancel'
        }]}
        onDidDismiss={() => setPhotoToDelete(undefined)}
        />

      </IonContent>
    </IonPage>
  );
};

export default Tab2;