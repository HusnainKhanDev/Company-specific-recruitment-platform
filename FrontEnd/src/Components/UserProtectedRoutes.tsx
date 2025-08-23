import React, { useContext, useEffect } from 'react';
import { UserDataContext } from '../Context/Usercontext';
import { getUser } from '../GraphQL/Queries';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const UserProtectedRoutes = ({ children }: any) => {
    const { User, setUser } = useContext(UserDataContext);
    const { data, loading, error } = useQuery(getUser);
    const navigate = useNavigate();

    //useEffect used to avoid triggering navigation during render
    useEffect(() => {
        if (data?.GetUser) {
            if (data.GetUser.role === "Candidate") {
                sessionStorage.setItem("User", JSON.stringify(data.GetUser));
                setUser(data.GetUser);
            } else {
                navigate("/Auth"); // wrong role, boot them out
            }
        } else if (error) {
            navigate("/Auth");
        }
    }, [data, error, navigate, setUser]);


    if (loading) {
        return (
            <div>
                <img
                    src="https://cdn.pixabay.com/animation/2023/05/02/04/29/04-29-06-428_512.gif"
                    alt=""
                    className="ml-[32%]"
                />
                <h1 className="text-center text-3xl mt-10 font-semibold">Loading....</h1>
            </div>
        );
    }

    // while data is being checked, don't render children yet
    if (!data?.GetUser) {
        return null; // this help to stop flicker
    }

    // Render children only if user exists
    if (User && User.role === "Candidate") {
        return <div>{children}</div>;
    }

};

export default UserProtectedRoutes;
