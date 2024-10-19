import { useForm } from "react-hook-form";
import fakeUsers from "../datas/user.json";
import { User } from "../types/user";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

export const useSearchUser = () => {
  const { register, watch } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const [users, setUsers] = useState<User[]>(fakeUsers);
  const debouncedUsers = useDebounce(watch("search"), 500);

  useEffect(() => {
    const filteredUser = fakeUsers.filter((user) =>
      user.username.includes(debouncedUsers)
    );

    setUsers(filteredUser);
  }, [debouncedUsers]);

  return {
    register,
    watch,
    users,
  };
};
