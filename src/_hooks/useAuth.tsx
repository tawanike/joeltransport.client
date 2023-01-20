import { useState } from "react";
import { User } from "../_models/types";

const useAuth = () => {
    const [LoadingAuth] = useState(false)
    const [UserAuth] = useState<User | null>(null)

    return { LoadingAuth, UserAuth }
}

export default useAuth;
