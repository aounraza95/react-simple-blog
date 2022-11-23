import { useEffect, useState } from "react"
const useFetch = (apiUrl) => {

	const [data, setData] = useState(null);
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState(null);

	// useEffect with dependency to re-run when dependency value changes
	useEffect(() => {
		// used for Abort, (instantly changing the route while fetching the data)
		const abortCont = new AbortController();

		setTimeout(() => {
			fetch(apiUrl, { signal: abortCont.signal })
				.then(resp => {
					if (!resp.ok) {
						throw Error('Could not fetch data.');
					}
					return resp.json()
				})
				.then((data) => {
					setData(data)
					setIsPending(false)
					setError(null)
				})
				.catch((err) => {
					if (err.name !== 'AbortError') {
						setError(err.message);
						setIsPending(false);
					}
				})
		}, 1000);

		return () => abortCont.abort(); // useEffect cleanup

	}, [apiUrl])

	return { data, isPending, error }
}

export default useFetch;