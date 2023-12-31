import ImgurClient from 'imgur';
import { IMGUR_API } from '../config-global';

const client = new ImgurClient(IMGUR_API);

export default client;
