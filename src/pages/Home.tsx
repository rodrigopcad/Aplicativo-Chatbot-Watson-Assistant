import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import Chatbot from "../components/Chatbot";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Chatbot</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Chatbot />
      </IonContent>
    </IonPage>
  );
};

export default Home;
