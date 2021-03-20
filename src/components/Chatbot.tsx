import {
  IonButton,
  IonContent,
  IonFooter,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonSpinner,
  IonText,
} from "@ionic/react";
import { send } from "ionicons/icons";
import React, { useRef, useState } from "react";
import { BotService } from "../Services/BotService";
import "./Chatbot.css";

interface Chat {
  isBot?: boolean;
  message?: string;
}

const botService = new BotService();

const Chatbot: React.FC = () => {
  const [chat, setChat] = useState<Chat[]>([{ isBot: true, message: "Sou o Assistente Virtual. Posso lhe ajudar? " }]);
  const [message, setMessage] = useState<string>();
  const isLoading = useRef(false);

  const getMessage = (text: string) => {
    text = text.replace(/\s{2,}/g, " ").trimLeft();
    const input = document.querySelector("#txtHumanInput") as HTMLIonInputElement;
    input.value = text;
    setMessage(text.trim());
  };

  const handleHumanMessage = async () => {
    if (!message) return;

    setChat(old => [...old, { isBot: false, message }]);

    setTimeout(() => {
      (document.querySelector("#end") as HTMLDivElement).scrollIntoView({ behavior: "smooth", block: "end" });
    }, 0);

    isLoading.current = true;
    const botMessage = (await botService.askByText(message!)) || "Desculpe, não entendi sua pergunta.";
    isLoading.current = false;

    setChat(old => [...old, { isBot: true, message: botMessage }]);
    (document.querySelector("#txtHumanInput") as HTMLIonInputElement).value = "";

    setTimeout(() => {
      (document.querySelector("#end") as HTMLDivElement).scrollIntoView({ behavior: "smooth", block: "end" });
    }, 250);
  };

  return (
    <>
      <IonContent className="ion-padding">
        {chat.map((chat, i) =>
          chat?.isBot ? (
            <div key={i} className="container bot">
              <img className="avatar" src="./assets/images/bot.png" alt="" />
              <p className="dialog">{chat?.message}</p>
            </div>
          ) : (
            <div key={i} className="container human">
              <p className="dialog">{chat?.message}</p>
              <img className="avatar" src="./assets/images/human.png" alt="" />
            </div>
          ),
        )}
        {isLoading.current && (
          <div className="bot-is-typing">
            <IonText>Assistente está digitando </IonText>
            <IonSpinner name="dots" color="dark" />
          </div>
        )}
        <div id="end" className="end"></div>
      </IonContent>

      <IonFooter className="footer">
        <IonItem lines="none">
          <IonLabel position="floating" color="dark">
            Escreva aqui
          </IonLabel>
          <IonInput
            id="txtHumanInput"
            type="text"
            className="ion-padding-horizontal"
            enterkeyhint="enter"
            onIonChange={e => getMessage(e.detail.value!)}
          />
        </IonItem>
        <IonButton className="btn-send" expand="full" color="danger" fill="clear" onClick={handleHumanMessage}>
          <IonIcon icon={send} size="large"></IonIcon>
        </IonButton>
      </IonFooter>
    </>
  );
};

export default Chatbot;
