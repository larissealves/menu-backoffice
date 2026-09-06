import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useAuth } from "./hooks/context/AuthContext.jsx";

import ListDish from './components/ListDish.jsx'
import ListDishScreenFilters from './components/ListDishScreenFilters.jsx'
import BaseLayout from "./components/baseComponents/BaseLayout.jsx";

import Login from './components/login/form.jsx';
import Loading from "./components/baseComponents/Loading.jsx";


function Router() {
    const [activeLoading, setActiveLoading] = useState(false);

    const { user, loading, loginChecked } = useAuth(() =>
        setActiveLoading(loading)
    );

    const onSave = () => {
        setActiveLoading((prev) => !prev);
    };

    useEffect(() => {
        if (!user) {

        }
    }, [])

    return (
        <>
            {activeLoading  && (<Loading />)}
            <Routes>
                {(user && !loading) ? (
                    <>
                        <Route element={<BaseLayout />}>
                            <Route path="/" element={<ListDish />} />
                            <Route path='/screenFilters' element={<ListDishScreenFilters />} />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Route>
                    </>
                )
                    :
                    (
                        <>
                        {loginChecked && (
                        <Route path="*" element={
                            <Login
                                setLoading={()=>setActiveLoading((prev)=> !prev)}
                                loading={activeLoading}
                                onSave={onSave}
                            />
                        }
                        />
                        )}
                        </>
                    )
                }
            </Routes>
        </>
    )
}

export default Router;