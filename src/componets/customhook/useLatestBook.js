import React, { useEffect, useState } from 'react'


function useLatestBook() {
    const [data,setData]= useState([]);
       const [loading,setLoading] = useState(true);
       const [error,setError] = useState(false);
useEffect(() => {
    const url =`https://openlibrary.org/search.json?q=programming&limit=10`;
  setLoading(true);
  setError(null);

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error("Failed");
      return res.json();
    })
    .then(data => {
      setData(data.docs);
    })
    .catch(err => {
      setError(err.message);
    })
    .finally(() => {
      setLoading(false);
    });
}, []);

    return {data,loading,error};
}

export default useLatestBook
