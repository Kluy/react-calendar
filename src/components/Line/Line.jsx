import React, { useEffect, useState } from 'react';

import './line.scss';

const Line = ({ dataDay }) => {
  const currentHours = new Date().getHours();
  const minutes = new Date().getMinutes();

  //   const styles = {
  //     top: currentHours * 60 - currentHours + minutes,
  //   };
  const [top2, setTop2] = useState(currentHours * 60 - currentHours + minutes);

  let top = currentHours * 60 - currentHours + minutes;
  //   let top2;

  //   setInterval(() => {
  //     setTop2(top2 + 1);
  //     console.log(top2);
  //   }, 2000);
  //   setInterval(() => {
  //     console.log(top);
  //     top += 1;
  //   }, 1000);

  // useEffect(() => {
  //   setTop2(top2 + 1);
  // }, [top]);
  console.log('line');

  return <div style={{ top: top2 }} className="line"></div>;
};

export default Line;
