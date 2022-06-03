// import Photo from '../public/images/sample.png';
import Photo1 from '../public/images/img6.jpg';
import Photo2 from '../public/images/img3.jpeg';
import Photo3 from '../public/images/img4.jpg';
import Photo4 from '../public/images/img5.jpg';
import MyPhoto from '../public/images/me.png';

//todo: fetch these from backend server... supabase!

const localData = [
  {
    userId: 1,
    username: 'john doe',
    avatar: MyPhoto,
    contact: '07086234982',
    posts: [
      {
        id: 1,
        size: { width: 50, height: 100 },
        location: 'Kitemu Buddo',
        price: '10.5',
        photos: [Photo1, Photo2, Photo3, Photo4],
        info: 'really nice land bla bla bla...',
      },
    ],
  },
  {
    userId: 2,
    username: 'Ssebunya Faizol',
    avatar: MyPhoto,
    contact: '07086234988',
    posts: [
      {
        id: 1,
        size: { width: 50, height: 50 },
        location: 'Nsangi Wakiso',
        price: '5.5',
        photos: [Photo2, Photo1, Photo3, Photo4],
        info: 'really nice land bla bla bla...',
      },
    ],
  },
  {
    userId: 3,
    username: 'Jk Property Consultants',
    avatar: MyPhoto,
    contact: '07086239982',
    posts: [
      {
        id: 1,
        size: { width: 100, height: 100 },
        location: 'Kyengera',
        price: '12',
        photos: [Photo4, Photo2, Photo3, Photo1],
        info: 'really nice land bla bla bla...',
      },
    ],
  },
  {
    userId: 4,
    username: 'Hussein Kizz',
    avatar: MyPhoto,
    contact: '07086234982',
    posts: [
      {
        id: 1,
        size: { width: 60, height: 100 },
        location: 'Nagalabbi Buddo',
        price: '10',
        photos: [Photo3, Photo2, Photo1, Photo4],
        info: 'really nice land bla bla bla...',
      },
      {
        id: 2,
        size: { width: 100, height: 100 },
        location: 'Kitemu Buddo',
        price: '17',
        photos: [Photo2, Photo3, Photo1, Photo4],
        info: 'really nice land bla bla bla...',
      },
    ],
  },
  {
    userId: 5,
    username: 'jane doe',
    avatar: MyPhoto,
    contact: '0704353301',
    posts: [
      {
        id: 1,
        size: { width: 50, height: 50 },
        location: 'Masuulita',
        price: '14',
        photos: [Photo4, Photo2, Photo3, Photo1],
        info: 'really nice land bla bla bla...',
      },
    ],
  },
];

export default localData;
