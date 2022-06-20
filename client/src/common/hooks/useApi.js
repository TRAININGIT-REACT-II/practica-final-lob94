import { useEffect, useMemo, useState } from "react";

const useApi = (url, token, initialParams = {}, performOnMount = true) => {

    const [loading, setLoading] = useState(performOnMount);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null); 
    const [params, setParams] = useState(initialParams);
    const [performRequest, setPerformRequest] = useState(performOnMount);

    const updateParams = (newParams) => {
        setParams(newParams);
    };

    const perform = ()=> {
        setPerformRequest(true);
    };

    useEffect(() => {
        if(performRequest) {
            if(!loading){
                setLoading(true);
            }
            fetch(
                url, params
                ).then((res) => {
                    return res.json();
                }).then((json) => {
                    if(json.error != null){
                        setError(json.error);
                    }else{
                        setData(json);
                    }
                }).catch((err) => console.log(err))
                .finally((() => setLoading(false)));
        }
    }, [url, params, performRequest]);

    return({
        loading : loading,
        data : data,
        error : error,
        updateParams,
        perform
    });

};

export default useApi;