import * as firebase from 'firebase';
import sanitizeHtml from 'sanitize-html';
// import FirebasePaginator from 'firebase-paginator';

// /////////// FIREBASE CONFIG //////////////////

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

// //////////// BLOG POST CREATE FUNCTIONS /////////////////

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

// //////////// BLOG POST DISPLAY FUNCTIONS /////////////////

export const sanitize = (dirty) => {
  const clean = sanitizeHtml(dirty, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'span']),
    allowedAttributes: {
      a: ['href', 'name', 'target'],
      img: ['alt', 'src'],
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

// //////////// IMAGE RESIZING FUNCTIONS /////////////////

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

// //////// FORM VALIDATION FUNCTIONS //////////

const _isRequired = fieldName => `${fieldName} is required`;

const _mustMatch = otherFieldName => fieldName => `${fieldName} must match ${otherFieldName}`;

const _minLength = length => fieldName => `${fieldName} must be at least ${length} characters`;

export const required = (text) => {
  if (text) {
    return null;
  }
  return _isRequired;
};

export const conditionalRequired = (text, fieldName) =>
  (text2, state) => (state[fieldName] !== '' && text2 === '' ? _isRequired : null);

export const mustMatch = (field, fieldName) =>
  (text, state) => (state[field] === text ? null : _mustMatch(fieldName));

export const minLength = length =>
  text => (text.length >= length ? null : _minLength(length));

export const ruleRunner = (field, name, ...validations) => (state) => {
  const errorMessageFunc = validations.find(v => v(state[field], state));
  if (errorMessageFunc) {
    return { [field]: errorMessageFunc(state[field], state)(name) };
  }
  return {};
};

export const run = (state, runners) => runners.reduce((memo, runner) =>
  Object.assign(memo, runner(state)), {});

export const fieldValidations = [
  ruleRunner('title', 'Title', required),
];

export const fieldValidationsPhotoGallery = [
  ruleRunner('galleryName', 'Gallery Name', required),
];

export const fieldValidationsModal = [
  ruleRunner('alt', 'Alt text', required),
  // ruleRunner("alt", "Alt text", conditionalRequired("alt", "url"))
];


// ////////// FIREBASE PAGINATION ////////////

// const paginationOptions = {
//   finite: true,
//   pageSize: 3,
// }
// export const paginator = new FirebasePaginator(blogsRef, paginationOptions);
