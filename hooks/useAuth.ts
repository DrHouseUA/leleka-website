// "use client";

// import { useQuery, useQueryClient } from "@tanstack/react-query";

// import { User } from "@/types/user";
// import { getCurrentUser } from "@/lib/api/auth";

// export const useAuth = () => {
//   const queryClient = useQueryClient();
//   const {
//     data: user,
//     isLoading,
//     isError,
//   } = useQuery<User | null, Error>({
//     queryKey: ["currentUser"],
//     queryFn: getCurrentUser,
//     retry: false,
//   });

//   const setUser = (newUser: User | null) => {
//     queryClient.setQueryData(["currentUser"], newUser);
//   };

//   return {
//     user,
//     setUser,
//     isAuth: !!user,
//     isLoading,
//     isError,
//   };
// };
