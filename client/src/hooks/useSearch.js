import { useEffect, useState } from 'react';

const useSearch = (endpoint) => {

  const [results, setResults] = useState();
  const [loading, setLoading] = useState(true);

  const doSearch = async (term) => {
    setLoading(true);
    const urlSafeTerm = encodeURIComponent(term);
    const res = await fetch(`${endpoint}?q=${urlSafeTerm}`);
    const data = await res.json();
    setResults(data.results);
    setLoading(false);
  }

  return [doSearch, results, loading];
}

export default useSearch;