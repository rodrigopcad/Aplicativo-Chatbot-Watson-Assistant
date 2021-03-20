export class BotService {
  private sessionid = "";
  private api = "http://localhost:8000";
  private endpoint = {
    session: "/startsession",
    askByText: "/askthebot",
  };

  constructor() {
    this.startSession().then(sessionId => (this.sessionid = sessionId || ""));
  }

  private async startSession(): Promise<string | void> {
    const url = this.api + this.endpoint.session;
    const response = await fetch(url, {
      method: "GET",
    })
      .then(res => res.text())
      .then(text => text)
      .catch(err => console.error(err));

    return response;
  }

  public async askByText(text: string): Promise<string | void> {
    const url = this.api + this.endpoint.askByText;
    const data = {
      sessionId: this.sessionid,
      text,
    };
    const headers = new Headers();
    headers.set("Content-Type", "application/json");

    const response = await fetch(url, {
      headers,
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .catch(err => console.error(err));

    return response.data;
  }
}
