//Create a function that init the insults
import {InsultService} from "./services/insult-service";

export function dataInit() {
  const insultService = InsultService.getInstance();

  insultService.addInsults(
    "T'es tellement con que tu pourrais être ministre de l'intérieur",
    "Pourquoi tu parles ?",
    "Va mourir dans un coin au lieu de nous épancher ta vie de merde",
    "Ferme bien ta gueule",
    "Mange ma merde",
    "Quelqu'un écoute vraiment ce qu'il dit ?",
    "Mange mes pieds"
  );
}