import React, { useEffect, createContext, useState, ReactNode } from 'react';
import { auth, createUserProfileDocument } from '../firebase/firebase';
import { onSnapshot } from 'firebase/firestore';

interface IUser {
  id: string;
  [key: string]: any;
}

type UserContextType = {
  user: IUser | null;
  loading: boolean;
};

interface UserContextProviderProps {
  children: ReactNode;
}

const defaultUserContext: UserContextType = {
  user: null,
  loading: true,
};

export const UserContext = createContext(defaultUserContext);

const UserContextProvider: React.FC<UserContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        if (!userRef) return;
        onSnapshot(userRef, (snapShot) => {
          setUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
          setLoading(false);
        });
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribeFromAuth();
  }, []);

  const userContext = { user, loading };
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
