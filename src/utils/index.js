import * as firebase from 'firebase';
import sanitizeHtml from 'sanitize-html';

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

export const sanitize = (dirty) => {
  const clean = sanitizeHtml(dirty, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'span']),
    allowedAttributes: {
      a: ['href', 'name', 'target'],
      img: ['src', 'alt'],
      '*': ['style', 'align'],
    },
  });
  return { __html: clean };
};

export const sanitizeExcerpt = (dirty) => {
  const clean = sanitizeHtml(dirty, {
    allowedTags: ['b', 'i', 'em', 'strong', 'a'],
    allowedAttributes: {
      a: ['href'],
    },
  });
  return { __html: clean };
};

export const resize = (width, downloadUrl) => {
  const encodedUrl = encodeURIComponent(downloadUrl).replace(/'/g, '%27').replace(/"/g, '%22');
  return `http://res.cloudinary.com/avis-rovigo/image/fetch/w_${width},c_scale/${encodedUrl}`;
};

export const cardWidth = () => {
  if (window.innerWidth > 600) {
    return Math.floor(window.innerWidth / 3);
  } else if (window.innerWidth < 600 && window.innerWidth > 480) {
    return Math.floor(window.innerWidth / 2);
  }
  return Math.floor(window.innerWidth);
};
