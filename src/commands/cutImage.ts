import {Command} from "../models/interfaces/Command";
import {AttachmentBuilder, ChatInputCommandInteraction, InteractionResponse, SlashCommandBuilder} from "discord.js";
import axios from "axios";
import sharp from "sharp";

export class CutImage implements Command {
  public name = "cutimage";

  public data = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription("Coupe une image en 4")
    .addStringOption((option) => {
      return option
        .setName("url")
        .setDescription("Url de l'image à couper")
        .setRequired(true);
    });

  async execute(interaction: ChatInputCommandInteraction): Promise<InteractionResponse<boolean>> {
    const imageURL = interaction.options.getString("url");

    if (!imageURL) {
      return interaction.reply({content: "URL non trouvée", ephemeral: true});
    }

    const response = await axios.get(imageURL, {responseType: "arraybuffer"});
    const imageBuffer = Buffer.from(response.data, "binary");

    const image = sharp(imageBuffer);
    const metadata = await image.metadata();

    if (!metadata.width || !metadata.height) {
      return interaction.reply({content: "Impossible de récupérer les dimensions de l'image", ephemeral: true});
    }

    const halfWidth = Math.round(metadata.width / 2);
    const halfHeight = Math.round(metadata.height / 2);
    const rightWidth = metadata.width - halfWidth;
    const bottomHeight = metadata.height - halfHeight;

    const leftUpperBuffer = await image.clone().extract({
      left: 0,
      top: 0,
      width: halfWidth,
      height: halfHeight
    }).toBuffer();
    const rightUpperBuffer = await image.clone().extract({
      left: halfWidth,
      top: 0,
      width: rightWidth,
      height: halfHeight
    }).toBuffer();
    const leftBottomBuffer = await image.clone().extract({
      left: 0,
      top: halfHeight,
      width: halfWidth,
      height: bottomHeight
    }).toBuffer();
    const rightBottomBuffer = await image.clone().extract({
      left: halfWidth,
      top: halfHeight,
      width: rightWidth,
      height: bottomHeight
    }).toBuffer();

    const leftUpperAttachment = new AttachmentBuilder(leftUpperBuffer, {name: "left-upper.png"});
    const rightUpperAttachment = new AttachmentBuilder(rightUpperBuffer, {name: "right-half.png"});
    const leftBottomAttachment = new AttachmentBuilder(leftBottomBuffer, {name: "left-bottom.png"});
    const rightBottomAttachment = new AttachmentBuilder(rightBottomBuffer, {name: "right-bottom.png"});

    return interaction.reply({files: [leftUpperAttachment, rightUpperAttachment, leftBottomAttachment, rightBottomAttachment]});
  }
}