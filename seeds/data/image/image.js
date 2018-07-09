const getObjectID = require('../../helper.js')

const images = [
  {
    user: getObjectID('user1'),
    _id: getObjectID('image1'),
    creationDate: new Date(),
    name: 'likeIcon',
    type: 'image/png',
    hash: '0258e9db051e7f2129ae5f6ba3cf3388c2fb39f5',
    tags: [],
    url: 'http://localhost:3000/public/images/default/likeIcon.png',
  },
  {
    user: getObjectID('user1'),
    _id: getObjectID('image2'),
    creationDate: new Date(),
    name: 'dislikeicon',
    type: 'image/png',
    hash: 'c8ce0922b686d0bcd5eff0f41ff12cd5dffbd779',
    tags: [],
    url: 'http://localhost:3000/public/images/default/dislikeIcon.png',
  },
  {
    user: getObjectID('user1'),
    _id: getObjectID('image3'),
    creationDate: new Date(),
    name: 'Auswahl A',
    type: 'image/png',
    hash: '4f43e19775fcb11264f47be83ab16a45c542dc84',
    tags: [],
    url: 'https://banner2.kisspng.com/20180406/aqq/kisspng-emoji-emoticon-smiley-like-button-thumb-signal-double-happiness-5ac709de625bf6.4707425015229936304029.jpg',
  },
  {
    user: getObjectID('user1'),
    _id: getObjectID('image4'),
    creationDate: new Date(),
    name: 'Auswahl B',
    type: 'image/png',
    hash: 'c30d42f225df1be08eddc3bc178b940f9f08305f',
    tags: [],
    url: 'https://cdn1.vectorstock.com/i/1000x1000/76/10/dislike-sign-emoticon-vector-5057610.jpg',
  },
  {
    user: getObjectID('user1'),
    _id: getObjectID('image5'),
    creationDate: new Date(),
    name: 'Zusatz 1',
    type: 'image/png',
    hash: '8277394c7b5ff16d3f3cae6f0c0d3b4b2e7e6936',
    tags: [],
    url: 'https://iz.zohostatic.com/sites/default/files/creator-home-top-tab-screen.png',
  },
  {
    user: getObjectID('user1'),
    _id: getObjectID('image6'),
    creationDate: new Date(),
    name: 'Zusatz 2',
    type: 'image/png',
    hash: '4b720822aa2c369714b652f7868a1a04b13543b5',
    tags: [],
    url: 'https://static1.squarespace.com/static/56c5d2f52b8dde2bd7529336/t/5a79c937f9619ae7e80c7228/1520023144910/appsrevvs.png',
  },
]

module.exports = images
