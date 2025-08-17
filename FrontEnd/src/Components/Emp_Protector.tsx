import { useQuery } from '@apollo/client';
import React, { useContext, useEffect } from 'react'
import { getUser } from '../GraphQL/Queries';
import { UserDataContext } from '../Context/Usercontext';
import { useNavigate } from 'react-router-dom';

const Emp_Protector = ({children}: any) => {
    const { User, setUser } = useContext(UserDataContext);
    const { data, loading, error } = useQuery(getUser);
    const navigate = useNavigate();

    useEffect(() => {
        if (data?.GetUser) {
            if(data?.GetUser.role === "Employeer"){
                localStorage.setItem('User', JSON.stringify(data.GetUser));
                setUser(data.GetUser);
            }
        } else if (error) {
            navigate('/Auth', {state: { message: " Login to Countinue"}});
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



  if( User && User.role === "Employeer"){
    return (
      <div>
          {children}
      </div>
    )
  }
  
  
}

export default Emp_Protector