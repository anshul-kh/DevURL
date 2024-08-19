import React from "react";
import { Modal, EditProfileImg } from "..";

const list = [
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  "https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100226.jpg?t=st=1721019716~exp=1721023316~hmac=ad9d2758c059c77d8ac5f59653ef564716e175702699fb863cdd83c35eec4e43&w=740",
  "https://img.freepik.com/free-photo/3d-cartoon-style-character_23-2151033973.jpg?t=st=1721022125~exp=1721025725~hmac=84db0da800542e73f894ebbbf8d28bb84b160fd9c941686925980947447f722e&w=740",
  "https://img.freepik.com/free-photo/3d-rendering-kid-playing-digital-game_23-2150898496.jpg?t=st=1721022207~exp=1721025807~hmac=751093989a259dc60c43257250d60f106da3f378454b2f20dfe57a934d1a5627&w=740",
  "https://img.freepik.com/free-photo/view-3d-man-holding-laptop_23-2150709818.jpg?t=st=1721022308~exp=1721025908~hmac=b5f3ac6fb02621da55e32579b78718ef1180584886aab98ab4a9c5b37178b34d&w=740",
  "https://img.freepik.com/free-photo/portrait-beautiful-young-woman-with-curly-hair-brown-hat_1142-42780.jpg?t=st=1721022187~exp=1721025787~hmac=f7bf47eacd04a579b6262c230f3c4c1c271b3fd710712f57743d667327a28bac&w=740",
  "https://img.freepik.com/free-photo/portrait-beautiful-young-woman-background-night-city_1142-55102.jpg?t=st=1721022364~exp=1721025964~hmac=08a5295a9ce08f40d25b5250d5dd02b630fd6abdf52dda398f2c875419f56ab2&w=740",
  "https://img.freepik.com/free-photo/portrait-beautiful-girl-with-makeup-her-face-3d-rendering_1142-42129.jpg?t=st=1721022376~exp=1721025976~hmac=d5560da7ea0e14f1d7aa7b012a717ed4d9833c42955d02fee71c39b17bad43e8&w=740",
  "https://img.freepik.com/free-photo/3d-rendering-girl-cap-city-street_1142-57029.jpg?t=st=1721022397~exp=1721025997~hmac=b8f502e380c2cc594d97f1d74b569c7bd49c491d99d5d8875bfd6c9733470416&w=740",
];

const Edit_Img: React.FC = () => {
  return (
    <Modal resize="w-5/6 md:w-2/5 h-4/5 justify-center">
      {list.map((url, index) => (
        <EditProfileImg url={url} key={index} />
      ))}
    </Modal>
  );
};

export default Edit_Img;
