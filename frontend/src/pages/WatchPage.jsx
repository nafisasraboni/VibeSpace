import React from 'react'
import { useParams } from 'react-router-dom';

const WatchPage = () => {
    const params = useParams();
    console.log(params);

  return <div>WatchPage</div>
};

export default WatchPage;