'use client';
import { Page } from "@components/Page";
import { dataService } from "@services/api/dataService";
import { useMutation } from "@tanstack/react-query";
import { cookieService } from "@utils/coockieService";
import { globalStateService } from "@services/globalStateService";
import { useRouter, useSearchParams } from "next/navigation";
import { User } from "@models/business";

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {isPending, mutateAsync: login} = useMutation({
    mutationFn: async (value: User) => {
      try {
        const {data} = await dataService.login(value);
        cookieService.set('token', data.access_token, {maxAge: 36000});
        const {data: user} = await dataService.getProfile();
        globalStateService.set(prev => ({...prev, user}));
        return user;
      } catch {
      }
    }
  });

  const onSubmit = async (value: User) => {
    const user = await login(value);
    if (user) {
      router.push(searchParams.get('return') ?? '/');
    }
  }

  return (
      <Page>
        <div>Login</div>
      </Page>
  )
}

export default Login;
