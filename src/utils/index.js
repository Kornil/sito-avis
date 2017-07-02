import * as firebase from 'firebase';

export const formatDate = (date) => {
  const monthNames = [
    'genn', 'febbr', 'mar', 'apr', 'magg', 'giugno', 'luglio', 'ag', 'sett', 'ott', 'nov', 'dic',
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${day} ${monthNames[monthIndex]} ${year}`;
};

export const generateSlug = title => title.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');

const config = {
  apiKey: 'AIzaSyDorzqQG5pgETcGGmQ58DrQhQUHYnVERHU',
  authDomain: 'avis-website-dac6e.firebaseapp.com',
  databaseURL: 'https://avis-website-dac6e.firebaseio.com',
  projectId: 'avis-website-dac6e',
  storageBucket: 'avis-website-dac6e.appspot.com',
  messagingSenderId: '115042660818',
};
firebase.initializeApp(config);


export const rootRef = firebase.database().ref().child('avis');
export const blogsRef = rootRef.child('blogs');
export const timeRef = firebase.database.ServerValue.TIMESTAMP;

export const createMarkup = input => ({ __html: input });
