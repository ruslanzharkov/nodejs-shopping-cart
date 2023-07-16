const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Product = require('../models/product');

dotenv.config();

mongoose.connect(process.env.MONGO_DB_URL);

const products = [
  new Product({
    imagePath: 'https://static-cdn.jtvnw.net/ttv-boxart/Cyberpunk%202077.jpg',
    title: 'Cyberpunk 2077',
    description:
      '\n' +
      'Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification. You play as V, a mercenary outlaw going after a one-of-a-kind implant that is the key to immortality. You can customize your character’s cyberware, skillset and playstyle, and explore a vast city where the choices you make shape the story and the world around you.',
    price: 55,
  }),
  new Product({
    imagePath:
      'https://s2.gaming-cdn.com/images/products/172/orig/bioshock-infinite-cover.jpg',
    title: 'BioShock Infinite',
    description:
      'The third game in the series, Bioshock takes the story of the underwater confinement within the lost city of Rapture and takes it in the sky-city of Columbia. Players will follow Booker DeWitt, a private eye with a military past; as he will attempt to wipe his debts with the only skill he’s good at – finding people. Aside from obvious story and style differences, this time Bioshock protagonist has a personality, character, and voice, no longer the protagonist is a silent man, trying to survive.\n' +
      'Open and bright level design of Columbia shows industrial colonial America in a seemingly endless carnival. But Bioshock is not famous for its visuals, but for its story. Mystery and creative vision of Irrational Games invite players to uncover the secrets of Columbia’s leader - Zachary Comstock and save Elizabeth, the girl, that’s been locked up in the flying city since her birth.',
    price: 35,
  }),
  new Product({
    imagePath:
      'https://store-images.s-microsoft.com/image/apps.4128.13510798886186647.8c0ab761-dafd-44d5-ba8a-f32d95f7f9d6.48252971-733f-480c-b261-787206b064c1',
    title: 'Ori and the Blind Forest',
    description:
      'Ori and the Blind Forest is a platform-adventure Metroidvania video game developed by Moon Studios and published by Microsoft Studios. The game was released for Microsoft Windows and Xbox One on March 2015.In the game, players ' +
      'assume control of Ori, a white guardian spirit, and Sein, the "light and eyes" of the Forest\'s Spirit Tree',
    price: 40,
  }),
  new Product({
    imagePath:
      'https://upload.wikimedia.org/wikipedia/ru/c/c8/GTAV_Official_Cover_Art.jpg',
    title: 'GTA V',
    description:
      "Grand Theft Auto V is a 2013 action-adventure game developed by Rockstar North and published by Rockstar Games. It is the first main entry in the Grand Theft Auto series since 2008's Grand Theft Auto IV.",
    price: 50,
  }),
  new Product({
    imagePath:
      'https://s1.gaming-cdn.com/images/products/2139/orig/ori-and-the-will-of-the-wisps-pc-xbox-one-cover.jpg',
    title: 'Ori and the Will of the Wisps',
    description:
      'The little spirit Ori is no stranger to peril, but when a fateful flight puts the owlet Ku in harm’s way, it will take more than bravery to bring a family back together, heal a broken land, and discover Ori’s true destiny. From the creators of the acclaimed action-platformer Ori and the Blind Forest comes the highly anticipated sequel. Embark on an all-new adventure in a vast world filled with new friends and foes that come to life in stunning, hand-painted artwork. Set to a fully orchestrated original score, Ori and the Will of the Wisps continues the Moon Studios tradition of tightly crafted platforming action and deeply emotional storytelling.',
    price: 40,
  }),
  new Product({
    imagePath:
      'https://cdn.akamai.steamstatic.com/steam/apps/1036890/ss_44cc5a053ae014caac4b673459bd303d93f6f96a.1920x1080.jpg?t=1623532104',
    title: 'Shadow Warrior 3',
    description:
      'Shadow Warrior 3 is an upcoming first-person shooter developed by Flying Wild Hog and published by Devolver Digital. As the sequel to Shadow Warrior 2, the game is set to be released for Windows, PlayStation 4 and Xbox One in 2021.',
    price: 60,
  }),
  new Product({
    imagePath:
      'https://upload.wikimedia.org/wikipedia/ru/2/24/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_Resident_Evil_Village.jpg',
    title: 'Resident Evil Village',
    description:
      'Resident Evil Village is a survival horror game developed and published by Capcom. The sequel to Resident Evil 7: Biohazard, players control Ethan Winters, who is searching for his kidnapped daughter; after a fateful encounter with Chris Redfield, he finds himself in a village filled with mutant creatures.',
    price: 50,
  }),
  new Product({
    imagePath:
      'https://store.ubi.com/dw/image/v2/ABBS_PRD/on/demandware.static/-/Sites-masterCatalog/default/dw7387f247/images/large/5ecd2c925cdf9a1528a8c1d1.jpg?sw=341&sh=450&sm=fit',
    title: 'Far Cry 6',
    description:
      'Far Cry 6 is an upcoming first-person shooter game developed by Ubisoft Toronto and published by Ubisoft. It is the sixth main installment of the Far Cry series for Amazon Luna, Microsoft Windows, PlayStation 4, PlayStation 5, Xbox One, Xbox Series X/S, and Stadia. The game is set to be released on October 7, 2021.',
    price: 70,
  }),
];

let done = 0;

for (let i = 0; i < products.length; i++) {
  products[i].save(function (err, result) {
    done++;
    if (done === products.length) exit();
  });
}
function exit() {
  mongoose.disconnect();
}
