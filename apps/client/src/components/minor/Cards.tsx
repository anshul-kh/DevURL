export const ImageCard = ({ src, style = "w-9/12 h-4/6" }: { src: string, style?: string }) => {
  return (
    <img
      className={`flex justify-center items-center drop-shadow ${style}`}
      src={src}
      alt="card"
    />
  );
};

// export const Card_2 = () => {
//   return (
//     <img
//       className="w-9/12 h-2/5 flex justify-center items-center drop-shadow-2xl"
//       src={Card_SVG_2}
//       alt="card"
//     />
//   );
// };
// export const Card_3 = () => {
//   return (
//     <img
//       className="w-9/12 h-2/5 flex justify-center items-center drop-shadow-2xl"
//       src={Card_SVG_3}
//       alt="card"
//     />
//   );
// };
// export const Card_4 = () => {
//   return (
//     <img
//       className="w-9/12 h-2/5 flex justify-center items-center drop-shadow-2xl"
//       src={Card_SVG_4}
//       alt="card"
//     />
//   );
// };

// export const Card_5 = () => {
//   return (
//     <img
//       className="  drop-shadow-2xl     h-3/4 flex justify-center items-center"
//       src={Card_SVG_5}
//       alt="card"
//     />
//   );
// };

// export const Card_6 = () => {
//   return (
//     <img
//       className="w-10/12 h-3/5 flex justify-center items-center drop-shadow-2xl"
//       src={Card_SVG_6}
//       alt="card"
//     />
//   );
// };
