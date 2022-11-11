import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

// custom hook to preload users state with users from randomuser.m // custom hook to preload users state with users from randomuser.mee
export interface User {
  name: string;
  age: number;
  gender: string;
  picture: string;
}

const useUser = (page: number, numberOfUsers: number) => {
  const [users, setUsers] = useState<User[]>([
    {
      name: "",
      age: 0,
      gender: "",
      picture: "",
    },
  ]);

  //pulling users data from randomuser.me on component mount
  useEffect(() => {
    (async () => {
      const response: AxiosResponse | void = await axios
        .get(`https://randomuser.me/api/?page=${page}&results=${numberOfUsers}`)
        .catch((error) => console.error(error));

      if (response) {
        const {
          data: { results },
        } = response;
        console.table(results);

        // transform data to match User schema
        const userData: User[] = results.map((user: any) => {
          return {
            name: `${user.name.first} ${user.name.last}`,
            age: user.dob.age,
            gender: user.gender,
            picture: user.picture.medium,
          };
        });
        console.log(userData);
        // setting state
        setUsers([...userData]);
      }
    })();
  }, []);

  return users;
};

export default useUser;
