'use client';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Loading } from "./Loading";
import { Toast } from "./Toast";
import { PropsWithChildren } from "react";
import '@locales/i18n';
import "@styles/global.scss";

export const Providers = ({children}: PropsWithChildren) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 3
      }
    }
  });


  return (
      <QueryClientProvider client={queryClient}>
        <Loading/>
        <Toast/>
        {children}
      </QueryClientProvider>
  );
}
