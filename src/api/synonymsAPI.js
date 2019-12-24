import {HTTP} from './axios';

export default class {
  static searchSynonyms = (value) => HTTP.get(`/synonyms?synonymValue=${value}`);
  static addSynonyms = data => HTTP.post(`/synonyms`, data);
}
