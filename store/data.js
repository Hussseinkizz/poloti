// import Photo from '../public/images/sample.png';
import Photo1 from '../public/images/img6.jpg';
import Photo2 from '../public/images/img3.jpeg';
import Photo3 from '../public/images/img4.jpg';
import Photo4 from '../public/images/img5.jpg';
import MyPhoto from '../public/images/me.png';

//todo: fetch these from backend server... supabase!
// use uuid package to generate unique ids

const localData = [
  {
    userId: 1,
    username: 'john doe',
    avatar: MyPhoto,
    contact: '07086234982',
    posts: [
      {
        id: '21m4',
        size: { width: 50, height: 100 },
        location: 'Kitemu Buddo',
        installments: false,
        price: '10500000',
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
        id: '25j5',
        size: { width: 50, height: 50 },
        location: 'Nsangi Wakiso',
        installments: true,
        price: '15500000',
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
        id: '2m42',
        size: { width: 100, height: 100 },
        location: 'Kyengera',
        installments: false,
        price: '12000000',
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
        id: '35n4',
        size: { width: 60, height: 100 },
        location: 'Nagalabbi Buddo',
        installments: true,
        price: '21000000',
        photos: [Photo3, Photo2, Photo1, Photo4],
        info: 'really nice land bla bla bla...',
      },
      {
        id: 'et6m',
        size: { width: 100, height: 100 },
        location: 'Kitemu Buddo',
        installments: false,
        price: '17000000',
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
        id: '35m5',
        size: { width: 50, height: 50 },
        location: 'Masuulita',
        installments: false,
        price: '14000000',
        photos: [Photo4, Photo2, Photo3, Photo1],
        info: 'really nice land bla bla bla...',
      },
    ],
  },
];

export default localData;
