import { useEffect } from 'react'

const useScript = (url) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = url;
        script.defer = true;
        document.getElementsByTagName('head')[0].appendChild(script)
        return () => {
            document.body.removeChild(script)
        }
    }, [url])
}

export default useScript