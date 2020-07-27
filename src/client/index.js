import { handleEvent, scrollToEntries } from './js/main';
import './styles/main.scss';

const submitButton = document.getElementById('submitFormData');
const scrollButton = document.getElementById('scroll_down');

handleEvent(submitButton);
scrollToEntries(scrollButton);
