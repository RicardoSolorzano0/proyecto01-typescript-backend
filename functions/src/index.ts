import * as admin from "firebase-admin";
import {apiFunctions} from "./requests/apiFunctions"

admin.initializeApp();

module.exports = {
  ...apiFunctions
};
