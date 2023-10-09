import {Collection, Message, TextChannel} from "discord.js";

export class MessageService {
  private static instance: MessageService;
  private static maxMessages: number;

  private constructor() {
    MessageService.maxMessages = 100;
  }

  public static getInstance(): MessageService {
    if (!MessageService.instance) {
      MessageService.instance = new MessageService();
    }

    return MessageService.instance;
  }

  async getMessagesBetweenTwoIDs(channel: TextChannel, firstID: string, secondID: string): Promise<Collection<string, Message<true>>> {
    let firstMesage: Message;
    let secondMessage: Message;

    const allMessages = await channel.messages.fetch({limit: MessageService.maxMessages});

    try {
      firstMesage = await channel.messages.fetch(firstID);
      secondMessage = await channel.messages.fetch(secondID);
    } catch (error) {
      throw new Error("Message ID not found");
    }

    return allMessages.filter((message) => {
      return message.createdTimestamp >= firstMesage.createdTimestamp && message.createdTimestamp <= secondMessage.createdTimestamp;
    });
  }
}