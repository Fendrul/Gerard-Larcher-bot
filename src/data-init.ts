//Create a function that init the insults
import {InsultService} from "./services/insult-service";

export function dataInit() {
  const insultService = InsultService.getInstance();

  insultService.addInsults(
    "T'es tellement con que tu pourrais être ministre de l'intérieur.",
    "Pourquoi tu parles ?",
    "Va mourir dans un coin au lieu de nous épancher ta vie de merde.",
    "Ferme bien ta gueul.e",
    "Mange ma merde.",
    "Quelqu'un écoute vraiment ce qu'il dit ?",
    "Mange mes pieds.",
    "C'est à cause de personnes comme toi que Dieu a créé le majeur.",
    "Tes secrets seront toujours en sécurité avec moi. Je n'écoute même pas quand tu me les racontes.",
    "Tu apportes tellement de joie à tout le monde ! Quand tu quittes la pièce.",
    "tu es plus décevant qu'un bretzel non salé.",
    "il  est impossible de te sous-estimer.",
    "Est-ce que quelqu'un a déjà réussi à l'imaginer avec de la personnalité ?",
    "Tu es la version humaine des crampes menstruelles.",
    "Tu es mignon, comme mon chien. Il chasse aussi les queues pour s'amuser.",
    "Tu as une vie entière pour être idiot, pourquoi tu ne prendrais pas une pause ?",
    "J'ai pensé à toi aujourd'hui, ça m'a rappelé d'aller sortir les poubelles.",
    "Tiens, tu es potable aujourd'hui.",
    "Je suis vraiment content que tu fasses des phrases avec des mots à présent.",
    "Si le rire est le meilleur des remèdes, ton visage va guérir le monde.",
    "N'aie pas honte de qui tu es. C'est le job de tes parents.",
    "Tu es dans le top 3 des personnes les plus chiantes, et tu n'es pas à la troisième place.",
    "Ce n'est pas dangereux que tu utilises tout ton vocabulaire dans une seule phrase ?",
    "Je suis jaloux de toutes les personnes qui ne te connaissent pas.",
    "Il n'y a pas une balle quelque part devant laquelle tu pourrais sauter ?",
    "Les personnes qui te tolèrent au quotidien sont les vrais héros.",
  );
}