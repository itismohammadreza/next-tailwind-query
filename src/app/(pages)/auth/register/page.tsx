"use client"
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { dataService } from "@services/api/dataService";
import { Page } from "@components/Page";
import { User } from "@models/business";

const Register = () => {
  const router = useRouter();

  const {isPending, mutateAsync: register} = useMutation({
    mutationFn: (value: User) => dataService.register(value)
  });

  const onSubmit = async (value: User) => {
    try {
      await register(value);
      router.push('/');
    } catch {
    }
  }

  return (
      <Page>
        <div>Register</div>
      </Page>
  )
}

export default Register;
