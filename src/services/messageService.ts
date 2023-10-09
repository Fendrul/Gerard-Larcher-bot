import {Collection, Message, TextChannel} from "discord.js";

export class MessageService {
  private static instance: MessageService;
  private static messageInterval: number;
  private static maxMessage: number;

  private constructor() {
    MessageService.messageInterval = 2;
    MessageService.maxMessage = 100;
  }

  public static getInstance(): MessageService {
    if (!MessageService.instance) {
      MessageService.instance = new MessageService();
    }

    return MessageService.instance;
  }

  async getMessagesBetweenTwoIDs(channel: TextChannel, firstID: string, secondID: string): Promise<Collection<string, Message<true>>> {
    let firstMesage: Message<true>;
    let secondMessage: Message<true>;

    try {
      firstMesage = await channel.messages.fetch(firstID);
      secondMessage = await channel.messages.fetch(secondID);
    } catch (error) {
      throw new Error("Message ID not found");
    }


    const allMessages = await channel.messages.fetch({
      limit: MessageService.maxMessage,
      after: firstMesage.id,
    });

    console.log(allMessages);

    allMessages.set(firstMesage.id, firstMesage);

    return allMessages.filter((message) => {
      return message.createdTimestamp >= firstMesage.createdTimestamp && message.createdTimestamp <= secondMessage.createdTimestamp;
    });
  }
}